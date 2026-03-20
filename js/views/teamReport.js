import { store } from '../utils/store.js';
import { mbtiScorer } from '../logic/mbtiScorer.js';
import { compatibilityMatrix } from '../logic/compatibility.js';

const DIM_LABELS = { EI: '에너지', SN: '인식', TF: '판단', JP: '생활방식' };
const DIM_COLORS = {
    EI: '#818cf8',
    SN: '#34d399',
    TF: '#f472b6',
    JP: '#fbbf24'
};

function buildChemistryHTML(m1, m2) {
    const match = compatibilityMatrix.getMatch(m1.mbti, m2.mbti);
    const { score, level, label, breakdown, desc } = match;

    // Synergy Score 원형 게이지 (SVG)
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - score / 100);

    const gaugeColor =
        score >= 85 ? '#4ade80' :
        score >= 70 ? '#60a5fa' :
        score >= 55 ? '#fbbf24' : '#fb923c';

    const breakdownHTML = breakdown.map(b => {
        const color = DIM_COLORS[b.dimension];
        const pts = b.score;
        return `
            <div class="breakdown-row">
                <div class="breakdown-dim">
                    <span class="breakdown-badge" style="background: ${color}22; color: ${color}; border: 1px solid ${color}55;">
                        ${DIM_LABELS[b.dimension]}
                    </span>
                    <span class="breakdown-combo">${b.labelA} + ${b.labelB}</span>
                </div>
                <div class="breakdown-bar-wrap">
                    <div class="breakdown-bar" style="width: ${pts}%; background: ${color};"></div>
                </div>
                <span class="breakdown-pts" style="color: ${color};">+${pts}</span>
            </div>
            <div class="breakdown-detail">
                <div class="detail-item synergy">
                    <span class="detail-icon">✨</span>
                    <span>${b.synergy}</span>
                </div>
                <div class="detail-item growth">
                    <span class="detail-icon">💡</span>
                    <span>${b.growth}</span>
                </div>
            </div>
        `;
    }).join('');

    return `
        <div class="glass-card chemistry-card fade-in">
            <h3 class="text-center mb-6" style="font-size: 1.5rem; font-weight: 800;">팀원 궁합 리포트 📄</h3>

            <div class="compare-container">
                <div class="compare-person">
                    <div class="member-name">${m1.name}</div>
                    <div class="member-mbti type-${m1.mbti[0]}">${m1.mbti}</div>
                    <div class="member-traits">${mbtiScorer.getDetail(m1.mbti).title}</div>
                </div>

                <div class="synergy-gauge">
                    <svg width="130" height="130" viewBox="0 0 130 130">
                        <circle cx="65" cy="65" r="${radius}" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="12"/>
                        <circle
                            cx="65" cy="65" r="${radius}"
                            fill="none"
                            stroke="${gaugeColor}"
                            stroke-width="12"
                            stroke-linecap="round"
                            stroke-dasharray="${circumference}"
                            stroke-dashoffset="${dashOffset}"
                            transform="rotate(-90 65 65)"
                            style="transition: stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1);"
                        />
                    </svg>
                    <div class="gauge-label">
                        <span class="gauge-score" style="color: ${gaugeColor};">${score}</span>
                        <span class="gauge-unit">/ 100</span>
                        <span class="gauge-title match-${level}">${label}</span>
                    </div>
                </div>

                <div class="compare-person">
                    <div class="member-name">${m2.name}</div>
                    <div class="member-mbti type-${m2.mbti[0]}">${m2.mbti}</div>
                    <div class="member-traits">${mbtiScorer.getDetail(m2.mbti).title}</div>
                </div>
            </div>

            <p class="chemistry-desc">${desc}</p>

            <div class="breakdown-list">
                <h4 class="breakdown-title">지표별 시너지 분석</h4>
                ${breakdownHTML}
            </div>
        </div>
    `;
}

export async function renderTeamReport(container, navigate) {
    container.innerHTML = `
        <div class="view fade-in" style="justify-content: center; min-height: 60vh;">
            <div class="text-center">
                <h3 class="title" style="font-size: 2rem;">팀원 데이터 불러오는 중...</h3>
                <p class="subtitle mt-4">잠시만 기다려주세요 ⏳</p>
            </div>
        </div>
    `;

    const members = await store.getMembers();
    let selectedMembers = [];

    const render = () => {
        if (members.length === 0) {
            container.innerHTML = `
                <div class="view fade-in">
                    <h1 class="title mb-4 text-center">팀 대시보드</h1>
                    <div class="glass-card empty-state">
                        <h3>아직 등록된 팀원이 없습니다.</h3>
                        <p class="mb-6">먼저 테스트를 진행하여 첫 번째 팀원이 되어보세요!</p>
                        <button id="goTestBtn" class="btn-primary">테스트 하러가기</button>
                    </div>
                </div>
            `;
            container.querySelector('#goTestBtn').addEventListener('click', () => navigate('home'));
            return;
        }

        let chemistryHTML = '';
        if (selectedMembers.length === 2) {
            const m1 = members.find(m => String(m.id) === selectedMembers[0]);
            const m2 = members.find(m => String(m.id) === selectedMembers[1]);
            if (m1 && m2) chemistryHTML = buildChemistryHTML(m1, m2);
        }

        container.innerHTML = `
            <div class="view fade-in" style="max-width: 1000px;">
                <h1 class="title mb-2 text-center">우리 팀 대시보드</h1>
                <p class="subtitle text-center mb-8">궁합을 확인할 두 명의 팀원을 선택해주세요. (${selectedMembers.length}/2 선택됨)</p>

                <div class="team-grid">
                    ${members.map(m => {
                        const isSelected = selectedMembers.includes(String(m.id));
                        const selIdx = selectedMembers.indexOf(String(m.id));
                        const detail = mbtiScorer.getDetail(m.mbti);
                        return `
                            <div class="member-card ${isSelected ? 'selected' : ''}" data-id="${m.id}">
                                ${isSelected ? `<span class="sel-badge">${selIdx + 1}</span>` : ''}
                                <div class="member-name">${m.name}</div>
                                <div class="member-mbti type-${m.mbti[0]}">${m.mbti}</div>
                                <div class="member-traits">${detail.title}</div>
                            </div>
                        `;
                    }).join('')}
                </div>

                ${chemistryHTML}

                <div class="text-center mt-8">
                    <button id="goTestBtn2" class="btn-primary" style="margin-right: 1rem;">테스트 추가하기</button>
                    <button id="resetMembersBtn" class="btn-secondary" style="font-size: 0.9rem;">초기화 (모든 데이터 삭제)</button>
                </div>
            </div>
        `;

        container.querySelectorAll('.member-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const id = String(e.currentTarget.dataset.id);
                if (selectedMembers.includes(id)) {
                    selectedMembers = selectedMembers.filter(mid => mid !== id);
                } else {
                    if (selectedMembers.length < 2) {
                        selectedMembers.push(id);
                    } else {
                        selectedMembers[1] = id;
                    }
                }
                render();
            });
        });

        container.querySelector('#goTestBtn2').addEventListener('click', () => navigate('home'));

        container.querySelector('#resetMembersBtn').addEventListener('click', async () => {
            if (confirm('정말 모든 팀원 데이터를 삭제하시겠습니까? (서버에서 영구 삭제됩니다)')) {
                container.querySelector('#resetMembersBtn').textContent = '삭제 중...';
                await store.clearMembers();
                const updated = await store.getMembers();
                members.length = 0;
                updated.forEach(m => members.push(m));
                selectedMembers = [];
                render();
            }
        });
    };

    render();
}
