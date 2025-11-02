import React, { useMemo } from "react";
import { Download } from "lucide-react";
import { Bias, AIAnalysis, AnalyzeIdolsResponse } from "../types";
import BiasCard from "./BiasCard";
import AIAnalysisSection from "./AIAnalysisSection";
import { APP_INFO, LABELS } from "../constants/text";
import { COMMON_CLASSES, FONTS, LAYOUT } from "../constants/styles";
import { sortByDate } from "../utils/dateUtils";

interface JokboProps {
  biases: Bias[];
  aiAnalysis: AnalyzeIdolsResponse | null;
  jokboRef: React.RefObject<HTMLDivElement>;
  onRemoveBias: (id: string) => void;
  onDownload: () => void;
}

export default function Jokbo({
  biases,
  aiAnalysis,
  jokboRef,
  onRemoveBias,
  onDownload,
}: JokboProps) {
  const sorted = useMemo(
    () => sortByDate(biases, "startDate", "asc"),
    [biases]
  );

  if (biases.length === 0) {
    return (
      <div className="text-center py-12 text-amber-700">
        <p className="text-xl">{LABELS.emptyState}</p>
        <p className="text-sm mt-2">{LABELS.emptyStateAction}</p>
      </div>
    );
  }

  return (
    <div className={LAYOUT.sectionSpacing}>
      <div className="flex justify-end gap-4">
        <button
          onClick={onDownload}
          className={`${COMMON_CLASSES.button.success} flex items-center gap-2`}
        >
          <Download size={20} />
          {LABELS.downloadJokbo}
        </button>
      </div>

      <div
        ref={jokboRef}
        className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-lg shadow-2xl"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h100v100H0z" fill="%23f8f4e8"/%3E%3Cpath d="M0 0h50v50H0z" fill="%23f5efd5" opacity="0.3"/%3E%3Cpath d="M50 50h50v50H50z" fill="%23f5efd5" opacity="0.3"/%3E%3C/svg%3E")',
        }}
      >
        <div className="border-8 border-double border-amber-800 p-8 bg-amber-50/80 backdrop-blur">
          <div className="text-center mb-8">
            <h2
              className="text-4xl font-bold text-amber-900 mb-2"
              style={FONTS.serif}
            >
              ⚜ 최애족보 ⚜
            </h2>
          </div>

          {/* AI Analysis Section */}
          <AIAnalysisSection analysis={aiAnalysis} />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sorted.map((bias, index) => (
              <BiasCard
                key={bias.id}
                bias={bias}
                index={index}
                onRemove={onRemoveBias}
              />
            ))}
          </div>

          <div
            className="mt-8 text-center text-amber-700 italic"
            style={FONTS.serif}
          >
            <p>{LABELS.createdDate(new Date().toLocaleDateString("ko-KR"))}</p>
            <p className="text-sm mt-2">⚜ {APP_INFO.domain} ⚜</p>
          </div>
        </div>
      </div>

      {/* Ad Space Placeholder */}
      <div className="bg-gray-100 border-4 border-dashed border-gray-400 rounded-lg p-8 text-center">
        <p className="text-gray-600 font-semibold">{LABELS.adPlaceholder}</p>
        <p className="text-sm text-gray-500 mt-2">{LABELS.adDescription}</p>
      </div>
    </div>
  );
}
