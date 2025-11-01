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
  namePlaceholder: "예: 김민지",
  startDate: "입덕일",
  endDate: "탈덕일 (선택)",
  reason: "입덕 계기 (선택)",
  reasonPlaceholder: "빠순이는 원래 순간을 위해 영원을 버텨...",
  customReasonPlaceholder: "직접 입력해주세요...",
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

export const REASON_OPTIONS = [
  { value: "비주얼/외모가 너무 좋아서", label: "👀 비주얼/외모" },
  { value: "춤/퍼포먼스가 멋있어서", label: "💃 춤/퍼포먼스" },
  { value: "노래/보컬이 매력적이어서", label: "🎤 노래/보컬" },
  { value: "예능감/성격이 좋아서", label: "😄 예능감/성격" },
  { value: "무대 장악력이 뛰어나서", label: "⭐ 무대 장악력" },
  { value: "특유의 매력/분위기 때문에", label: "✨ 매력/분위기" },
  { value: "랩/작사작곡 능력 때문에", label: "🎵 랩/작사작곡" },
  { value: "custom", label: "📝 직접 입력" },
] as const;

export const ALERTS = {
  minBiasRequired: "최애를 2명 이상 추가해주세요!",
  formIncomplete:
    "모든 필수 항목을 입력해주세요!\n(사진, 이름, 입덕일, 입덕 계기)",
} as const;
