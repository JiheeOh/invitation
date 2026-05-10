export { THEMES } from '@/lib/config/themes';
export { FONT_SETS } from '@/lib/config/fonts';

export const WEDDING = {
  groom: {
    name: '허재',
    role: '장남',
    fatherName: '허규',
    motherName: '곽정옥',
    birth: '',
    city: '',
    job: '',
    wish: '',
  },
  bride: {
    name: '오지희',
    role: '차녀',
    fatherName: '오진섭',
    motherName: '김선미',
    birth: '',
    city: '',
    job: '',
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
      { who: '혼주 허규', bank: '신한은행', num: '110-234-567890' },
      { who: '혼주 곽정옥', bank: '신한은행', num: '110-234-567890' },
    ],
    bride: [
      { who: '신부 오지희', bank: '신한은행', num: '110-440-620748' },
      { who: '혼주 오진섭', bank: 'IBK기업은행', num: '336-032135-01-025' },
      { who: '혼주 김선미', bank: '하나은행', num: '476-810269-89007' },
    ],
  },

  contacts: {
    groomFather: { tel: '' },
    groomMother: { tel: '' },
    brideFather: { tel: '' },
    brideMother: { tel: '' },
  },

  interview: [
    {
      q: '서로의 첫 인상은?',
      groom: '웃을 때 눈이 반달 모양이 되는 게 참 예뻤어요. 그 한 장면으로 끝이었죠.',
      bride: '조금은 무뚝뚝해 보이지만 웃을 때만큼은 누구보다 다정한 사람이었어요.',
    },
    {
      q: '상대방의 가장 사랑스러운 순간은?',
      groom: '아침에 일어나서 아직 졸린 목소리로 이름을 부를 때. 그 순간 모든 게 따뜻해져요.',
      bride: '말없이 손을 꼭 잡아줄 때. 그 작은 제스처 하나가 언제나 큰 위로가 돼요.',
    },
    {
      q: '평생 지키고 싶은 약속 한 가지',
      groom: '어떤 하루든 하루의 끝에는 반드시 웃으며 마주 보기로 했어요.',
      bride: '서로의 꿈을 먼저 응원하는 사람이 되기로 했어요.',
    },
    {
      q: '결혼식 날 가장 기대되는 순간',
      groom: '예식장 끝에서 저를 향해 천천히 걸어오는 지희의 모습이요.',
      bride: '우리를 축하해주러 와준 모든 분들께 감사를 전하는 순간이요.',
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
          '1·2호선 신도림역 1번 출구 — 도보 10분',
          '셔틀버스 수시 운행',
          '1호선 구로역 3번 출구 — 도보 5분',
          '(셔틀버스 미운행)',
        ],
      },
      {
        kind: 'bus' as const,
        title: '버스',
        lines: [
          '[신도림동(구로역)]',
          '경기일반  10, 11-1, 11-2, 83, 88, 530',
          '간선  160, 503, 600, 660, 662, N16(심야)',
          '지선  6515, 6516, 6637, 6640A, 6640B, 6713, 6411, 6511',
          '직행  301, 320, 5200',
          '마을  양천04',
          '[신도림중학교]',
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
    bucket: 'wedding',
    galleryBucket: 'wedding-phots',
    cover: 'main.jpeg',
    closing: 'closing.jpeg',
    portraits: { groom: 'groom.jpg', bride: 'bride.jpg' },
  },
} as const;
