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
      // 🔥 핵심: 모든 이미지를 data URL로 변환
      await convertImagesToDataURL(container);

      // 약간의 딜레이 후 캡처 (렌더링 완료 대기)
      setTimeout(async () => {
        try {
          // html2canvas로 캡처
          const html2canvas = (await import("html2canvas")).default;

          const canvas = await html2canvas(container, {
            backgroundColor: "#fffbeb",
            scale: 2, // 고해상도
            useCORS: true,
            allowTaint: true, // 🔥 data URL 허용
            logging: false,
            width: container.scrollWidth,
            height: container.scrollHeight,
            // 🔥 이미지 렌더링 옵션
            imageTimeout: 0, // data URL은 타임아웃 없음
            onclone: (clonedDoc) => {
              // 복제된 문서에서 추가 처리 가능
              const clonedContainer = clonedDoc.querySelector(
                '[style*="fixed"]'
              ) as HTMLElement;
              if (clonedContainer) {
                clonedContainer.style.left = "0";
              }
            },
          });

          // 다운로드
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.download = filename;
                link.href = url;
                link.click();
                URL.revokeObjectURL(url);
              }

              cleanup();
              resolve();
            },
            "image/png",
            1.0
          ); // 최고 품질
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
 * 🔥 컨테이너 내의 모든 이미지를 data URL로 변환
 * CORS 문제를 우회하기 위한 핵심 함수
 */
async function convertImagesToDataURL(container: HTMLElement): Promise<void> {
  const images = Array.from(container.getElementsByTagName("img"));

  const conversionPromises = images.map(async (img) => {
    try {
      // 이미 data URL이면 스킵
      if (img.src.startsWith("data:")) {
        return;
      }

      // 외부 이미지를 data URL로 변환
      const dataURL = await imageToDataURL(img.src);
      img.src = dataURL;
    } catch (error) {
      console.warn("이미지 변환 실패:", img.src, error);
      // 실패해도 계속 진행
    }
  });

  await Promise.all(conversionPromises);

  // 이미지 로드 대기
  const loadPromises = images.map((img) => {
    if (img.complete) return Promise.resolve();
    return new Promise<void>((resolve) => {
      img.onload = () => resolve();
      img.onerror = () => resolve(); // 에러도 계속 진행
      // 타임아웃 추가
      setTimeout(() => resolve(), 5000);
    });
  });

  await Promise.all(loadPromises);
}

/**
 * 이미지 URL을 data URL로 변환
 */
async function imageToDataURL(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // CORS 처리

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas context not available"));
          return;
        }

        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error(`Failed to load image: ${url}`));
    };

    // 캐시 우회 (CORS 문제 해결)
    img.src = url + (url.includes("?") ? "&" : "?") + "_t=" + Date.now();
  });
}
