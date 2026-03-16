import { questions } from '../data/questions.js';

export function renderTest(container, navigate, state) {
    if (!state || !state.name) {
        navigate('home');
        return;
    }

    let currentIndex = 0;
    const answers = [];

    const renderQuestion = () => {
        const question = questions[currentIndex];
        const progress = ((currentIndex) / questions.length) * 100;

        container.innerHTML = `
            <div class="view fade-in">
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${progress}%"></div>
                </div>
                <h2 class="title" style="font-size: 1.5rem; text-align: center; margin-bottom: 2rem;">Q${currentIndex + 1}. ${question.text}</h2>
                <div class="options-grid">
                    ${question.options.map((opt, idx) => `
                        <button class="option-btn" data-type="${opt.type}" data-value="${opt.value}">
                            ${opt.text}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        const btns = container.querySelectorAll('.option-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = e.currentTarget.dataset.type;
                const value = parseInt(e.currentTarget.dataset.value, 10);
                
                answers.push({ type, value });
                
                if (currentIndex < questions.length - 1) {
                    currentIndex++;
                    renderQuestion();
                } else {
                    // finish test
                    finishTest();
                }
            });
        });
    };

    const finishTest = () => {
        navigate('result', { name: state.name, answers });
    };

    renderQuestion();
}
