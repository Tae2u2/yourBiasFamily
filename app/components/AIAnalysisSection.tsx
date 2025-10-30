import { Sparkles } from 'lucide-react';
import { AIAnalysis } from '../types';
import { LABELS } from '../constants/text';
import { FONTS } from '../constants/styles';

interface AIAnalysisSectionProps {
  analysis: AIAnalysis;
}

export default function AIAnalysisSection({ analysis }: AIAnalysisSectionProps) {
  if (!analysis.narrative) return null;

  return (
    <div className="mb-8 bg-gradient-to-br from-purple-100 to-pink-100 border-4 border-purple-600 rounded-lg p-6">
      <h3 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2" style={FONTS.serif}>
        <Sparkles className="text-purple-600" />
        {LABELS.aiAnalysisTitle}
      </h3>
      <div className="space-y-4">
        <div>
          <h4 className="font-bold text-purple-800 mb-2">{LABELS.commonalities}</h4>
          <ul className="list-disc list-inside space-y-1">
            {analysis.commonalities.map((item, idx) => (
              <li key={idx} className="text-purple-700">{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-purple-800 mb-2">{LABELS.narrative}</h4>
          <p className="text-purple-700 italic leading-relaxed">{analysis.narrative}</p>
        </div>
      </div>
    </div>
  );
}
