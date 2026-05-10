export { THEMES } from '@/lib/config/themes';
export { FONT_SETS } from '@/lib/config/fonts';

export const WEDDING = {
    groom: {
        name: '허재',
        role: '장남',
        fatherName: '허규',
        motherName: '곽정옥',
        birth: '94년 12월 27일',
        city: '경기 남양주시',
        job: 'IT 개발자👨🏻‍💻',
        wish: '',
    },
    bride: {
        name: '오지희',
        role: '차녀',
        fatherName: '오진섭',
        motherName: '김선미',
        birth: '95년 11월 12일',
        city: '경기 수원시',
        job: 'IT 개발자👩🏻‍💻',
        wish: '',
    },

    dateISO: '2026-08-29T14:20:00+09:00',
    dateLabel: '2026년 8월 29일 토요일',
    timeLabel: '오후 2시 20분',
    coverDate: '2026. 08. 29. SAT',
    coverTime: '2:20 PM',

    venue: '더링크서울 트리뷰트 포트폴리오 호텔 웨딩',
    hall: '7층 화이트홀',
    address: '서울특별시 구로구 경인로 610',

    greeting: {
        title: '저희 결혼합니다',
        paragraph1: `서로 다른 길을 걷던 두 사람이
사랑이라는 이름으로 만나
하나의 길을 걸어가고자 합니다.`,
        paragraph2: `귀한 걸음으로 축복해 주시면
큰 기쁨이 되겠습니다.`,
    },

    thanksMessage: `멀리서도 축하의 마음을
전하고 싶으신 분들을 위해
계좌번호를 안내드립니다.

소중한 축하를 보내주셔서 감사드리며,
따뜻한 마음에 깊이 감사드립니다.`,

    closingMessage: '행복하게 잘 살겠습니다',

    accounts: {
        groom: [
            { who: '신랑 허재', bank: '카카오뱅크', num: '3333-11-6276553' },
            { who: '혼주 허규', bank: '신한은행', num: '110-100-602621' },
            { who: '혼주 곽정옥', bank: '신한은행', num: '993-06-034265' },
        ],
        bride: [
            { who: '신부 오지희', bank: '신한은행', num: '110-440-620748' },
            { who: '혼주 오진섭', bank: 'IBK기업은행', num: '336-032135-01-025' },
            { who: '혼주 김선미', bank: '하나은행', num: '476-810269-89007' },
        ],
    },

    contacts: {
        groomFather: { tel: '010-6893-1221' },
        groomMother: { tel: '010-4858-1211' },
        brideFather: { tel: '010-2063-2917' },
        brideMother: { tel: '010-9660-2596' },
    },

    interview: [
        {
            q: '서로의 첫 인상은?',
            groom: '많은 수강생들 중에 자기 아냐고 당연한 듯이 물어보는 당돌하고 귀여운 사람',
            bride: '열정적이고 수강생들에게 정말 따뜻한 강사, 강한 인상 안에 언뜻 보이는 귀여움(?)',
        },
        {
            q: '평생 지키고 싶은 약속 한 가지는?',
            groom: '평생 외롭게 하지 않을게!',
            bride: '상대의 배려와 따뜻함을 당연하게 여기지 않기',
        },
        {
            q: '결혼하는 소감은?',
            groom: '나도 처음이지만 정말 좋은 사람 만나서 결혼한다!',
            bride: '장거리 연애와 바쁜 스케줄 속에도 항상 곁을 지켜줬어서 고맙고 이제는 더 많은 시간을 보낼 수 있어서 좋아요',
        },
    ],

    location: {
        lat: 37.5054141,
        lng: 126.8840785,
        mapLabel: '더링크서울',
        transport: [
            {
                kind: 'subway' as const,
                title: '지하철',
                lines: [
                    '1·2호선 신도림역 1번 출구 — 도보 10분 (셔틀버스 수시 운행)',
                    '1호선 구로역 3번 출구 — 도보 5분 (셔틀버스 미운행)',
                ],
            },
            {
                kind: 'bus' as const,
                title: '버스',
                lines: [
                    '[ 신도림동(구로역) ]',
                    '경기일반  10, 11-1, 11-2, 83, 88, 530',
                    '간선  160, 503, 600, 660, 662, N16(심야)',
                    '지선  6515, 6516, 6637, 6640A, 6640B, 6713, 6411, 6511',
                    '직행  301, 320, 5200',
                    '마을  양천04',
                    '[ 신도림중학교 ]',
                    '지선  5615, 5714, 6512, 6411, 6511',
                ],
            },
            {
                kind: 'car' as const,
                title: '자가용',
                lines: [
                    '웨딩고객 주차 1시간 30분 무료',
                    '서울특별시 구로구 경인로 610',
                    '(구) 서울특별시 구로구 신도림동 413-9',
                ],
            },
        ],
    },

    storage: {
        bucket: 'wedding-phots',
        cover: 'main.jpeg',
        closing: 'closing.jpg',
        portraits: { groom: 'groom.jpg', bride: 'bride.jpg' },
    },
} as const;
