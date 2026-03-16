// Logic to calculate final MBTI traits
export const mbtiScorer = {
    calculateType(answers) {
        // answers array of { type: 'E', value: 1 }
        const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
        
        answers.forEach(ans => {
            scores[ans.type] += ans.value;
        });
        
        const type = [
            scores.E >= scores.I ? 'E' : 'I',
            scores.S >= scores.N ? 'S' : 'N',
            scores.T >= scores.F ? 'T' : 'F',
            scores.J >= scores.P ? 'J' : 'P'
        ].join('');

        return { type, scores };
    },

    getDetail(mbti) {
        const details = {
            INTJ: { title: "전략가", keyword: "완벽주의, 논리적, 독립적", desc: "뛰어난 비전과 혁신적인 아이디어를 가진 완벽주의자입니다. 팀의 효율성을 높이는데 탁월합니다." },
            INTP: { title: "논리술사", keyword: "탐구심, 지적 호기심, 창의성", desc: "새로운 접근 방식을 탐구하는 혁신가입니다. 틀에 얽매이지 않고 문제의 본질을 파악합니다." },
            ENTJ: { title: "통솔자", keyword: "리더십, 결단력, 효율성", desc: "목표 달성을 위해 팀을 진두지휘하는 타고난 리더입니다. 구조화와 전략 수립에 강합니다." },
            ENTP: { title: "변론가", keyword: "창의력, 에너지, 토론", desc: "위기에 대처하는 능력이 뛰어나며, 끊임없이 새로운 아이디어를 던지는 브레인스토머입니다." },
            INFJ: { title: "옹호자", keyword: "통찰력, 이타주의, 신념", desc: "사람에 대한 통찰력이 깊고, 팀의 긍정적인 가치를 수호하는 조용한 안내자입니다." },
            INFP: { title: "중재자", keyword: "이상주의, 공감, 진정성", desc: "팀 내의 조화를 중시하며, 창의적이고 감수성이 풍부한 아이디어 뱅크입니다." },
            ENFJ: { title: "선도자", keyword: "카리스마, 격려, 이타심", desc: "팀원을 동기부여하고 함께 성장하는 것을 즐기는 열정적인 멘토입니다." },
            ENFP: { title: "활동가", keyword: "열정, 상상력, 긍정", desc: "팀에 에너지를 불어넣는 분위기 메이커로, 기발한 아이디어로 분위기를 반전시킵니다." },
            ISTJ: { title: "현실주의자", keyword: "책임감, 원칙, 성실함", desc: "사실에 기반하여 신중하게 업무를 처리하며, 팀의 신뢰성 있는 기둥 역할을 합니다." },
            ISFJ: { title: "수호자", keyword: "헌신, 디테일, 온화함", desc: "팀원들을 꼼꼼하게 살피고 챙기는 따뜻한 수호자로, 안정적인 업무 처리가 돋보입니다." },
            ESTJ: { title: "경영자", keyword: "관리, 체계, 현실감각", desc: "사실을 중시하고 명확성, 규칙을 선호하는 관리자로, 프로젝트를 현실적으로 이끕니다." },
            ESFJ: { title: "집정관", keyword: "친절, 협력, 배려", desc: "타인에 대한 깊은 배려를 바탕으로 팀의 분위기를 화기애애하게 만드는 조율자입니다." },
            ISTP: { title: "장인", keyword: "관찰력, 효율성, 임기응변", desc: "논리적이고 실질적으로 문제를 해결하는 만능 재주꾼입니다. 위기 상황에서 침착합니다." },
            ISFP: { title: "모험가", keyword: "예술적, 온화함, 호기심", desc: "유연하고 새로운 것을 시도하는 데 두려움이 없는 조용하지만 강한 실무자입니다." },
            ESTP: { title: "사업가", keyword: "활동적, 순발력, 추진력", desc: "에너지가 넘치고 위험을 감수하며 실행에 옮기는 행동파 실무자입니다." },
            ESFP: { title: "연예인", keyword: "사교성, 열정, 즉흥성", desc: "주변 사람들을 즐겁게 하고, 순간의 에너지를 활용하여 긍정적인 성과를 내는 팀 플레이어입니다." }
        };

        return details[mbti.toUpperCase()] || { title: "알 수 없음", keyword: "비밀", desc: "성향을 완벽하게 파악하기 어렵습니다." };
    }
};
