export const compatibilityMatrix = {
    // simplified mock matrix returning one of 4 levels for a pair
    // levels: 'perfect' (천생연분), 'good' (좋은관계), 'soso' (보통), 'bad' (상극)
    getMatch(mbtiA, mbtiB) {
        const a = mbtiA.toUpperCase();
        const b = mbtiB.toUpperCase();

        // Specific combinations that are known to be "perfect" or "bad"
        const perfectMatches = [
            ['INFP', 'ENFJ'], ['INFP', 'ENTJ'],
            ['ENFP', 'INFJ'], ['ENFP', 'INTJ'],
            ['INFJ', 'ENFP'], ['INFJ', 'ENTP'],
            ['ENFJ', 'INFP'], ['ENFJ', 'ISFP'],
            ['INTJ', 'ENFP'], ['INTJ', 'ENTP'],
            ['ENTJ', 'INFP'], ['ENTJ', 'INTP'],
            ['INTP', 'ENTJ'], ['INTP', 'ESTJ'],
            ['ENTP', 'INFJ'], ['ENTP', 'INTJ']
            // Extensible...
        ];
        
        const badMatches = [
            ['INFP', 'ESTJ'], ['ENFP', 'ISTJ'],
            ['INFJ', 'ESTP'], ['ENFJ', 'ISTP'],
            ['INTJ', 'ESFP'], ['ENTJ', 'ISFP'],
            ['INTP', 'ESFJ'], ['ENTP', 'ISFJ']
        ];

        // check perfect
        for (let pair of perfectMatches) {
            if ((pair[0] === a && pair[1] === b) || (pair[0] === b && pair[1] === a)) {
                return { level: 'perfect', label: '최고의 궁합', desc: '두 분은 서로의 부족한 점을 채워주고 강점을 시너지로 만드는 환상의 콤비입니다. 프로젝트를 함께 하면 상호보완적인 최고의 결과를 낼 수 있습니다.' };
            }
        }

        // check bad
        for (let pair of badMatches) {
            if ((pair[0] === a && pair[1] === b) || (pair[0] === b && pair[1] === a)) {
                return { level: 'bad', label: '상극! 노력 필요', desc: '서로의 업무 접근 방식과 의사소통 스타일이 정반대입니다. 의견 충돌이 발생할 수 있으니 서로 다름을 인정하고 배려하는 노력이 필수입니다.' };
            }
        }

        // Check let count matching
        let matchCount = 0;
        for (let i = 0; i < 4; i++) {
            if (a[i] === b[i]) matchCount++;
        }

        if (matchCount >= 3) {
            return { level: 'good', label: '좋은 파트너', desc: '성향이 꽤 비슷하여 서로를 잘 이해할 수 있습니다. 비슷한 방식으로 일하기 때문에 충돌 없이 무난하게 협업할 수 있습니다.' };
        }

        return { level: 'soso', label: '보통의 동료', desc: '서로 다른 점도 있지만, 공통점도 있어 무난하게 협력할 수 있는 관계입니다. 각자의 장점을 살려 업무를 분담하면 좋습니다.' };
    }
};
