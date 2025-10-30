"use client";

import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { Bias, AIAnalysis, BiasFormData } from "./types";
import { applyVintageFilter } from "./utils/imageFilters";
import { ALERTS } from "./constants/text";
import { LAYOUT } from "./constants/styles";
import Header from "./components/Header";
import BiasForm from "./components/BiasForm";
import AIAnalysisButton from "./components/AIAnalysisButton";
import Jokbo from "./components/Jokbo";

export default function ChoaeJokboV2() {
  const [biases, setBiases] = useState<Bias[]>([]);
  const [currentBias, setCurrentBias] = useState<Partial<BiasFormData>>({
    name: "",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [previewPhoto, setPreviewPhoto] = useState<string>("");
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis>({
    commonalities: [],
    familyCrest: "",
    narrative: "",
    loading: false,
  });
  const jokboRef = useRef<HTMLDivElement>(null);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const originalPhoto = reader.result as string;
        setPreviewPhoto(originalPhoto);

        // 빈티지 필터 적용 (무료!)
        const vintagePhoto = await applyVintageFilter(originalPhoto);
        setCurrentBias({ ...currentBias, photo: originalPhoto, vintagePhoto });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFieldChange = (field: keyof BiasFormData, value: string) => {
    setCurrentBias({ ...currentBias, [field]: value });
  };

  const addBias = async () => {
    if (
      currentBias.name &&
      currentBias.vintagePhoto &&
      currentBias.startDate &&
      currentBias.reason
    ) {
      const newBias: Bias = {
        id: Date.now().toString(),
        name: currentBias.name,
        photo: currentBias.photo!,
        vintagePhoto: currentBias.vintagePhoto!,
        startDate: currentBias.startDate,
        endDate: currentBias.endDate || "현재",
        reason: currentBias.reason,
      };
      setBiases([...biases, newBias]);
      setCurrentBias({ name: "", startDate: "", endDate: "", reason: "" });
      setPreviewPhoto("");
    }
  };

  const removeBias = (id: string) => {
    setBiases(biases.filter((b) => b.id !== id));
  };

  // AI 공통점 분석 (초저비용: ~$0.001/건)
  const analyzeWithAI = async () => {
    if (biases.length < 2) {
      alert(ALERTS.minBiasRequired);
      return;
    }

    setAiAnalysis({ ...aiAnalysis, loading: true });

    try {
      const response = await fetch("/api/analyze-biases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          biases: biases.map((b) => ({
            name: b.name,
            reason: b.reason,
            startDate: b.startDate,
            endDate: b.endDate,
          })),
        }),
      });

      const data = await response.json();

      setAiAnalysis({
        commonalities: data.commonalities,
        familyCrest: data.familyCrest,
        narrative: data.narrative,
        loading: false,
      });
    } catch (error) {
      // 데모용 더미 데이터
      setTimeout(() => {
        setAiAnalysis({
          commonalities: [
            "청순하고 밝은 이미지의 소유자들",
            "뛰어난 춤 실력과 무대 장악력",
            "귀여운 외모와 반전 매력의 조화",
          ],
          familyCrest: "⚜️ 淸純魅力家門 ⚜️",
          narrative:
            "그대의 취향은 맑은 샘물처럼 청아하되, 무대 위에선 불꽃처럼 타오르는 이들을 향하도다. 이들은 겉으로는 천사의 미소를 지녔으나, 그 안에 호랑이의 기개를 품은 자들이니...",
          loading: false,
        });
      }, 2000);
    }
  };

  const downloadJokbo = async () => {
    if (jokboRef.current) {
      const canvas = await html2canvas(jokboRef.current, {
        backgroundColor: "#f8f4e8",
        scale: 2,
      });
      const link = document.createElement("a");
      link.download = "최애족보.png";
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className={LAYOUT.pageBackground}>
      <div className="max-w-6xl mx-auto">
        <Header />

        <BiasForm
          currentBias={currentBias}
          previewPhoto={previewPhoto}
          onPhotoUpload={handlePhotoUpload}
          onFieldChange={handleFieldChange}
          onSubmit={addBias}
        />

        {biases.length >= 2 && !aiAnalysis.narrative && (
          <AIAnalysisButton
            loading={aiAnalysis.loading}
            onClick={analyzeWithAI}
          />
        )}

        <Jokbo
          biases={biases}
          aiAnalysis={aiAnalysis}
          jokboRef={jokboRef}
          onRemoveBias={removeBias}
          onDownload={downloadJokbo}
        />
      </div>
    </div>
  );
}
