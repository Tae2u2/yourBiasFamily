import { Bias, AnalyzeIdolsResponse } from "../types";
import { formatDate } from "./dateUtils";

export const generateJokboHTML = (
  biases: Bias[],
  aiAnalysis: AnalyzeIdolsResponse | null
): string => {
  const currentDate = new Date().toLocaleDateString("ko-KR");

  const biasCardsHTML = biases
    .map(
      (bias) => `
    <div class="bias-card">
      <div class="frame-decoration">
        <div class="corner top-left"></div>
        <div class="corner top-right"></div>
        <div class="corner bottom-left"></div>
        <div class="corner bottom-right"></div>
      </div>

      <div class="card-content">
        <div class="photo-container">
          <div class="photo-frame">
            <div class="photo-border">
              <img src="${bias.photo}" alt="${bias.name}" />
            </div>
          </div>
        </div>

        <h3 class="bias-name">
          ${bias.name}
          <p class="bias-group">
            ${bias.group}
          </p>
          <p class="bias-start-date">
            입덕일: ${formatDate(bias.startDate)}
          </p>
        </h3>
      </div>
    </div>
  `
    )
    .join("");

  const aiAnalysisHTML = aiAnalysis?.analysis
    ? `
    <div class="ai-analysis">
      <h3 class="ai-title">
        ✨ AI가 분석한 그대의 취향
      </h3>
      <div class="ai-content">
        <p>${aiAnalysis.analysis}</p>
      </div>
    </div>
  `
    : "";

  return `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>최애족보</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans KR', sans-serif;
      background: linear-gradient(to bottom right, #fffbeb, #fef3c7);
      padding: 40px 20px;
      min-height: 100vh;
    }

    .jokbo-container {
      max-width: 1200px;
      margin: 0 auto;
      background: linear-gradient(to bottom right, #fffbeb, #fef9c3);
      padding: 60px;
      border-radius: 12px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23f8f4e8'/%3E%3Cpath d='M0 0h50v50H0z' fill='%23f5efd5' opacity='0.3'/%3E%3Cpath d='M50 50h50v50H50z' fill='%23f5efd5' opacity='0.3'/%3E%3C/svg%3E");
    }

    .jokbo-inner {
      border: 8px double #78350f;
      padding: 60px;
      background: rgba(255, 251, 235, 0.8);
      backdrop-filter: blur(10px);
    }

    .jokbo-header {
      text-align: center;
      margin-bottom: 60px;
    }

    .jokbo-title {
      font-size: 48px;
      font-weight: bold;
      color: #78350f;
      margin-bottom: 12px;
      font-family: serif;
    }

    .jokbo-subtitle {
      color: #92400e;
      font-style: italic;
    }

    .ai-analysis {
      margin-bottom: 60px;
      background: linear-gradient(to bottom right, #f3e8ff, #fce7f3);
      border: 4px solid #9333ea;
      border-radius: 12px;
      padding: 40px;
    }

    .ai-title {
      font-size: 32px;
      font-weight: bold;
      color: #581c87;
      margin-bottom: 24px;
      font-family: serif;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .ai-content p {
      color: #7e22ce;
      line-height: 1.75;
      white-space: pre-line;
    }

    .bias-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 60px;
      margin-bottom: 60px;
    }

    .bias-card {
      position: relative;
      background: linear-gradient(to bottom right, #fef3c7, #fffbeb);
      border-radius: 12px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }

    .frame-decoration {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    .corner {
      position: absolute;
      width: 32px;
      height: 32px;
    }

    .top-left {
      top: 0;
      left: 0;
      border-top: 4px solid #78350f;
      border-left: 4px solid #78350f;
    }

    .top-right {
      top: 0;
      right: 0;
      border-top: 4px solid #78350f;
      border-right: 4px solid #78350f;
    }

    .bottom-left {
      bottom: 0;
      left: 0;
      border-bottom: 4px solid #78350f;
      border-left: 4px solid #78350f;
    }

    .bottom-right {
      bottom: 0;
      right: 0;
      border-bottom: 4px solid #78350f;
      border-right: 4px solid #78350f;
    }

    .card-content {
      padding: 48px 32px;
    }

    .photo-container {
      text-align: center;
      margin-bottom: 24px;
    }

    .photo-frame {
      display: inline-block;
      padding: 12px;
      background: linear-gradient(to bottom right, #d97706, #92400e);
      border-radius: 12px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }

    .photo-border {
      border: 4px solid #fef3c7;
      border-radius: 8px;
      overflow: hidden;
    }

    .photo-border img {
      width: 192px;
      height: 192px;
      object-fit: cover;
      display: block;
    }

    .bias-name {
      text-align: center;
      font-size: 28px;
      font-weight: bold;
      color: #78350f;
      font-family: serif;
    }

    .bias-group {
      font-size: 14px;
      padding-bottom: 6px;
      font-weight: normal;
      color: #92400e;
    }

    .bias-start-date {
      font-size: 12px;
      font-weight: normal;
      color: #a16207;
    }

    .jokbo-footer {
      text-align: center;
      color: #92400e;
      font-style: italic;
      font-family: serif;
      margin-top: 60px;
    }

    .jokbo-footer p {
      margin-bottom: 12px;
    }

    .jokbo-footer .domain {
      font-size: 14px;
    }

    @media print {
      body {
        background: white;
        padding: 0;
      }

      .jokbo-container {
        box-shadow: none;
      }
    }

    @media (max-width: 768px) {
      .jokbo-container {
        padding: 30px;
      }

      .jokbo-inner {
        padding: 30px;
      }

      .jokbo-title {
        font-size: 32px;
      }

      .bias-grid {
        grid-template-columns: 1fr;
        gap: 40px;
      }
    }
  </style>
</head>
<body>
  <div class="jokbo-container">
    <div class="jokbo-inner">
      <div class="jokbo-header">
        <h2 class="jokbo-title">
          ⚜ 최애족보 ⚜
        </h2>
      </div>

      ${aiAnalysisHTML}

      <div class="bias-grid">
        ${biasCardsHTML}
      </div>

      <div class="jokbo-footer">
        <p>이 족보는 ${currentDate} 에 작성되었습니다</p>
        <p class="domain">⚜ bias-jokbo.com ⚜</p>
      </div>
    </div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 500);
    };
  </script>
</body>
</html>
  `;
};
