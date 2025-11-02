export interface Bias {
  id: string;
  name: string;
  group: string;
  photo: string;
  startDate: string;
}

export interface AIAnalysis {
  commonalities: string[];
  familyCrest: string;
  narrative: string;
  loading: boolean;
}

export interface BiasFormData {
  name: string;
  group: string;
  photo: string;
  startDate: string;
}

// API 응답 전체 타입
export interface AnalyzeIdolsResponse {
  analysis: string;
  idols: IdolInfo[];
  metadata: AnalysisMetadata;
}

// 아이돌 정보 (간소화된 버전)
export interface IdolInfo {
  name: string;
  group: string;
}

// 분석 메타데이터
export interface AnalysisMetadata {
  inputTokens: number;
  outputTokens: number;
  estimatedCostUSD: number;
  estimatedCostKRW: number;
  idolCount: number;
}

// 요청 시 사용하는 전체 아이돌 데이터
export interface Idol {
  name: string;
  startDate: string;
  group: string;
}

// API 요청 바디 타입
export interface AnalyzeIdolsRequest {
  idols: Idol[];
}
