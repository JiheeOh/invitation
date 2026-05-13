# Development Conventions

이 문서는 모든 개발자가 따라야 할 기본 규칙과 패턴을 정의합니다. 명확한 지침을 통해 일관된 코드 품질과 유지보수성을 보장합니다.

## Core Principles

### 0. 세션 간 작업 분리 (최우선 규칙)
- **현재 세션에서 사용자가 명시적으로 지시한 파일과 영역만 수정**
- 다른 세션에서 진행 중이거나 진행된 작업 영역은 절대 건드리지 않음
- 코드 개선이 필요해 보여도 사용자 지시가 없으면 수정 금지
- `/simplify`, `/review` 등 자동화 도구가 다른 작업을 제안해도 현재 지시 범위 밖이면 적용하지 않음

### 1. 디자인과 섹션 컴포넌트는 명시적 지시 후에만 변경
- `components/sections/` 디렉토리의 컴포넌트와 스타일 변경은 **반드시 사용자의 명시적 지시 후에만** 진행
- 스타일 관련 자동 수정이나 리팩토링은 금지
- 사용자가 직접 "이 부분을 이렇게 변경해줘"라고 명시할 때만 변경 가능

### 2. 디자인과 데이터의 철저한 분리
- **데이터**: `lib/wedding-data.ts` 와 `lib/config/` 디렉토리에서만 관리
- **디자인**: 컴포넌트의 JSX와 스타일 속성에서만 관리
- 목표: 데이터만 변경하면 전체 UI가 재구성되도록 설계

#### 데이터 계층 규칙
```
lib/
├── wedding-data.ts      # 혼례 정보, 인터뷰, 계좌, 위치 등
├── config/
│   ├── themes.ts        # 색상, 폰트 스타일 등 UI 상수
│   └── fonts.ts         # 폰트 패밀리 정의
└── supabase.ts          # 외부 데이터 연동
```

#### 디자인-데이터 분리 예시
```typescript
// ❌ 나쁜 예: 컴포넌트에 하드코드된 데이터
<section style={{ padding: '72px 32px' }}>
  <h2>허재 · 오지희</h2>
</section>

// ✅ 좋은 예: 데이터를 props로 받아 UI 렌더링
interface GreetingProps {
  t: Theme;
  groom: { name: string };
  bride: { name: string };
}

<section style={{ padding: '72px 32px' }}>
  <h2>{groom.name} · {bride.name}</h2>
</section>
```

### 3. 주요 변경사항에 대한 명확한 Git 커밋
- 새로운 기능, 버그 수정, 리팩토링 등은 **별도의 커밋**으로 분리
- **커밋 메시지 규칙**: 
  - 길이: 한 줄 50자 내외 (한글 가능)
  - 형식: `[타입] 간단한 설명`
  - 타입: `feat`, `fix`, `refactor`, `style`, `docs`, `chore`
  
#### 커밋 메시지 예시
```
feat: Gallery 섹션에 Lightbox 기능 추가
fix: 모바일에서 PetalShower 성능 최적화
refactor: Theme 타입 정의 일관성 개선
docs: API 엔드포인트 문서화
```

- 자동 생성된 커밋 (빌드, 의존성 업데이트)은 간략히: `build: deps update`
- 매우 큰 변경사항은 커밋 메시지 본문에 이유와 영향 범위 추가

### 4. 자의적 판단의 변경은 Plan 제시 후 진행
- 사용자의 명시적 지시가 없는데 **코드, 구조, 의존성을 변경**하려면 반드시 Plan 제시
- Plan에는 다음이 포함되어야 함:
  1. **변경 사항**: 어떤 파일/영역이 바뀌는가
  2. **이유**: 왜 필요한가 (성능, 유지보수성, 버그 수정 등)
  3. **영향 범위**: 다른 부분에 미치는 영향
  4. **대안**: 다른 방법은 없는가

#### 자의적 판단의 예시
```
❌ 미리 계획 없이 변경:
- 폴더 구조 재정렬
- 의존성 추가 (prettier, vitest 등)
- 컴포넌트 분할이나 통합
- API 경로 변경

✅ Plan 제시 후 진행:
> Plan: Image 최적화를 위해 sharp 라이브러리 추가
  이유: Supabase에서 다운로드한 이미지를 가공할 필요가 있을 때
  영향: 빌드 크기 +2MB, 빌드 시간 증가
  대안: 클라이언트에서 처리 (성능 저하) vs 서버에서 처리 (현재 안)
```

### 5. 단위 테스트와 통합 테스트 필수
- **모든 새로운 기능**에는 단위 테스트 또는 통합 테스트가 필수
- 테스트 없이 코드를 작성하거나 병합할 수 없음
- 테스트는 코드 변경과 같은 커밋에 포함

#### 테스트 필수 대상
- **단위 테스트**: 유틸 함수, 비즈니스 로직, 데이터 처리
  - `lib/` 디렉토리의 함수들
  - 복잡한 계산이나 데이터 변환 로직
  
- **통합 테스트**: 컴포넌트 상호작용, 사용자 흐름, API 연동
  - 섹션 컴포넌트들의 데이터 렌더링
  - Supabase 연동 기능
  - API 엔드포인트

#### 테스트 파일 구조
```
lib/
├── utils.ts
├── utils.test.ts          # 같은 레벨에 .test.ts
└── config/
    └── themes.ts

components/
├── Gallery.tsx
├── Gallery.test.tsx       # 컴포넌트 테스트
└── sections/
    └── Greeting.tsx
```

#### 테스트 작성 예시
```typescript
// lib/utils.test.ts
import { padStart, copyToClipboard } from './utils';

describe('padStart', () => {
  it('should pad number with zeros', () => {
    expect(padStart(5, 2)).toBe('05');
    expect(padStart(123, 3)).toBe('123');
  });

  it('should use custom pad string', () => {
    expect(padStart('a', 3, '*')).toBe('**a');
  });
});
```

#### 테스트 실행
```bash
npm test                    # 모든 테스트 실행
npm test -- --watch        # Watch 모드
npm test -- --coverage     # 커버리지 리포트
```

---

## Project Structure

```
invitation/
├── app/                      # Next.js 앱 라우터
│   ├── layout.tsx           # 루트 레이아웃
│   ├── page.tsx             # 홈 페이지
│   └── api/                 # API 라우트
│
├── components/              # React 컴포넌트
│   ├── sections/            # 초대장 섹션 컴포넌트 (사용자 지시만 수정)
│   │   ├── Cover.tsx
│   │   ├── Greeting.tsx
│   │   ├── Family.tsx
│   │   ├── Gallery.tsx
│   │   └── ...
│   ├── Invitation.tsx       # 메인 컴포넌트 (섹션 조합)
│   ├── FadeIn.tsx           # 유틸 컴포넌트
│   └── ...
│
├── lib/                      # 유틸, 설정, 데이터
│   ├── wedding-data.ts      # ★ 데이터 중앙 관리소
│   ├── utils.ts             # 유틸 함수
│   ├── supabase.ts          # Supabase 클라이언트
│   ├── hooks.ts             # 커스텀 훅
│   └── config/
│       ├── themes.ts        # ★ 색상, 테마 정의
│       └── fonts.ts         # ★ 폰트 정의
│
├── contexts/                # React Context
│   └── ThemeContext.tsx     # 테마 상태 관리
│
├── public/                  # 정적 자산
│   └── images/              # 이미지 (갤러리 등)
│
└── types/                   # TypeScript 타입 정의
    └── index.ts
```

---

## Naming Conventions

### 파일 및 폴더
- **컴포넌트**: PascalCase (`Invitation.tsx`, `Gallery.tsx`)
- **유틸 파일**: camelCase (`wedding-data.ts`, `utils.ts`)
- **테스트 파일**: `.test.ts` 또는 `.test.tsx` 접미사
- **폴더**: kebab-case (필요시) 또는 camelCase (`components/`, `public/images/`)

### 변수와 함수
- **함수**: camelCase (`loadPhotos`, `handleImageLoad`)
- **상수**: CONSTANT_CASE 또는 PascalCase (타입) (`WEDDING`, `THEMES`, `Theme`)
- **상태 변수**: camelCase (`lightbox`, `setLightbox`)
- **Boolean**: `is`, `has`, `can` 접두사 (`isLoading`, `hasPhotos`, `canSubmit`)

### 컴포넌트 Props
```typescript
// ✅ 좋은 예
interface GalleryProps {
  t: Theme;                  // 테마
  onOpenSlideshow?: () => void;  // 콜백
}

// ❌ 피하기
interface Props {
  theme: Theme;
  openSlideshow: boolean;  // 상태 전달보다 콜백 선호
}
```

---

## Code Style

### TypeScript
- **타입 정의**: 모든 컴포넌트 Props와 함수 파라미터에 타입 지정
- **명확한 타입**: `any` 사용 금지, 필요시 `unknown` 사용
- **Interface vs Type**: 
  - Props, 데이터 구조: `interface`
  - 유니온, 조건부: `type`

### React 컴포넌트
```typescript
'use client';  // 필요시 클라이언트 컴포넌트 명시

import React from 'react';
import type { Theme } from '@/lib/utils';

interface ComponentProps {
  t: Theme;
  children?: React.ReactNode;
}

export default function Component({ t, children }: ComponentProps) {
  return <div>{children}</div>;
}
```

### 스타일링
- **인라인 스타일** (현재 패턴): `style={{}}` 객체 사용
- **Tailwind 클래스**: 필요시 추가 가능 (혼용 금지)
- **테마 색상**: `lib/config/themes.ts`에서 관리하고 Props로 전달

```typescript
// ✅ 테마 기반 스타일
<div style={{ color: t.ink, fontFamily: t.sans }}>

// ❌ 하드코드된 색상
<div style={{ color: '#333' }}>
```

### 주석
- **주석 작성 안 함**: 명확한 이름과 구조로 의도 표현
- **예외**: 숨은 제약사항, 성능 트레이드오프, 버그 회피책만 간단히 한 줄
  ```typescript
  // iOS Safari에서 fixed 포지셔닝 버그 때문에 absolute 사용
  ```

---

## Data Management

### 데이터 추가/수정
1. `lib/wedding-data.ts` 수정
2. 필요한 타입은 `lib/utils.ts` 또는 `types/index.ts`에서 정의
3. 컴포넌트에서는 데이터를 Props로 받아 렌더링

### API 엔드포인트
```typescript
// app/api/gallery/route.ts 예시
export async function GET() {
  // 데이터 처리 로직
  return Response.json({ photos: [...] });
}
```

### 외부 데이터 (Supabase)
- `lib/supabase.ts`에서 클라이언트 초기화
- `lib/hooks.ts`에서 커스텀 훅으로 데이터 페칭 로직 관리
- 컴포넌트는 훅 사용하여 데이터 구독

---

## Git Workflow

### ⚠️ Git 커밋 및 푸시 규칙 (필수)
- **`git commit`과 `git push`는 사용자가 명시적으로 지시할 때만 실행**
- 코드 변경 후에도 자동으로 커밋/푸시 금지
- 사용자가 변경사항을 검토한 후 "git push해줘" 또는 "커밋해줘" 등의 명령이 있을 때만 실행
- 변경사항은 언제든 `git status`로 확인 가능하도록 그대로 둘 것

### Push 전 필수 확인 (개발 중 항상 실행)
**`git push`를 실행하기 전에 반드시 다음 명령어들을 실행하고 모두 정상일 때만 push:**

```bash
# 개발 서버 정상 작동 확인
npm run dev

# 프로덕션 빌드 정상 확인
npm run build
```

- ✅ 둘 다 정상이면 → `git push` 실행
- ❌ 에러 발생 → 에러 메시지와 함께 사용자에게 보고 후 대기

**에러 발생 시 보고 형식:**
```
❌ npm run build 실패

[에러 메시지 또는 스크린샷]

수정이 필요합니다. 어떻게 진행할까요?
```

### 커밋 및 Push 전 체크리스트
- [ ] `npm run dev` 정상 작동
- [ ] `npm run build` 성공
- [ ] `npm run lint` 통과
- [ ] `npm test` 통과 (테스트 추가 시)
- [ ] 타입 체크: `tsc --noEmit`
- [ ] 커밋 메시지가 명확하고 50자 내 (제목)
- [ ] **Push 전 위의 모든 항목 재확인**

### 브랜치 네이밍 (권장)
```
feat/feature-name
fix/bug-description
refactor/what-improved
test/what-tested
```

### 커밋 메시지 작성 가이드
```
[타입] 간단한 설명 (50자 이내)

선택: 더 자세한 설명
- 구체적인 변경 사항
- 이유와 영향
- 테스트 방법

Fixes #123  (이슈 번호가 있으면)
```

---

## Testing Strategy

### 테스트 실행 및 확인
```bash
# 단일 테스트 파일
npm test -- Gallery.test.tsx

# Watch 모드 (개발 중)
npm test -- --watch

# 커버리지 리포트
npm test -- --coverage

# CI/CD 전 전체 테스트
npm test -- --passWithNoTests
```

### 커버리지 목표
- **최소 기준**: Statements 80% 이상 (**필수**)
- **권장 기준**: 모든 메트릭 85% 이상
  - Statements: 함수 호출 범위
  - Branches: if/else, switch 분기 범위
  - Functions: 함수 실행 범위
  - Lines: 라인 실행 범위

### 커버리지 보고 방식
**주요 기능 또는 섹션 완성 후에는 반드시 커버리지 보고**

```bash
# 기능 완성 후 실행
npm test -- --coverage

# 콘솔 출력 예시:
# ================ Coverage summary ================
# Statements   : 98.94% ( 94/95 )
# Branches     : 86.95% ( 20/23 )
# Functions    : 100% ( 25/25 )
# Lines        : 100% ( 90/90 )
# ===================================================
```

**보고 형식** (커밋 메시지 또는 응답에 포함):
```
✅ Test Coverage Report
- Statements: XX.XX%
- Branches:   XX.XX%
- Functions:  100%
- Lines:      100%
- 추가 테스트: [작성된 테스트 파일 목록]
```

### 테스트 작성 체크리스트
- [ ] 함수의 정상 케이스 (Happy Path) 테스트
- [ ] 엣지 케이스 및 에러 케이스 테스트
- [ ] 컴포넌트 렌더링 확인
- [ ] 사용자 상호작용 (클릭, 입력) 테스트
- [ ] Props 변경 시 업데이트 확인
- [ ] **커버리지 목표 달성 확인** (Statements 80% 이상)

### 테스트 작성 원칙
- **독립성**: 각 테스트는 독립적으로 실행 가능
- **명확성**: 테스트 이름이 테스트 목적을 명확히 함
- **최소성**: 최소한의 코드로 검증
- **빠른 실행**: 단위 테스트는 밀리초 단위

---

## Development Checklist

새 기능이나 컴포넌트를 추가할 때:

### 1. 계획 수립
- [ ] 사용자로부터 명시적 지시 확인
- [ ] 자의적 변경이면 Plan 제시 및 승인 획득

### 2. 데이터 준비
- [ ] 필요한 데이터를 `lib/` 에서 정의/수정
- [ ] TypeScript 타입 정의 완료

### 3. 컴포넌트 개발
- [ ] Props 인터페이스 정의
- [ ] 테마 기반 스타일 적용
- [ ] 컴포넌트 테스트 (localhost)

### 4. 테스트 작성
- [ ] 단위 테스트 또는 통합 테스트 작성
- [ ] 모든 테스트 통과 확인 (`npm test`)
- [ ] **커버리지 확인** (`npm test -- --coverage`)
  - Statements 80% 이상 필수
  - 전체 커버리지 리포트 결과 보고

### 5. 통합
- [ ] 부모 컴포넌트에 임포트
- [ ] 데이터 Props 연결
- [ ] UI 동작 확인
- [ ] 기존 기능 영향 없음 확인

### 6. 커밋
- [ ] 명확한 커밋 메시지 작성
- [ ] 관련 파일만 포함 (불필요한 파일 제외)
- [ ] 테스트 파일 함께 커밋

---

## Common Patterns

### 섹션 컴포넌트 기본 구조
```typescript
'use client';

import React from 'react';
import FadeIn from '../FadeIn';
import SectionLabel from '../SectionLabel';
import type { Theme } from '@/lib/utils';

interface SectionProps {
  t: Theme;
}

export default function Section({ t }: SectionProps) {
  return (
    <section style={{ padding: '72px 32px', background: t.bg, color: t.ink }}>
      <FadeIn>
        <SectionLabel t={t} eng="section" ko="섹션명" />
        {/* 콘텐츠 */}
      </FadeIn>
    </section>
  );
}
```

### 데이터 페칭 패턴
```typescript
const [data, setData] = useState<DataType[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadData = async () => {
    try {
      const res = await fetch('/api/endpoint');
      const result = await res.json();
      setData(result.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, []);
```

---

## When to Ask for Plan

자동으로 Plan을 제시하는 경우:

1. **구조 변경**: 폴더 재정렬, 파일 이동
2. **의존성 추가**: 새 라이브러리 설치
3. **아키텍처 변경**: 상태 관리, API 구조 변경
4. **큰 리팩토링**: 여러 파일 영향
5. **성능 최적화**: 알고리즘 변경, 캐싱 추가
6. **타입 시스템 변경**: 데이터 모델 수정

---

## Protection

⚠️ **DEVELOPMENT.md는 핵심 문서입니다**
- 이 파일은 git pre-commit hook으로 보호됨
- 실수로 삭제하려고 하면 커밋이 거부됨
- 파일 수정이 필요하면 계획을 통해 명확하게 진행

---

## Questions?

개발 중 불명확한 부분이나 convention 추가가 필요하면 언제든지 피드백을 주세요.
