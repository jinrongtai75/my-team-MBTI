import { store } from '../utils/store.js';
import { mbtiScorer } from '../logic/mbtiScorer.js';
import { compatibilityMatrix } from '../logic/compatibility.js';

export function renderTeamReport(container, navigate) {
    const members = store.getMembers();
    let selectedMembers = [];

    const render = () => {
        if (members.length === 0) {
            container.innerHTML = `
                <div class="view fade-in">
                    <h1 class="title mb-4 text-center">팀 대시보드</h1>
                    <div class="glass-card empty-state">
                        <h3>아직 등록된 팀원이 없습니다.</h3>
                        <p class="mb-6">먼저 테스트를 진행하여 팀원들의 성향을 추가해보세요!</p>
                        <button id="goTestBtn" class="btn-primary">테스트 하러가기</button>
                    </div>
                </div>
            `;
            container.querySelector('#goTestBtn').addEventListener('click', () => navigate('home'));
            return;
        }

        let matchResultHTML = '';
        if (selectedMembers.length === 2) {
            const m1 = members.find(m => m.id === selectedMembers[0]);
            const m2 = members.find(m => m.id === selectedMembers[1]);
            const match = compatibilityMatrix.getMatch(m1.mbti, m2.mbti);
            
            matchResultHTML = `
                <div class="glass-card fade-in" style="margin-top: 2rem; border-color: var(--primary-light);">
                    <h3 class="text-center mb-6" style="font-size: 1.5rem; font-weight: 800;">팀원 궁합 리포트 📄</h3>
                    <div class="compare-container">
                        <div class="compare-person">
                            <div class="member-name">${m1.name}</div>
                            <div class="member-mbti type-${m1.mbti[0]}">${m1.mbti}</div>
                        </div>
                        <div class="compare-vs">VS</div>
                        <div class="compare-person">
                            <div class="member-name">${m2.name}</div>
                            <div class="member-mbti type-${m2.mbti[0]}">${m2.mbti}</div>
                        </div>
                    </div>
                    <div class="text-center">
                        <span class="match-badge match-${match.level}">${match.label}</span>
                        <p class="mt-4" style="line-height: 1.8; color: var(--text-main); font-size: 1.1rem;">${match.desc}</p>
                    </div>
                </div>
            `;
        }

        container.innerHTML = `
            <div class="view fade-in" style="max-width: 1000px;">
                <h1 class="title mb-2 text-center">우리 팀 대시보드</h1>
                <p class="subtitle text-center mb-8">궁합을 확인할 두 명의 팀원을 선택해주세요. (현재 ${selectedMembers.length}/2)</p>
                
                <div class="team-grid">
                    ${members.map(m => {
                        const isSelected = selectedMembers.includes(m.id);
                        const detail = mbtiScorer.getDetail(m.mbti);
                        return `
                            <div class="member-card ${isSelected ? 'selected' : ''}" data-id="${m.id}">
                                <div class="member-name">${m.name}</div>
                                <div class="member-mbti type-${m.mbti[0]}">${m.mbti}</div>
                                <div class="member-traits">${detail.title}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                ${matchResultHTML}

                <div class="text-center mt-8">
                    <button id="resetMembersBtn" class="btn-secondary" style="font-size: 0.9rem;">초기화 (모든 데이터 삭제)</button>
                </div>
            </div>
        `;

        // Bind events
        const cards = container.querySelectorAll('.member-card');
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                
                if (selectedMembers.includes(id)) {
                    selectedMembers = selectedMembers.filter(mid => mid !== id);
                } else {
                    if (selectedMembers.length < 2) {
                        selectedMembers.push(id);
                    } else {
                        // replace the second one
                        selectedMembers[1] = id;
                    }
                }
                render(); // re-render state
            });
        });

        container.querySelector('#resetMembersBtn').addEventListener('click', () => {
            if(confirm('정말 모든 팀원 데이터를 삭제하시겠습니까?')) {
                store.clearMembers();
                selectedMembers = [];
                render();
            }
        });
    };

    render();
}
