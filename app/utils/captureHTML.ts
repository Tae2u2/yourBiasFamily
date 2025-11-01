/**
 * HTML 문자열을 DOM에 렌더링하고 캡처하여 이미지로 다운로드합니다
 */
export const captureAndDownloadHTML = async (
  htmlContent: string,
  filename: string = '최애족보.png'
): Promise<void> => {
  return new Promise((resolve, reject) => {
    // 임시 컨테이너 생성
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = '1200px';
    container.style.background = 'linear-gradient(to bottom right, #fffbeb, #fef3c7)';

    // HTML 파싱하여 body 내용만 추출
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const bodyContent = doc.body.innerHTML;
    const styles = doc.head.querySelector('style')?.innerHTML || '';

    // 스타일 추가
    const styleElement = document.createElement('style');
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);

    // 내용 추가
    container.innerHTML = bodyContent;
    document.body.appendChild(container);

    // 이미지 로드 대기
    const images = container.getElementsByTagName('img');
    const imagePromises = Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = () => resolve(null);
        img.onerror = () => resolve(null);
      });
    });

    Promise.all(imagePromises).then(() => {
      // 약간의 딜레이 후 캡처 (렌더링 완료 대기)
      setTimeout(() => {
        // Canvas로 캡처
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          cleanup();
          reject(new Error('Canvas context not available'));
          return;
        }

        // 캔버스 크기 설정
        const scale = 2; // 고해상도
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width * scale;
        canvas.height = rect.height * scale;

        ctx.scale(scale, scale);

        // HTML을 Canvas에 그리기 위한 처리
        drawHTMLToCanvas(container, canvas, scale).then(() => {
          // 다운로드
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.download = filename;
              link.href = url;
              link.click();
              URL.revokeObjectURL(url);
            }

            cleanup();
            resolve();
          }, 'image/png');
        }).catch((error) => {
          cleanup();
          reject(error);
        });
      }, 300);
    });

    function cleanup() {
      document.body.removeChild(container);
      document.head.removeChild(styleElement);
    }
  });
};

/**
 * HTML 요소를 Canvas에 그립니다
 */
async function drawHTMLToCanvas(
  element: HTMLElement,
  canvas: HTMLCanvasElement,
  scale: number
): Promise<void> {
  // html2canvas 동적 import
  const html2canvas = (await import('html2canvas')).default;

  const resultCanvas = await html2canvas(element, {
    backgroundColor: '#fffbeb',
    scale: scale,
    useCORS: true,
    logging: false,
    width: element.scrollWidth,
    height: element.scrollHeight,
  });

  // 결과를 원본 캔버스에 복사
  const ctx = canvas.getContext('2d');
  if (ctx) {
    canvas.width = resultCanvas.width;
    canvas.height = resultCanvas.height;
    ctx.drawImage(resultCanvas, 0, 0);
  }
}
