// 28문항 리커트 척도 MBTI 테스트
// weight: 1 = 앞 글자(E/S/T/J) 방향, -1 = 뒷 글자(I/N/F/P) 방향
// 점수: -2(매우 아니다) ~ +2(매우 그렇다), weight 곱해서 합산
// dimension: EI, SN, TF, JP

export const questions = [
    // [E vs I] 에너지의 방향 — 7문항
    {
        id: "q1",
        dimension: "EI",
        text: "모르는 사람들이 많은 파티나 모임에 가는 것을 즐긴다.",
        weight: 1  // E 방향
    },
    {
        id: "q2",
        dimension: "EI",
        text: "생각한 다음에 말하기보다 말하면서 생각을 정리하는 편이다.",
        weight: 1  // E 방향
    },
    {
        id: "q3",
        dimension: "EI",
        text: "혼자 시간을 보내는 것보다 사람들과 어울릴 때 에너지가 충전된다.",
        weight: 1  // E 방향
    },
    {
        id: "q4",
        dimension: "EI",
        text: "침묵이 흐르는 상황을 견디기 힘들어 먼저 말을 꺼내곤 한다.",
        weight: 1  // E 방향
    },
    {
        id: "q5",
        dimension: "EI",
        text: "주말에 집에만 있으면 답답함을 느낀다.",
        weight: 1  // E 방향
    },
    {
        id: "q6",
        dimension: "EI",
        text: "팀 프로젝트에서 의견을 먼저 제시하는 것에 거부감이 없다.",
        weight: 1  // E 방향
    },
    {
        id: "q7",
        dimension: "EI",
        text: "새로운 사람에게 먼저 다가가 통성명을 하는 것이 자연스럽다.",
        weight: 1  // E 방향
    },

    // [S vs N] 인식의 방식 — 7문항
    {
        id: "q8",
        dimension: "SN",
        text: "구체적인 데이터나 사실보다는 직감과 영감을 믿는 편이다.",
        weight: -1  // N 방향
    },
    {
        id: "q9",
        dimension: "SN",
        text: "업무를 할 때 세부 매뉴얼보다는 전체적인 맥락과 비전이 더 중요하다.",
        weight: -1  // N 방향
    },
    {
        id: "q10",
        dimension: "SN",
        text: '"만약에~"라는 상상을 자주 하며 공상에 빠지곤 한다.',
        weight: -1  // N 방향
    },
    {
        id: "q11",
        dimension: "SN",
        text: "창의적이고 새로운 방식보다 검증된 기존 방식을 선호한다.",
        weight: 1  // S 방향
    },
    {
        id: "q12",
        dimension: "SN",
        text: "설명서를 읽을 때 단계별 지침을 꼼꼼히 따르는 편이다.",
        weight: 1  // S 방향
    },
    {
        id: "q13",
        dimension: "SN",
        text: "미래의 가능성보다 현재 닥친 현실적인 문제를 해결하는 것이 우선이다.",
        weight: 1  // S 방향
    },
    {
        id: "q14",
        dimension: "SN",
        text: "추상적인 이론보다는 실생활에 즉시 적용 가능한 지식이 흥미롭다.",
        weight: 1  // S 방향
    },

    // [T vs F] 판단과 결정 — 7문항
    {
        id: "q15",
        dimension: "TF",
        text: "타인의 감정에 공감하기보다 논리적인 오류를 먼저 찾아내는 편이다.",
        weight: 1  // T 방향
    },
    {
        id: "q16",
        dimension: "TF",
        text: "결정을 내릴 때 원칙과 공정성보다 주변 사람의 기분을 더 고려한다.",
        weight: -1  // F 방향
    },
    {
        id: "q17",
        dimension: "TF",
        text: "누군가 고민을 말할 때 위로보다는 해결책을 먼저 제시한다.",
        weight: 1  // T 방향
    },
    {
        id: "q18",
        dimension: "TF",
        text: '"옳고 그름"보다 "좋고 나쁨"이 판단의 기준이 될 때가 많다.',
        weight: -1  // F 방향
    },
    {
        id: "q19",
        dimension: "TF",
        text: "비판을 받았을 때 이를 개인적인 공격으로 받아들이지 않고 분석한다.",
        weight: 1  // T 방향
    },
    {
        id: "q20",
        dimension: "TF",
        text: "화합을 위해 가끔은 진실을 말하지 않는 것이 필요하다고 생각한다.",
        weight: -1  // F 방향
    },
    {
        id: "q21",
        dimension: "TF",
        text: "논쟁에서 이기는 것보다 갈등을 원만하게 해결하는 것이 더 중요하다.",
        weight: -1  // F 방향
    },

    // [J vs P] 이행과 양식 — 7문항
    {
        id: "q22",
        dimension: "JP",
        text: "여행을 갈 때 시간 단위로 세부 계획을 세우는 것이 마음 편하다.",
        weight: 1  // J 방향
    },
    {
        id: "q23",
        dimension: "JP",
        text: "마감 기한이 닥쳐서 집중력이 폭발할 때 쾌감을 느낀다.",
        weight: -1  // P 방향
    },
    {
        id: "q24",
        dimension: "JP",
        text: "주변 환경이 항상 정돈되어 있어야 집중이 잘 된다.",
        weight: 1  // J 방향
    },
    {
        id: "q25",
        dimension: "JP",
        text: "상황에 따라 계획을 유연하게 변경하는 것을 선호한다.",
        weight: -1  // P 방향
    },
    {
        id: "q26",
        dimension: "JP",
        text: "해야 할 일을 미리 리스트업하고 하나씩 지워나가는 습관이 있다.",
        weight: 1  // J 방향
    },
    {
        id: "q27",
        dimension: "JP",
        text: "준비가 완벽하지 않더라도 일단 시작하는 편이다.",
        weight: -1  // P 방향
    },
    {
        id: "q28",
        dimension: "JP",
        text: "약속 시간을 어기는 사람을 이해하기 힘들다.",
        weight: 1  // J 방향
    }
];

export const likertOptions = [
    { label: "매우 아니다", value: -2 },
    { label: "아니다",     value: -1 },
    { label: "보통",       value:  0 },
    { label: "그렇다",     value:  1 },
    { label: "매우 그렇다", value:  2 }
];
