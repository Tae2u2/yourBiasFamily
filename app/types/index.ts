export interface Bias {
  id: string;
  name: string;
  photo: string;
  vintagePhoto: string;
  startDate: string;
  endDate: string;
  reason: string;
}

export interface AIAnalysis {
  commonalities: string[];
  familyCrest: string;
  narrative: string;
  loading: boolean;
}

export interface BiasFormData {
  name: string;
  photo?: string;
  vintagePhoto?: string;
  startDate: string;
  endDate: string;
  reason: string;
}
