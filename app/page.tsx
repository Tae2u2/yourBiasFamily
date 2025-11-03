"use client";

import React, { useState, useRef } from "react";
import { Bias, BiasFormData, AnalyzeIdolsResponse } from "./types";
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
    group: "",
    startDate: "",
  });
  const [previewPhoto, setPreviewPhoto] = useState<string>("");
  const [aiAnalysis, setAiAnalysis] = useState<AnalyzeIdolsResponse | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const jokboRef = useRef<HTMLDivElement>(null);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const originalPhoto = reader.result as string;
        setPreviewPhoto(originalPhoto);

        const photo = await applyVintageFilter(originalPhoto);
        setCurrentBias({ ...currentBias, photo });
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
      currentBias.group &&
      currentBias.photo &&
      currentBias.startDate
    ) {
      const newBias: Bias = {
        id: Date.now().toString(),
        name: currentBias.name,
        group: currentBias.group,
        photo: currentBias.photo!,
        startDate: currentBias.startDate,
      };
      setBiases([...biases, newBias]);
      setCurrentBias({ name: "", group: "", startDate: "" });
      setPreviewPhoto("");
    } else {
      alert(ALERTS.formIncomplete);
    }
  };

  const removeBias = (id: string) => {
    setBiases(biases.filter((b) => b.id !== id));
  };

  const analyzeWithAI = async () => {
    if (biases.length < 2) {
      alert(ALERTS.minBiasRequired);
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("/api/analyze-biases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idols: biases.map((bias) => ({
            name: bias.name,
            group: bias.group,
            startDate: bias.startDate,
          })),
        }),
      });

      const data: AnalyzeIdolsResponse = await response.json();

      setAiAnalysis(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("AI 분석 실패:", error);
      alert("AI 분석에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const downloadJokbo = async () => {
    if (!jokboRef.current) {
      alert("족보를 찾을 수 없습니다.");
      return;
    }

    try {
      // modern-screenshot으로 렌더링된 컴포넌트를 직접 캡처
      const { domToPng } = await import("modern-screenshot");

      const dataUrl = await domToPng(jokboRef.current, {
        quality: 1.0, // 최고 품질
        scale: 2, // 고해상도 (Retina)
        backgroundColor: "#fffbeb",
      });

      // 다운로드
      const link = document.createElement("a");
      link.download = "최애족보.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("족보 다운로드 실패:", error);
      alert("족보 다운로드에 실패했습니다. 다시 시도해주세요.");
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

        {biases.length >= 2 && !aiAnalysis && (
          <AIAnalysisButton loading={loading} onClick={analyzeWithAI} />
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
