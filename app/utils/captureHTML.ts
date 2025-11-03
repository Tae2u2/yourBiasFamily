import { domToPng } from "modern-screenshot";

export const captureAndDownloadHTML = async (
  htmlContent: string,
  filename: string = "최애족보.png"
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    // 임시 컨테이너 생성
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.left = "-9999px";
    container.style.top = "0";
    container.style.width = "1200px";
    container.style.background =
      "linear-gradient(to bottom right, #fffbeb, #fef3c7)";

    // HTML 파싱하여 body 내용만 추출
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const bodyContent = doc.body.innerHTML;
    const styles = doc.head.querySelector("style")?.innerHTML || "";

    // 스타일 추가
    const styleElement = document.createElement("style");
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);

    // 내용 추가
    container.innerHTML = bodyContent;
    document.body.appendChild(container);

    try {
      // 이미지 로드 대기
      await waitForImages(container);

      // 약간의 딜레이 후 캡처 (렌더링 완료 대기)
      setTimeout(async () => {
        try {
          // modern-screenshot으로 캡처
          const dataUrl = await domToPng(container, {
            quality: 1.0, // 최고 품질
            scale: 2, // 고해상도 (Retina)
            backgroundColor: "#fffbeb",
            style: {
              left: "0", // 화면 밖에서 화면 안으로 이동
            },
          });

          // dataUrl을 blob으로 변환하여 다운로드
          const response = await fetch(dataUrl);
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.download = filename;
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);

          cleanup();
          resolve();
        } catch (error) {
          cleanup();
          reject(error);
        }
      }, 300);
    } catch (error) {
      cleanup();
      reject(error);
    }

    function cleanup() {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    }
  });
};

/**
 * 컨테이너 내의 모든 이미지 로드 대기
 */
async function waitForImages(container: HTMLElement): Promise<void> {
  const images = Array.from(container.getElementsByTagName("img"));

  const loadPromises = images.map((img) => {
    if (img.complete) return Promise.resolve();
    return new Promise<void>((resolve) => {
      img.onload = () => resolve();
      img.onerror = () => resolve(); // 에러가 나도 계속 진행
      // 타임아웃 추가 (5초)
      setTimeout(() => resolve(), 5000);
    });
  });

  await Promise.all(loadPromises);
}
