import { Trash2, Calendar } from "lucide-react";
import { Bias } from "../types";
import { calculatePeriod, formatDate } from "../utils/dateUtils";
import { LABELS } from "../constants/text";
import { FONTS } from "../constants/styles";

interface BiasCardProps {
  bias: Bias;
  index: number;
  onRemove: (id: string) => void;
}

export default function BiasCard({ bias, index, onRemove }: BiasCardProps) {
  return (
    <div className="relative bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg shadow-xl">
      <button
        onClick={() => onRemove(bias.id)}
        className="absolute -top-3 -right-3 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 shadow-lg transition z-10"
      >
        <Trash2 size={16} />
      </button>

      {/* 중세 프레임 장식 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-amber-700"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-amber-700"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-amber-700"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-amber-700"></div>
      </div>

      <div className="p-6 pt-8">
        <div className="text-center mb-4">
          <div className="inline-block p-2 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg shadow-xl">
            <div className="border-4 border-amber-100 rounded-lg overflow-hidden">
              <img
                src={bias.vintagePhoto}
                alt={bias.name}
                className="w-48 h-48 object-cover"
              />
            </div>
          </div>
        </div>

        <div className="text-center space-y-3">
          <h3
            className="text-2xl font-bold text-amber-900 border-b-2 border-amber-600 pb-2"
            style={FONTS.serif}
          >
            {bias.name} {index === 0 && "👑"}
          </h3>

          <div className="space-y-2 text-sm text-amber-800">
            <p>
              {formatDate(bias.startDate)} ~ {formatDate(bias.endDate)}(
              {calculatePeriod(bias.startDate, bias.endDate)})
            </p>
          </div>

          <div className="pt-3 border-t-2 border-amber-400">
            <p className="text-sm text-amber-800 italic leading-relaxed">
              {bias.reason}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
