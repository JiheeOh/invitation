# 배경음악(BGM) 설정 가이드

청첩장 페이지에 배경음악을 추가하는 방법입니다.

## 1. 음악 파일 준비

### 옵션 A: AI로 음악 만들기

#### Suno AI
1. [suno.ai](https://suno.ai) 방문
2. 로그인 (Google/Discord 계정 사용 가능)
3. "Create" 클릭
4. 다음 프롬프트 입력:
```
romantic korean wedding background music, 
soft piano, strings, gentle melody, 
no lyrics, 3 minutes, elevator music style
```
5. 생성 완료 후 mp3 다운로드

#### Udio
1. [udio.com](https://udio.com) 방문
2. 로그인
3. "Create" → "Song" 선택
4. 스타일: "Instrumental"
5. 분위기: "Romantic" 또는 "Classical"
6. 위 프롬프트 입력

#### Stable Audio
1. [stableaudio.com](https://stableaudio.com) 방문
2. 로그인
3. "Create" 클릭
4. Mood: Romantic, Duration: 3 minutes, Instrumental로 설정
5. 음악 생성

### 옵션 B: 무료 음악 다운로드

| 사이트 | 특징 |
|--------|------|
| **Pixabay Music** | 상업적 사용 가능, 웨딩/로맨틱 곡 풍부 |
| **Free Music Archive** | Creative Commons 라이선스, 장르 필터 |
| **Bensound** | 배경음악 전문, 피아노/현악 다수 |
| **Musopen** | 클래식 공개 도메인 (쇼팽, 드뷔시 등) |
| **YouTube Audio Library** | YouTube 크리에이터용, 무료 다운로드 |

**추천:** Pixabay Music에서 "wedding", "romantic", "piano" 검색

---

## 2. Supabase 버킷 설정

### wedding-audio 버킷 Public 설정

1. Supabase Dashboard 접속
2. Storage > `wedding-audio` 버킷 클릭
3. Settings 탭 열기
4. **"Make public"** 클릭 (또는 Public 토글 ON)

> ⚠️ Public이어야만 브라우저에서 파일에 접근 가능합니다.

---

## 3. 파일 업로드

1. Supabase Dashboard > Storage > `wedding-audio` 이동
2. **"Upload file"** 또는 파일을 드래그 드롭
3. mp3 파일 선택하여 업로드
4. 업로드 완료 대기

---

## 4. 코드에 파일명 등록

### `lib/wedding-data.ts` 수정

업로드한 파일명을 다음 한 줄에 입력하면 끝:

```ts
storage: {
    bucket: 'wedding-phots',
    cover: 'main.jpeg',
    closing: 'closing.jpg',
    portraits: { groom: 'groom.jpg', bride: 'bride.jpg' },
    bgmBucket: 'wedding-audio',
    bgm: 'bgm.mp3',  // ← 업로드한 파일명으로 변경 (예: 'bgm.mp3', 'wedding-bgm.mp3')
},
```

---

## 5. 확인

1. 터미널에서 `npm run dev` 실행
2. 브라우저에서 페이지 열기
3. 우측 상단 음악 아이콘(🎵) 클릭 → 음악 재생 확인

### 음악이 안 나올 때

- ✅ wedding-audio 버킷이 Public인지 확인
- ✅ 파일명 철자가 정확한지 확인 (대소문자 포함)
- ✅ 파일이 실제로 버킷에 업로드됐는지 Supabase 대시보드에서 확인
- ✅ 브라우저 개발자 도구(F12) > Console에서 에러 확인

---

## 참고

- 음악은 자동재생을 시도하지만, 브라우저 정책상 차단될 수 있습니다
- 첫 페이지 클릭 시 자동으로 음악이 재생됩니다
- 우측 상단 음악 버튼으로 언제든 음악을 켜고 끌 수 있습니다
