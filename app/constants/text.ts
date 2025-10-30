/**
 * 앱 전체에서 사용되는 텍스트 상수
 */

export const APP_INFO = {
  title: "⚜️ 최애족보 ⚜️",
  description: "당신의 소나무 취향을 자랑하세요.",
  domain: "bias-jokbo.com",
  year: () => new Date().getFullYear(),
  currentYear: "Anno Domini",
} as const;

export const COST_INFO = {
  aiAnalysisCost: "~2원",
  aiAnalysisCostDescription: "Claude Haiku 3",
  vintageFilterCost: "무료",
  vintageFilterDescription: "브라우저에서 처리",
  scaleCost: "2,000원",
  scaleDescription: "100배 절감!",
  aiButtonText: "AI로 최애들의 공통점 분석하기 (비용: ~2원)",
  aiButtonLoadingText: "AI 분석 중...",
  aiCostBadge: "건당 1-2원!",
} as const;

export const LABELS = {
  addBias: "최애 추가",
  downloadJokbo: "족보 다운로드",
  uploadPhoto: "사진 업로드",
  photoPreviewHover: "호버하면 빈티지 미리보기",
  autoVintage: "자동으로 빈티지 필터 적용됨",
  name: "이름/별명",
  namePlaceholder: "예: 김민지",
  startDate: "입덕일",
  endDate: "탈덕일 (선택)",
  reason: "입덕 계기",
  reasonPlaceholder: "빠순이는 원래 순간을 위해 영원을 버텨...",
  period: "재위 기간:",
  story: "입덕의 서사:",
  emptyState: "아직 등록된 최애가 없습니다.",
  emptyStateAction: "위에서 첫 번째 최애를 등록해보세요! 👑",
  newBiasTitle: "새로운 최애 등록",
  aiAnalysisTitle: "AI가 분석한 그대의 취향",
  commonalities: "공통점:",
  narrative: "족보 해설:",
  createdDate: (date: string) => `이 족보는 ${date} 에 작성되었습니다`,
  adPlaceholder: "📢 광고 영역 (Google AdSense)",
  adDescription: "월 10,000명 = 광고 수익 10-15만원 예상",
} as const;

export const ALERTS = {
  minBiasRequired: "최애를 2명 이상 추가해주세요!",
} as const;
