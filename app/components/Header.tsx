import { Zap } from 'lucide-react';
import { APP_INFO, COST_INFO } from '../constants/text';
import { COMMON_CLASSES, FONTS } from '../constants/styles';

export default function Header() {
  return (
    <header className="text-center mb-8">
      <h1 className="text-5xl font-bold text-amber-900 mb-2" style={FONTS.serif}>
        {APP_INFO.title}
      </h1>
      <p className="text-amber-700 text-lg">{APP_INFO.description}</p>
      <div className="flex items-center justify-center gap-4 mt-4">
        <div className={COMMON_CLASSES.badge.success}>
          <p className="text-green-800 font-semibold flex items-center gap-2">
            <Zap size={20} className="text-green-600" />
            AI 분석 비용: {COST_INFO.aiCostBadge}
          </p>
        </div>
        <div className={COMMON_CLASSES.badge.info}>
          <p className="text-blue-800 font-semibold">
            빈티지 필터: {COST_INFO.vintageFilterCost} ({COST_INFO.vintageFilterDescription})
          </p>
        </div>
      </div>
    </header>
  );
}
