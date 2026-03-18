interface PrivacyPolicyProps {
  isOpen: boolean
  onClose: () => void
}

export default function PrivacyPolicy({ isOpen, onClose }: PrivacyPolicyProps) {
  if (!isOpen) return null

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-2xl max-h-[80vh]">
        <h2 className="text-xl font-bold mb-4">개인정보처리방침</h2>

        <div className="prose prose-sm max-w-none overflow-y-auto">
          <p className="text-sm text-base-content/70 mb-4">
            시행일: 2025년 3월 18일
          </p>

          <h3>1. 개인정보의 수집 및 이용</h3>
          <p>
            혼천의(이하 "서비스")는 사용자의 개인정보를 다음과 같이 수집하고 이용합니다.
          </p>
          <ul>
            <li><strong>수집 항목:</strong> 생년월일, 출생시간, 성별, 출생지(선택)</li>
            <li><strong>수집 목적:</strong> 사주팔자, 자미두수, 출생차트 계산 및 AI 해석 서비스 제공</li>
            <li><strong>보관 기간:</strong> 브라우저 로컬 스토리지에 저장되며, 사용자가 직접 삭제 가능</li>
          </ul>

          <h3>2. 개인정보의 제3자 제공</h3>
          <p>
            서비스는 사용자의 동의 없이 개인정보를 외부에 제공하지 않습니다.
            단, AI 해석 기능 사용 시 OpenAI API를 통해 데이터가 처리되며,
            이는 해석 결과 생성 목적으로만 사용됩니다.
          </p>

          <h3>3. 개인정보의 보관 및 파기</h3>
          <p>
            모든 데이터는 사용자의 브라우저 로컬 스토리지에 저장됩니다.
            서버에는 어떠한 개인정보도 저장되지 않습니다.
            브라우저 데이터 삭제 또는 서비스 내 기록 삭제 기능을 통해 직접 파기할 수 있습니다.
          </p>

          <h3>4. 쿠키 및 광고</h3>
          <p>
            서비스는 Google AdSense를 통해 광고를 제공할 수 있습니다.
            Google은 사용자의 관심사에 기반한 광고를 표시하기 위해 쿠키를 사용할 수 있습니다.
          </p>
          <ul>
            <li>Google의 광고 쿠키 사용에 대한 자세한 내용: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="link">Google 광고 정책</a></li>
            <li>맞춤 광고 비활성화: <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="link">Google 광고 설정</a></li>
          </ul>

          <h3>5. 이용자의 권리</h3>
          <p>
            사용자는 언제든지 자신의 데이터를 조회, 수정, 삭제할 수 있습니다.
            브라우저의 개발자 도구 또는 서비스 내 기록 관리 기능을 이용하세요.
          </p>

          <h3>6. 연락처</h3>
          <p>
            개인정보 관련 문의사항은 GitHub Issues를 통해 접수해 주세요.
          </p>
          <p>
            <a href="https://github.com/whalelake/saju/issues" target="_blank" rel="noopener noreferrer" className="link">
              https://github.com/whalelake/saju/issues
            </a>
          </p>
        </div>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>닫기</button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  )
}
