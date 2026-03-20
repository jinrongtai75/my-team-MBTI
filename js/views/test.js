import { questions, likertOptions } from '../data/questions.js';

const DIMENSION_LABELS = { EI: '에너지', SN: '인식', TF: '판단', JP: '생활방식' };
const DIMENSION_COLORS = {
    EI: 'var(--primary-light)',
    SN: '#34d399',
    TF: '#f472b6',
    JP: '#fbbf24'
};

export function renderTest(container, navigate, state) {
    if (!state || !state.name) {
        navigate('home');
        return;
    }

    let currentIndex = 0;
    // answers: [{ dimension, weight, likertValue }]
    const answers = new Array(questions.length).fill(null);

    const renderQuestion = () => {
        const q = questions[currentIndex];
        const progress = (currentIndex / questions.length) * 100;
        const color = DIMENSION_COLORS[q.dimension];

        container.innerHTML = `
            <div class="view fade-in">
                <div class="test-header">
                    <div class="progress-info">
                        <span class="q-counter">${currentIndex + 1} / ${questions.length}</span>
                        <span class="dim-badge" style="background: ${color}22; color: ${color}; border: 1px solid ${color}55;">
                            ${DIMENSION_LABELS[q.dimension]}
                        </span>
                    </div>
                    <div class="progress-container">
                        <div class="progress-bar" style="width: ${progress}%; background: linear-gradient(to right, ${color}, var(--secondary));"></div>
                    </div>
                </div>

                <div class="question-card glass-card">
                    <p class="q-number">Q${currentIndex + 1}</p>
                    <h2 class="q-text">${q.text}</h2>
                </div>

                <div class="likert-scale">
                    ${likertOptions.map((opt, idx) => `
                        <button
                            class="likert-btn ${answers[currentIndex] !== null && answers[currentIndex].likertValue === opt.value ? 'selected' : ''}"
                            data-value="${opt.value}"
                            data-idx="${idx}"
                            style="--btn-color: ${color};"
                        >
                            <span class="likert-dot"></span>
                            <span class="likert-label">${opt.label}</span>
                        </button>
                    `).join('')}
                </div>

                <div class="nav-btns">
                    <button class="btn-secondary nav-prev" ${currentIndex === 0 ? 'disabled' : ''}>← 이전</button>
                    <button class="btn-primary nav-next" ${answers[currentIndex] === null ? 'disabled' : ''}>
                        ${currentIndex === questions.length - 1 ? '결과 보기 🎉' : '다음 →'}
                    </button>
                </div>
            </div>
        `;

        // 리커트 버튼 클릭
        container.querySelectorAll('.likert-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const value = parseInt(e.currentTarget.dataset.value, 10);
                answers[currentIndex] = {
                    dimension: q.dimension,
                    weight: q.weight,
                    likertValue: value
                };

                // 선택 표시 갱신
                container.querySelectorAll('.likert-btn').forEach(b => b.classList.remove('selected'));
                e.currentTarget.classList.add('selected');

                // next 버튼 활성화
                const nextBtn = container.querySelector('.nav-next');
                nextBtn.disabled = false;

                // 잠깐 후 자동 진행
                setTimeout(() => {
                    if (currentIndex < questions.length - 1) {
                        currentIndex++;
                        renderQuestion();
                    } else {
                        finishTest();
                    }
                }, 300);
            });
        });

        // 이전 버튼
        const prevBtn = container.querySelector('.nav-prev');
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                renderQuestion();
            }
        });

        // 다음 버튼 (수동)
        const nextBtn = container.querySelector('.nav-next');
        nextBtn.addEventListener('click', () => {
            if (answers[currentIndex] === null) return;
            if (currentIndex < questions.length - 1) {
                currentIndex++;
                renderQuestion();
            } else {
                finishTest();
            }
        });
    };

    const finishTest = () => {
        // null 답변이 있으면 첫 번째 null로 이동
        const firstNull = answers.indexOf(null);
        if (firstNull !== -1) {
            currentIndex = firstNull;
            renderQuestion();
            return;
        }
        navigate('result', { name: state.name, answers });
    };

    renderQuestion();
}
