import { Sparkles } from "lucide-react";
import { AnalyzeIdolsResponse } from "../types";
import { LABELS } from "../constants/text";
import { FONTS } from "../constants/styles";

interface AIAnalysisSectionProps {
  analysis: AnalyzeIdolsResponse | null;
}

export default function AIAnalysisSection({
  analysis,
}: AIAnalysisSectionProps) {
  return (
    <div className="mb-8 bg-gradient-to-br from-slate-100 to-pink-100 border-4 border-slate-600 rounded-lg p-6">
      <h3
        className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2"
        style={FONTS.serif}
      >
        <Sparkles className="text-slate-600" />
        {LABELS.aiAnalysisTitle}
      </h3>
      <div className="space-y-4">
        <div>
          <p className="text-slate-700 italic leading-relaxed">
            {analysis?.analysis}
          </p>
        </div>
      </div>
    </div>
  );
}
