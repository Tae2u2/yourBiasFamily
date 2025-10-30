# 최애 족보 (Choae Jokbo) - 초저비용 버전 🎭

> AI 이미지 변환 대신 빈티지 필터 + AI 텍스트 분석으로 **비용 100분의 1 절감!**

## 💰 비용 비교

| 방식 | 이미지 처리 | AI 분석 | 1건당 비용 | 10,000명 기준 |
|------|-----------|---------|----------|------------|
| **원래 (AI 변환)** | $0.04 | - | **$0.04** | **$400 (52만원)** |
| **개선안 (필터 + AI)** | $0 | $0.001 | **$0.001** | **$10 (1.3만원)** |

**절감율: 97.5%** 🎉

---

## 🚀 핵심 전략

### 1. 빈티지 필터 (클라이언트 사이드)
- **비용: $0** (브라우저 Canvas API 사용)
- 세피아 톤, 비네팅, 노이즈 효과
- 실시간 처리, 서버 부하 없음

### 2. AI 공통점 분석 (Claude Haiku 3)
- **비용: ~$0.001/건** (약 1-2원)
- 최애들의 공통점 3가지 추출
- 취향 가문 작명
- 중세 어투 족보 해설

---

## 📊 수익 모델

### Option 1: 무료 + 광고
```
월 10,000명 방문
━━━━━━━━━━━━━━━━━
AI 비용:     -$10 (1.3만원)
광고 수익:   +$100 (13만원)
━━━━━━━━━━━━━━━━━
순이익:      +$90 (11.7만원) ✅
```

### Option 2: 프리미엄 ($1.49)
```
월 10,000명, 전환율 3%
━━━━━━━━━━━━━━━━━
결제 수익:   $447 (58만원)
AI 비용:     -$10 (1.3만원)
광고 수익:   +$50 (6.5만원)
━━━━━━━━━━━━━━━━━
순이익:      $487 (63만원) 🎉
```

### Option 3: 하이브리드
- 무료: 워터마크 포함 + 광고
- 유료 ($0.99): 워터마크 제거
- 프리미엄 ($2.99): 고해상도 + 추가 스타일

---

## 🛠️ 기술 스택

### Frontend
- **React + TypeScript**
- **TailwindCSS** - 스타일링
- **html2canvas** - 이미지 다운로드
- **Canvas API** - 빈티지 필터

### Backend
- **Next.js 14** (App Router)
- **Anthropic Claude API** - AI 분석
- **Vercel** - 배포

### Payments (Optional)
- **Stripe** or **토스페이먼츠**

---

## 📦 설치 및 실행

### 1. 환경 변수 설정
```bash
# .env.local
ANTHROPIC_API_KEY=sk-ant-xxxxx
NEXT_PUBLIC_STRIPE_KEY=pk_xxxxx (optional)
```

### 2. 의존성 설치
```bash
npm install
# or
yarn install
```

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 프로덕션 빌드
```bash
npm run build
npm start
```

---

## 🎨 주요 기능

### ✅ 빈티지 필터 (무료)
```typescript
// 세피아 톤 + 비네팅 + 노이즈
const applyVintageFilter = (imageUrl: string) => {
  // Canvas API로 실시간 처리
  // 서버 비용 $0
}
```

### ✅ AI 공통점 분석 (~2원)
```typescript
// Claude Haiku 3 사용
const analyzeCommonalities = async (biases) => {
  // Input: ~375 tokens
  // Output: ~650 tokens
  // Cost: $0.001 (1.3원)
}
```

### ✅ 중세 족보 생성
- 고풍스러운 프레임 디자인
- 양피지 텍스처 배경
- 문장(crest) 스타일 레이아웃

### ✅ 이미지 다운로드
- html2canvas로 고품질 PNG 생성
- SNS 공유 최적화

---

## 💡 비용 최적화 팁

### 1. Prompt Caching (90% 절감)
```typescript
// 자주 사용하는 시스템 프롬프트 캐싱
const cachedPrompt = {
  role: 'system',
  content: '당신은 중세 귀족 족보 전문가입니다...',
  cache_control: { type: 'ephemeral' }
};
```

### 2. Batch API (50% 절감)
```typescript
// 비동기 처리로 50% 할인
const batch = await anthropic.batches.create({
  requests: multipleAnalyses
});
```

### 3. 요청 합치기
```typescript
// 여러 최애를 한 번에 분석
// 10건 개별 = $0.01
// 10건 묶음 = $0.003
```

---

## 📈 확장 계획

### Phase 1: MVP (현재)
- ✅ 빈티지 필터
- ✅ AI 공통점 분석
- ✅ 족보 생성 및 다운로드

### Phase 2: 수익화
- [ ] Stripe 결제 연동
- [ ] 프리미엄 스타일 추가
- [ ] 워터마크 제거 옵션

### Phase 3: 바이럴
- [ ] 트위터/쓰레드 공유 최적화
- [ ] OG 이미지 자동 생성
- [ ] 소셜 로그인

### Phase 4: 스케일
- [ ] 다양한 시대 스타일 (바로크, 르네상스, 동양화)
- [ ] 그룹 족보 (아이돌 그룹 전체)
- [ ] B2B 라이센스 (기획사 등)

---

## 🔐 환경 변수

```bash
# Required
ANTHROPIC_API_KEY=sk-ant-xxxxx

# Optional (for premium features)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_xxxxx
STRIPE_SECRET_KEY=sk_xxxxx

# Optional (for analytics)
NEXT_PUBLIC_GA_ID=G-XXXXX
```

---

## 📱 반응형 디자인

- ✅ 모바일 최적화
- ✅ 태블릿 지원
- ✅ 데스크톱 레이아웃
- ✅ Touch 제스처

---

## 🎯 타겟 유저

1. **K-pop 팬** (주 타겟)
   - 아이돌 최애 족보
   - SNS 공유 욕구 높음

2. **애니메이션 팬**
   - 캐릭터 족보
   - 코스프레 커뮤니티

3. **연예인 팬**
   - 배우, 가수 등
   - 팬카페 활동

---

## 💸 예상 트래픽 & 수익

| 시나리오 | 일 방문자 | 월 비용 | 광고 수익 | 결제 수익 | 순이익 |
|---------|----------|--------|----------|----------|-------|
| 실패 | 100명 | $3 | $3 | $40 | **+$40** ✅ |
| 보통 | 1,000명 | $30 | $30 | $400 | **+$400** ✅ |
| 성공 | 5,000명 | $150 | $150 | $2,000 | **+$2,000** 🎉 |
| 대박 | 20,000명 | $600 | $600 | $8,000 | **+$8,000** 🚀 |

---

## 🤝 기여하기

PR은 언제나 환영입니다!

1. Fork the Project
2. Create your Feature Branch
3. Commit your Changes
4. Push to the Branch
5. Open a Pull Request

---

## 📄 라이센스

MIT License

---

## 👨‍💻 만든 사람

**최애 족보** - AI 기반 최애 관리 서비스

- Website: https://choae-jokbo.com
- Twitter: [@choaejokbo](https://twitter.com/choaejokbo)
- Support: support@choae-jokbo.com

---

## 🙏 감사의 말

- **Anthropic** - Claude API 제공
- **Vercel** - 호스팅
- **Tailwind CSS** - 아름다운 UI

---

**⚜️ 그대의 최애를 영원히 기록하소서 ⚜️**
