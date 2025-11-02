/**
 * 앱 전체에서 사용되는 텍스트 상수
 */

export const APP_INFO = {
  title: "⚜️ 최애족보 ⚜️",
  description: "당신의 소나무 취향을 자랑하세요.",
  domain: "bias-jokbo.com",
  year: () => new Date().getFullYear(),
} as const;

export const COST_INFO = {
  aiButtonText: "AI로 최애들의 공통점 분석하기",
  aiButtonLoadingText: "AI 분석 중...",
} as const;

export const LABELS = {
  addBias: "최애 추가",
  downloadJokbo: "족보 다운로드",
  uploadPhoto: "사진 업로드",
  photoPreviewHover: "호버하면 빈티지 미리보기",
  autoVintage: "자동으로 빈티지 필터 적용됨",
  name: "이름",
  namePlaceholder: "활동명으로 입력해주세요. 예) 정국(O) / 전정국(X)",
  group: "소속 그룹",
  groupPlaceholder:
    "공식 그룹명을 입력해주세요. 예) 스트레이키즈(O) / 스키즈(X)",
  startDate: "입덕일",
  emptyState: "아직 등록된 최애가 없습니다.",
  emptyStateAction: "위에서 첫 번째 최애를 등록해보세요! 👑",
  newBiasTitle: "새로운 최애 등록",
  aiAnalysisTitle: "AI가 분석한 그대의 취향",
  commonalities: "공통점:",
  narrative: "족보 해설:",
  createdDate: (date: string) => `이 족보는 ${date} 에 작성되었습니다`,
  adPlaceholder: "📢 광고 영역 (Google AdSense)",
  adDescription: "",
} as const;

export const ALERTS = {
  minBiasRequired: "최애를 2명 이상 추가해주세요!",
  formIncomplete:
    "모든 필수 항목을 입력해주세요!\n(사진, 이름, 소속 그룹, 입덕일)",
} as const;
