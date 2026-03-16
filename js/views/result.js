import { mbtiScorer } from '../logic/mbtiScorer.js';
import { store } from '../utils/store.js';

export function renderResult(container, navigate, state) {
    if (!state || !state.name || !state.answers) {
        navigate('home');
        return;
    }

    // calculate type
    const result = mbtiScorer.calculateType(state.answers);
    const detail = mbtiScorer.getDetail(result.type);
    
    // save to store
    store.addMember({
        name: state.name,
        mbti: result.type,
        date: new Date().toISOString(),
        scores: result.scores
    });

    container.innerHTML = `
        <div class="view fade-in">
            <div class="result-header">
                <h2 class="subtitle">🎉 ${state.name}님의 업무 성향은...</h2>
                <div class="mbti-huge type-${result.type[0]}">${result.type}</div>
                <h3 class="title" style="font-size: 2rem; margin-bottom: 1rem;">"${detail.title}"</h3>
                <p style="color: var(--primary-light); font-weight: 600; margin-bottom: 2rem;">#${detail.keyword.split(', ').join(' #')}</p>
            </div>
            
            <div class="glass-card text-center text-left">
                <p class="result-desc">${detail.desc}</p>
            </div>

            <div class="options-grid" style="flex-direction: row; gap: 1rem;">
                <button id="retryBtn" class="btn-secondary" style="flex: 1;">다시하기</button>
                <button id="teamBtn" class="btn-primary" style="flex: 2;">팀 궁합 보러가기</button>
            </div>
        </div>
    `;

    container.querySelector('#retryBtn').addEventListener('click', () => {
        navigate('home');
    });

    container.querySelector('#teamBtn').addEventListener('click', () => {
        navigate('teamReport');
    });
}
