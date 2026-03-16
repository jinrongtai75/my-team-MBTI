export function renderHome(container, navigate) {
    container.innerHTML = `
        <div class="view fade-in">
            <h1 class="title mb-4 text-center">우리 팀 성향 알아보기</h1>
            <p class="subtitle text-center mb-8">간단한 질문을 통해 당신의 업무 성향을 알아보고,<br/>팀원들과의 궁합을 확인해보세요!</p>
            
            <div class="glass-card">
                <div class="input-group">
                    <label for="memberName">이름을 입력해주세요</label>
                    <input type="text" id="memberName" class="input-field" placeholder="예: 홍길동" autocomplete="off">
                </div>
                <button id="startBtn" class="btn-primary w-full">테스트 시작하기</button>
            </div>
        </div>
    `;

    const startBtn = container.querySelector('#startBtn');
    const nameInput = container.querySelector('#memberName');

    startBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        if (!name) {
            alert('이름을 입력해주세요!');
            return;
        }
        
        // Pass name state to the next view
        navigate('test', { name });
    });
    
    // allow enter key
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') startBtn.click();
    });
}
