// 점수 기반 2인 궁합(Chemistry) 로직
// 가이드 기준: 동일 지표 = 25점, 보완 지표(다름) = 15점
// 4개 지표 합산 최대 100점

const SAME_BONUS = 25;
const COMPLEMENT_BONUS = 15;

// 지표별 궁합 매트릭스 텍스트
const dimensionMatrix = {
    EI: {
        same: {
            EE: { synergy: "활발한 소통과 넘치는 에너지로 빠른 의사결정이 가능합니다.", growth: "과도한 외향성으로 깊은 집중이 필요한 작업에서 서로 방해가 될 수 있습니다." },
            II: { synergy: "신중하고 깊은 사고로 완성도 높은 결과물을 만들어냅니다.", growth: "의사소통이 소극적이어서 중요한 논의가 늦어질 수 있습니다." }
        },
        diff: { synergy: "활발한 리드와 신중한 지원의 최적 조화를 이룹니다.", growth: "의사소통 속도 차이를 서로 배려하는 노력이 필요합니다." }
    },
    SN: {
        same: {
            SS: { synergy: "현실적인 디테일과 실행력으로 안정적인 결과를 냅니다.", growth: "큰 그림을 놓치거나 혁신적인 아이디어가 부족할 수 있습니다." },
            NN: { synergy: "풍부한 아이디어와 비전으로 혁신적인 방향을 제시합니다.", growth: "실무적인 구체성이 부족해 실행력이 약해질 수 있습니다." }
        },
        diff: { synergy: "실무적 디테일과 거시적 비전의 완벽한 결합입니다.", growth: "관점 차이로 인한 우선순위 충돌을 주의해야 합니다." }
    },
    TF: {
        same: {
            TT: { synergy: "논리적이고 객관적인 분석으로 최적의 의사결정을 내립니다.", growth: "감정적 배려가 부족해 팀 분위기가 차갑게 느껴질 수 있습니다." },
            FF: { synergy: "따뜻한 공감과 배려로 팀의 분위기를 화기애애하게 유지합니다.", growth: "감정에 치우쳐 비효율적인 결정을 내릴 위험이 있습니다." }
        },
        diff: { synergy: "객관적 분석과 감성적 배려의 완벽한 균형을 이룹니다.", growth: "비판 시 감정적 상처가 생기지 않도록 표현 방식에 주의가 필요합니다." }
    },
    JP: {
        same: {
            JJ: { synergy: "철저한 계획과 실행으로 마감을 철저히 지키며 신뢰를 쌓습니다.", growth: "돌발 상황에 유연하게 대응하는 능력이 부족할 수 있습니다." },
            PP: { synergy: "유연하고 창의적으로 상황에 적응하며 새로운 기회를 포착합니다.", growth: "마감 관리와 체계적인 계획 수립에 어려움을 겪을 수 있습니다." }
        },
        diff: { synergy: "철저한 계획과 유연한 대응이 공존하는 최강 조합입니다.", growth: "마감 기한 및 업무 방식에 대한 사전 합의가 반드시 필요합니다." }
    }
};

export const compatibilityMatrix = {
    /**
     * 두 MBTI 타입의 궁합 분석
     * @param {string} mbtiA
     * @param {string} mbtiB
     * @returns {{ score: number, level: string, label: string, breakdown: Array, desc: string }}
     */
    getMatch(mbtiA, mbtiB) {
        const a = mbtiA.toUpperCase();
        const b = mbtiB.toUpperCase();

        // [EI, SN, TF, JP] 순서 인덱스
        const dims = ['EI', 'SN', 'TF', 'JP'];
        const aChars = [a[0], a[1], a[2], a[3]];
        const bChars = [b[0], b[1], b[2], b[3]];

        let totalScore = 0;
        const breakdown = [];

        dims.forEach((dim, i) => {
            const ac = aChars[i];
            const bc = bChars[i];
            const isSame = (ac === bc);
            const pts = isSame ? SAME_BONUS : COMPLEMENT_BONUS;
            totalScore += pts;

            const matrix = dimensionMatrix[dim];
            let synergy, growth;
            if (isSame) {
                const key = ac + bc;
                synergy = matrix.same[key]?.synergy || matrix.diff.synergy;
                growth  = matrix.same[key]?.growth  || matrix.diff.growth;
            } else {
                synergy = matrix.diff.synergy;
                growth  = matrix.diff.growth;
            }

            breakdown.push({
                dimension: dim,
                labelA: ac,
                labelB: bc,
                isSame,
                score: pts,
                synergy,
                growth
            });
        });

        // 점수 → 등급
        let level, label;
        if (totalScore >= 85) {
            level = 'perfect'; label = '환상의 궁합 ✨';
        } else if (totalScore >= 70) {
            level = 'good';    label = '좋은 파트너 👍';
        } else if (totalScore >= 55) {
            level = 'soso';    label = '균형 잡힌 팀 ⚖️';
        } else {
            level = 'growth';  label = '성장형 파트너 🌱';
        }

        const desc = totalScore >= 85
            ? '두 분은 서로의 강점이 완벽하게 맞물리는 환상의 콤비입니다. 함께하면 탁월한 시너지를 발휘할 수 있습니다.'
            : totalScore >= 70
            ? '서로를 잘 이해하고 보완하는 좋은 파트너입니다. 각자의 장점을 살리면 훌륭한 결과를 낼 수 있습니다.'
            : totalScore >= 55
            ? '서로 다른 점을 통해 균형을 맞추는 팀입니다. 차이를 이해하고 협력하면 시너지가 생깁니다.'
            : '서로 다른 점이 많아 초반에는 마찰이 생길 수 있지만, 그만큼 서로에게서 배울 점도 많습니다.';

        return { score: totalScore, level, label, breakdown, desc };
    }
};
