export { THEMES } from '@/lib/config/themes';
export { FONT_SETS } from '@/lib/config/fonts';

export const WEDDING = {
  groom: {
    name: '허재',
    role: '장남',
    parents: '허규 · 곽정옥',
    phone: '010-7518-7260',
  },
  bride: {
    name: '오지희',
    role: '차녀',
    parents: '오진섭 · 김선미',
    phone: '010-3307-2596',
  },

  dateISO: '2026-08-29T14:20:00+09:00',
  dateLabel: '2026년 8월 29일 토요일',
  timeLabel: '오후 2시 20분',

  venue: '더링크서울 트리뷰트 포트폴리오 호텔 웨딩',
  hall: '7층 화이트홀',
  address: '서울특별시 구로구 경인로 610',

  greetingText: `서로 다른 길을 걷던 두 사람이
사랑이라는 이름으로 만나
하나의 길을 걸어가고자 합니다.

귀한 걸음으로 축복해 주시면
큰 기쁨이 되겠습니다.`,

  accounts: {
    groom: [
      { who: '신랑 허재', bank: '카카오뱅크', num: '3333-11-6276553' },
      { who: '혼주 허규', bank: '신한은행', num: '110-234-567890' },
      { who: '혼주 곽정옥', bank: '신한은행', num: '110-234-567890' },
    ],
    bride: [
      { who: '신부 오지희', bank: '신한은행', num: '110-440-620748' },
      { who: '혼주 오진섭', bank: 'IBK기업은행', num: '336-032135-01-025' },
      { who: '혼주 김선미', bank: '하나은행', num: '476-810269-89007' },
    ],
  },

  interview: {
    groom: {
      label: '신랑 · 허재',
      qa: [
        { q: '서로의 첫 인상은?', a: '웃을 때 눈이 반달 모양이 되는 게 참 예뻤어요. 그 한 장면으로 끝이었죠.' },
        { q: '상대방의 가장 사랑스러운 순간은?', a: '아침에 일어나서 아직 졸린 목소리로 이름을 부를 때. 그 순간 모든 게 따뜻해져요.' },
        { q: '평생 지키고 싶은 약속 한 가지', a: '어떤 하루든 하루의 끝에는 반드시 웃으며 마주 보기로 했어요.' },
        { q: '결혼식 날 가장 기대되는 순간', a: '예식장 끝에서 저를 향해 천천히 걸어오는 지희의 모습이요.' },
      ],
    },
    bride: {
      label: '신부 · 오지희',
      qa: [
        { q: '서로의 첫 인상은?', a: '조금은 무뚝뚝해 보이지만 웃을 때만큼은 누구보다 다정한 사람이었어요.' },
        { q: '상대방의 가장 사랑스러운 순간은?', a: '말없이 손을 꼭 잡아줄 때. 그 작은 제스처 하나가 언제나 큰 위로가 돼요.' },
        { q: '평생 지키고 싶은 약속 한 가지', a: '서로의 꿈을 먼저 응원하는 사람이 되기로 했어요.' },
        { q: '결혼식 날 가장 기대되는 순간', a: '우리를 축하해주러 와준 모든 분들께 감사를 전하는 순간이요.' },
      ],
    },
  },

  location: {
    lat: 37.4954,
    lng: 126.8876,
    mapLabel: '더링크서울',
    transport: [
      { icon: 'subway' as const, title: '지하철', lines: ['7호선 온수역 1번 출구', '도보 5분'] },
      { icon: 'bus' as const, title: '버스', lines: ['간선 5618, 6614', '온수역.더링크서울 하차'] },
      { icon: 'car' as const, title: '자가용', lines: ['내비게이션 "더링크서울 웨딩"', '지하 주차장 3시간 무료'] },
    ],
  },

  storage: {
    bucket: 'wedding',
    galleryBucket: 'wedding-phots',
    cover: 'main.jpeg',
    portraits: { groom: 'groom.jpg', bride: 'bride.jpg' },
  },
} as const;
