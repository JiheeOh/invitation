# 모바일 청첩장 - Next.js + Supabase

허재 ♡ 오지희의 모바일 웨딩 초대장입니다.

## 기능

- **테마 선택**: 라벤더, 로즈, 크림, 세이지 4가지 테마
- **폰트 선택**: 명조+캘리, 모던 고딕, 손글씨 무드 3가지 폰트
- **꽃잎 효과**: 연보라 꽃잎 애니메이션 (on/off 가능)
- **D-day 카운트다운**: 실시간 날짜 계산
- **갤러리**: 사진 그리드 + 라이트박스
- **위치 정보**: 지도 및 대중교통 안내
- **계좌 정보**: 신랑/신부 계좌 복사 기능
- **방명록**: 축하 메시지 저장 (localStorage 기반)
- **Tweaks 패널**: 테마/폰트/효과 실시간 변경

## 설치

```bash
npm install
```

## 환경 변수 설정

`.env.local` 파일을 만들고 Supabase 정보를 입력하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000에서 확인하세요.

## 빌드

```bash
npm run build
npm start
```

## 배포 (Vercel)

1. GitHub에 푸시
2. [Vercel](https://vercel.com)에서 프로젝트 import
3. 환경 변수 설정
4. 자동 배포

## 구조

```
components/
  ├── sections/          # 각 섹션 컴포넌트
  │   ├── Cover.tsx
  │   ├── Greeting.tsx
  │   ├── Family.tsx
  │   ├── CalendarSection.tsx
  │   ├── Gallery.tsx
  │   ├── Location.tsx
  │   ├── Accounts.tsx
  │   └── Guestbook.tsx
  ├── Invitation.tsx     # 메인 컴포넌트
  ├── PetalShower.tsx    # 꽃잎 애니메이션
  ├── Tweaks.tsx         # 설정 패널
  └── ...
lib/
  ├── supabase.ts        # Supabase 클라이언트
  ├── wedding-data.ts    # 웨딩 데이터 + 테마
  ├── hooks.ts           # 커스텀 훅
  └── utils.ts           # 유틸 함수
app/
  ├── layout.tsx         # 레이아웃
  ├── page.tsx           # 메인 페이지
  └── globals.css        # 글로벌 스타일
```

## 커스터마이징

### 웨딩 정보 수정

`lib/wedding-data.ts`에서:

```typescript
export const WEDDING = {
  groom: { name: '신랑명', ... },
  bride: { name: '신부명', ... },
  dateISO: '2026-08-29T14:20:00+09:00',
  // ...
};
```

### 테마 추가

`lib/wedding-data.ts`의 `THEMES` 객체에 새 테마 추가:

```typescript
const THEMES = {
  // ...
  custom: {
    name: '커스텀',
    bg: '#ffffff',
    // ... 색상 정의
  }
};
```
