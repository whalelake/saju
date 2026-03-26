import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { createServer } from 'node:http'
import { readFileSync, existsSync } from 'node:fs'
import { lookup } from 'node:dns/promises'
import { ARTICLE_IDS } from '../src/content/article-catalog'

const DIST_DIR = join(process.cwd(), 'dist')
const LANGUAGES = ['ko', 'en', 'ja', 'zh'] as const

const ROUTE_SUFFIXES = [
  '/',
  '/guide',
  '/guide/saju',
  '/guide/ziwei',
  '/guide/natal',
  '/articles',
  '/privacy',
  '/terms',
  ...ARTICLE_IDS.map((id) => `/articles/${id}`),
]

const routes = LANGUAGES.flatMap((lang) =>
  ROUTE_SUFFIXES.map((suffix) => `/${lang}${suffix}`),
)

function createStaticServer(dir: string): Promise<{ server: ReturnType<typeof createServer>; port: number }> {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      const url = new URL(req.url || '/', `http://localhost`)
      let filePath = join(dir, url.pathname)

      if (!existsSync(filePath) || !readFileSync(filePath, { flag: 'r' }).length) {
        filePath = join(dir, 'index.html')
      }

      try {
        const content = readFileSync(filePath)
        const ext = filePath.split('.').pop() || ''
        const mimeTypes: Record<string, string> = {
          html: 'text/html',
          js: 'application/javascript',
          css: 'text/css',
          json: 'application/json',
          png: 'image/png',
          svg: 'image/svg+xml',
          woff2: 'font/woff2',
        }
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' })
        res.end(content)
      } catch {
        const fallback = readFileSync(join(dir, 'index.html'))
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(fallback)
      }
    })

    server.listen(0, '127.0.0.1', () => {
      const addr = server.address()
      const port = typeof addr === 'object' && addr ? addr.port : 0
      resolve({ server, port })
    })
  })
}

async function main() {
  // Vercel/CI 환경에서는 puppeteer가 없으므로 스킵
  if (process.env.CI || process.env.VERCEL) {
    console.log('CI/Vercel environment detected — skipping prerender.')
    return
  }

  const puppeteer = await import('puppeteer')
  const browser = await puppeteer.launch({ headless: true })

  const { server, port } = await createStaticServer(DIST_DIR)
  const baseUrl = `http://127.0.0.1:${port}`

  console.log(`Prerendering ${routes.length} routes on ${baseUrl}...`)

  let success = 0
  let failed = 0

  for (const route of routes) {
    const page = await browser.newPage()
    try {
      await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle0', timeout: 15000 })
      // Wait for React to render
      await page.waitForSelector('#root > *', { timeout: 10000 })

      let html = await page.content()

      // Clean up duplicate SeoHead-injected JSON-LD (already in index.html)
      html = html.replace(
        /<script data-seo-json-ld="true"[^>]*>[\s\S]*?<\/script>/g,
        '',
      )

      const filePath = route.endsWith('/')
        ? join(DIST_DIR, route, 'index.html')
        : join(DIST_DIR, `${route}/index.html`)

      await mkdir(dirname(filePath), { recursive: true })
      await writeFile(filePath, html, 'utf8')
      success++
      process.stdout.write(`  ✓ ${route}\n`)
    } catch (err) {
      failed++
      process.stdout.write(`  ✗ ${route} — ${err instanceof Error ? err.message : err}\n`)
    } finally {
      await page.close()
    }
  }

  await browser.close()
  server.close()

  console.log(`\nPrerender complete: ${success} success, ${failed} failed out of ${routes.length} routes.`)

  if (failed > 0) {
    process.exitCode = 1
  }
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
