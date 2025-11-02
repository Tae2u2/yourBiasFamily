/**
 * 날짜 관련 유틸리티 함수들
 */

/**
 * 날짜를 한국어 형식으로 포맷팅합니다
 */
export const formatDate = (dateString: string): string => {
  if (dateString === "현재") return "현재";
  return new Date(dateString).toLocaleDateString("ko-KR");
};

/**
 * 날짜 데이터가 담긴 배열을 날짜순으로 정렬합니다
 * @param items 정렬할 배열
 * @param dateKey 날짜가 담긴 필드명
 * @param order 정렬 순서 ('asc': 오름차순, 'desc': 내림차순)
 * @returns 날짜순으로 정렬된 배열
 */
export const sortByDate = <T extends Record<string, any>>(
  items: T[],
  dateKey: keyof T,
  order: "asc" | "desc" = "asc"
): T[] => {
  return [...items].sort((a, b) => {
    const dateA = a[dateKey] === "현재" ? new Date() : new Date(a[dateKey]);
    const dateB = b[dateKey] === "현재" ? new Date() : new Date(b[dateKey]);

    const diff = dateA.getTime() - dateB.getTime();
    return order === "asc" ? diff : -diff;
  });
};
