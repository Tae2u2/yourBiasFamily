/**
 * 날짜 관련 유틸리티 함수들
 */

/**
 * 시작일과 종료일을 받아 기간을 계산합니다
 */
export const calculatePeriod = (start: string, end: string): string => {
  if (end === '현재') return '현재 진행중';
  const startDate = new Date(start);
  const endDate = new Date(end);
  const months = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
  return `${months}개월`;
};

/**
 * 날짜를 한국어 형식으로 포맷팅합니다
 */
export const formatDate = (dateString: string): string => {
  if (dateString === '현재') return '현재';
  return new Date(dateString).toLocaleDateString('ko-KR');
};
