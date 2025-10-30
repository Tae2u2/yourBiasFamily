import { Sparkles } from 'lucide-react';
import { COST_INFO } from '../constants/text';
import { COMMON_CLASSES } from '../constants/styles';

interface AIAnalysisButtonProps {
  loading: boolean;
  onClick: () => void;
}

export default function AIAnalysisButton({ loading, onClick }: AIAnalysisButtonProps) {
  return (
    <div className="mb-8 text-center">
      <button
        onClick={onClick}
        disabled={loading}
        className={`${COMMON_CLASSES.button.gradient} flex items-center justify-center gap-3 mx-auto disabled:opacity-50`}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            {COST_INFO.aiButtonLoadingText}
          </>
        ) : (
          <>
            <Sparkles size={24} />
            {COST_INFO.aiButtonText}
          </>
        )}
      </button>
    </div>
  );
}
