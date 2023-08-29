export const cls = (...classnames: string[]) => {
  return classnames.join(' ');
};

// 한글 정렬 함수
export const koreanSort = (a: string | null, b: string | null) => {
  if (a === null) return 1;
  if (b === null) return -1;

  return a.localeCompare(b, 'ko-KR');
};

// 세리아 정렬 함수
export const seriaSort = (a: string | null, b: string | null) => {
  // null 값을 처리합니다.
  if (a === null) return 1;
  if (b === null) return -1;

  // '세리에'로 시작하는 문자열을 우선시합니다.
  const aStartsWithSeries = a.startsWith('세리에');
  const bStartsWithSeries = b.startsWith('세리에');

  if (aStartsWithSeries && !bStartsWithSeries) {
    return -1;
  }
  if (!aStartsWithSeries && bStartsWithSeries) {
    return 1;
  }

  // '세리에'로 시작하는 문자열이나 나머지 문자열을 일반적으로 정렬합니다.
  return a.localeCompare(b, 'ko-KR');
};

// 분데스 정렬 함수
export const germanySort = (a: string | null, b: string | null) => {
  // null 값을 처리합니다.
  if (a === null) return 1;
  if (b === null) return -1;

  // '분데스'로 시작하는 문자열을 우선시합니다.
  const aStartsWithSeries = a.startsWith('분데스');
  const bStartsWithSeries = b.startsWith('분데스');

  if (aStartsWithSeries && !bStartsWithSeries) {
    return -1;
  }
  if (!aStartsWithSeries && bStartsWithSeries) {
    return 1;
  }

  // '분데스'로 시작하는 문자열이나 나머지 문자열을 일반적으로 정렬합니다.
  return a.localeCompare(b, 'ko-KR');
};

// 프랑스 정렬 함수
export const franceSort = (a: string | null, b: string | null) => {
  const priorityLeagues = ['리그 1 우버 잇츠', '리그 2 BKT'];
  if (a === null) return 1;
  if (b === null) return -1;

  const aPriority = priorityLeagues.indexOf(a);
  const bPriority = priorityLeagues.indexOf(b);

  if (aPriority !== -1 && bPriority === -1) return -1;
  if (aPriority === -1 && bPriority !== -1) return 1;
  if (aPriority !== -1 && bPriority !== -1) return aPriority - bPriority;

  return a.localeCompare(b, 'ko-KR');
};

// 스페인 정렬 함수
export const spainSort = (a: string | null, b: string | null) => {
  // null 값을 처리합니다.
  if (a === null) return 1;
  if (b === null) return -1;

  // '스페인'로 시작하는 문자열을 우선시합니다.
  const aStartsWithSeries = a.startsWith('라리가');
  const bStartsWithSeries = b.startsWith('라리가');

  if (aStartsWithSeries && !bStartsWithSeries) {
    return -1;
  }
  if (!aStartsWithSeries && bStartsWithSeries) {
    return 1;
  }

  // '스페인'로 시작하는 문자열이나 나머지 문자열을 일반적으로 정렬합니다.
  return a.localeCompare(b, 'ko-KR');
};

// 포르투갈
export const portugalSort = (a: string | null, b: string | null) => {
  // null 값을 처리합니다.
  if (a === null) return 1;
  if (b === null) return -1;

  const aStartsWithSeries = a.startsWith('프리미어 리그');
  const bStartsWithSeries = b.startsWith('프리미어 리그');

  if (aStartsWithSeries && !bStartsWithSeries) {
    return -1;
  }
  if (!aStartsWithSeries && bStartsWithSeries) {
    return 1;
  }

  return a.localeCompare(b, 'ko-KR');
};

export const netherlandsSort = (a: string | null, b: string | null) => {
  // null 값을 처리합니다.
  if (a === null) return 1;
  if (b === null) return -1;

  const aStartsWithSeries = a.startsWith('에레디비시');
  const bStartsWithSeries = b.startsWith('에레디비시');

  if (aStartsWithSeries && !bStartsWithSeries) {
    return -1;
  }
  if (!aStartsWithSeries && bStartsWithSeries) {
    return 1;
  }

  return a.localeCompare(b, 'ko-KR');
};

// 잉글랜드 정렬 함수
export const eplSort = (a: string | null, b: string | null) => {
  const priorityLeagues = ['프리미어 리그', '스카이 벳 챔피언쉽', '스카이 벳 리그 1', '스카이 벳 리그 2'];
  if (a === null) return 1;
  if (b === null) return -1;

  const aPriority = priorityLeagues.indexOf(a);
  const bPriority = priorityLeagues.indexOf(b);

  if (aPriority !== -1 && bPriority === -1) return -1;
  if (aPriority === -1 && bPriority !== -1) return 1;
  if (aPriority !== -1 && bPriority !== -1) return aPriority - bPriority;

  return a.localeCompare(b, 'ko-KR');
};
