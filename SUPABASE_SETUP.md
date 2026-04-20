# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. [supabase.com](https://supabase.com)에 가입
2. "New Project" 클릭
3. 프로젝트명 입력 (예: "wedding-invitation")
4. Database Password 설정
5. Region 선택 (서울: ap-northeast-1)
6. "Create new project" 클릭

## 2. API 키 확인

1. Settings > API 이동
2. Project URL 복사 → `NEXT_PUBLIC_SUPABASE_URL`
3. Project API keys > `anon` public 키 복사 → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

`.env.local`에 붙여넣기:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 3. Storage 버킷 생성 (사진 업로드)

1. Supabase Dashboard > Storage 이동
2. "Create a new bucket" 클릭
3. 이름: `wedding-photos`
4. Public 선택 (사진 공개 표시)
5. "Create bucket" 클릭

### 보안 정책 설정 (선택사항)

SQL Editor에서:

```sql
-- 누구나 읽기 가능
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'wedding-photos');

-- 로그인 사용자만 업로드
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'wedding-photos' 
  AND auth.role() = 'authenticated'
);
```

## 4. 완료

이제 다음을 할 수 있습니다:

- ✅ 앱 실행: `npm run dev`
- ✅ 갤러리에서 "사진 추가 (+)" 버튼으로 사진 업로드
- ✅ 업로드된 사진이 즉시 갤러리에 표시됨

## 문제 해결

### "wedding-photos" 버킷이 없다는 에러

→ Storage 탭에서 bucket 생성 확인

### 사진 업로드 실패

→ `.env.local`에서 Supabase URL과 API 키 확인

### 사진이 표시 안 됨

→ Supabase Dashboard > Storage > wedding-photos > Public으로 설정 확인
