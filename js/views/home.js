export function renderHome(container, navigate) {
    container.innerHTML = `
        <div class="view fade-in">
            <div class="home-hero">
                <h1 class="title mb-4 text-center">우리 팀 성향 알아보기</h1>
                <p class="subtitle text-center mb-8">
                    28문항 리커트 척도로 정밀하게 분석하고,<br/>
                    팀원과의 시너지 궁합을 숫자로 확인해보세요!
                </p>
            </div>

            <div class="mode-cards">
                <!-- 모드 1: 나의 MBTI 검사 -->
                <div class="mode-card" id="modeTest">
                    <div class="mode-icon">🧭</div>
                    <h2 class="mode-title">나의 MBTI 검사하기</h2>
                    <p class="mode-desc">28문항 · 5단계 척도<br/>약 5~7분 소요</p>
                    <div class="mode-features">
                        <span class="feature-tag">정밀 28문항</span>
                        <span class="feature-tag">리커트 척도</span>
                        <span class="feature-tag">강도 시각화</span>
                    </div>
                </div>

                <!-- 모드 2: 팀원 궁합 확인 -->
                <div class="mode-card mode-card-alt" id="modeTeam">
                    <div class="mode-icon">⚡</div>
                    <h2 class="mode-title">팀원 궁합 확인하기</h2>
                    <p class="mode-desc">등록된 팀원 중 2명 선택<br/>Synergy Score 산출</p>
                    <div class="mode-features">
                        <span class="feature-tag">0~100점 점수</span>
                        <span class="feature-tag">지표별 분석</span>
                        <span class="feature-tag">성장 포인트</span>
                    </div>
                </div>
            </div>

            <!-- 이름 입력 (테스트 모드 선택 시 표시) -->
            <div class="glass-card name-input-card" id="nameInputCard" style="display: none; margin-top: 2rem;">
                <div class="input-group">
                    <label for="memberName">이름을 입력해주세요</label>
                    <input type="text" id="memberName" class="input-field" placeholder="예: 홍길동" autocomplete="off">
                </div>
                <button id="startBtn" class="btn-primary w-full">테스트 시작하기 →</button>
            </div>
        </div>
    `;

    const modeTestCard  = container.querySelector('#modeTest');
    const modeTeamCard  = container.querySelector('#modeTeam');
    const nameInputCard = container.querySelector('#nameInputCard');
    const startBtn      = container.querySelector('#startBtn');
    const nameInput     = container.querySelector('#memberName');

    modeTestCard.addEventListener('click', () => {
        modeTestCard.classList.add('active');
        modeTeamCard.classList.remove('active');
        nameInputCard.style.display = 'block';
        nameInputCard.classList.add('fade-in');
        setTimeout(() => nameInput.focus(), 50);
    });

    modeTeamCard.addEventListener('click', () => {
        navigate('teamReport');
    });

    startBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        if (!name) {
            nameInput.style.borderColor = '#f87171';
            nameInput.placeholder = '이름을 입력해주세요!';
            return;
        }
        navigate('test', { name });
    });

    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') startBtn.click();
    });

    nameInput.addEventListener('input', () => {
        nameInput.style.borderColor = '';
    });
}
