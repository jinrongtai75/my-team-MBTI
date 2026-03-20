import { mbtiScorer } from '../logic/mbtiScorer.js';
import { store } from '../utils/store.js';

const DIMENSION_COLORS = {
    EI: '#818cf8',
    SN: '#34d399',
    TF: '#f472b6',
    JP: '#fbbf24'
};

export async function renderResult(container, navigate, state) {
    if (!state || !state.name || !state.answers) {
        navigate('home');
        return;
    }

    const result = mbtiScorer.calculateType(state.answers);
    const detail = mbtiScorer.getDetail(result.type);
    const { type, rawScores, strength } = result;

    // 지표별 바 시각화
    const dims = [
        { dim: 'EI', pos: 'E', neg: 'I', score: rawScores.EI },
        { dim: 'SN', pos: 'S', neg: 'N', score: rawScores.SN },
        { dim: 'TF', pos: 'T', neg: 'F', score: rawScores.TF },
        { dim: 'JP', pos: 'J', neg: 'P', score: rawScores.JP }
    ];

    const strengthBarsHTML = dims.map(d => {
        const pct = Math.round(strength[d.dim] * 100);
        const winner = d.score >= 0 ? d.pos : d.neg;
        const color = DIMENSION_COLORS[d.dim];
        // 50% 기준으로 좌(neg) / 우(pos) 방향 바
        const posWidth = d.score >= 0 ? Math.min(50 + pct / 2, 100) : 50;
        const negWidth = d.score < 0  ? Math.min(50 + pct / 2, 100) : 50;
        const fillWidth = pct;

        return `
            <div class="strength-row">
                <span class="strength-label neg">${d.neg}</span>
                <div class="strength-track">
                    <div class="strength-fill" style="
                        width: ${fillWidth}%;
                        background: ${color};
                        ${d.score >= 0 ? 'margin-left: 50%; transform: none;' : 'margin-right: 50%; margin-left: auto;'}
                    "></div>
                    <div class="strength-midline"></div>
                </div>
                <span class="strength-label pos">${d.pos}</span>
                <span class="strength-pct" style="color: ${color};">${winner} ${pct}%</span>
            </div>
        `;
    }).join('');

    container.innerHTML = `
        <div class="view fade-in">
            <div class="result-header">
                <h2 class="subtitle">🎉 ${state.name}님의 업무 성향은...</h2>
                <div class="mbti-huge type-${type[0]}">${type}</div>
                <h3 class="title" style="font-size: 2rem; margin-bottom: 1rem;">"${detail.title}"</h3>
                <p style="color: var(--primary-light); font-weight: 600; margin-bottom: 2rem;">#${detail.keyword.split(', ').join(' #')}</p>
            </div>

            <div class="glass-card text-left">
                <p class="result-desc">${detail.desc}</p>
            </div>

            <div class="glass-card">
                <h3 class="text-center mb-6" style="font-size: 1.2rem; font-weight: 700; color: var(--text-muted);">지표별 성향 강도</h3>
                <div class="strength-chart">
                    ${strengthBarsHTML}
                </div>
            </div>

            <div class="options-grid" style="flex-direction: column; gap: 1rem;">
                <button id="saveBtn" class="btn-primary" style="background: linear-gradient(135deg, #4ade80 0%, #3b82f6 100%); box-shadow: 0 10px 15px -3px rgba(74, 222, 128, 0.4);">내 결과 팀 대시보드에 저장하기</button>
                <div style="display: flex; gap: 1rem; width: 100%;">
                    <button id="retryBtn" class="btn-secondary" style="flex: 1;">다시하기</button>
                    <button id="teamBtn" class="btn-primary" style="flex: 2;">팀 대시보드 보러가기</button>
                </div>
            </div>
        </div>
    `;

    container.querySelector('#retryBtn').addEventListener('click', () => navigate('home'));
    container.querySelector('#teamBtn').addEventListener('click', () => navigate('teamReport'));

    let isSaved = false;
    container.querySelector('#saveBtn').addEventListener('click', async (e) => {
        if (isSaved) return;

        const btn = e.currentTarget;
        btn.innerHTML = '저장 중... ⏳';
        btn.style.opacity = '0.7';
        btn.style.pointerEvents = 'none';

        const res = await store.addMember({
            name: state.name,
            mbti: type,
            scores: rawScores
        });

        if (res) {
            isSaved = true;
            btn.innerHTML = '✅ 팀 대시보드에 저장 완료!';
            btn.style.opacity = '1';
            btn.style.background = 'rgba(74, 222, 128, 0.2)';
            btn.style.color = '#4ade80';
            btn.style.border = '1px solid currentColor';
            btn.style.boxShadow = 'none';
        } else {
            btn.innerHTML = '❌ 저장 실패 (다시 시도)';
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'auto';
        }
    });
}
