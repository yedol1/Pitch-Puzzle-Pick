export const cls = (...classnames: string[]) => {
  return classnames.join(' ');
};

// 한글 정렬 함수
/**
 * @description 한글 정렬 함수
 * @param a  string | null
 * @param b  string | null
 */
export const koreanSort = (a: string | null, b: string | null) => {
  if (a === null) return 1;
  if (b === null) return -1;

  return a.localeCompare(b, 'ko-KR');
};

// 세리아 정렬 함수
/**
 * @description 세리아 정렬 함수
 * @param a  string | null
 * @param b  string | null
 */
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
/**
 * @description 분데스 정렬 함수
 * @param a  string | null
 * @param b  string | null
 */
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
/**
 * @description 프랑스 정렬 함수
 * @param a  string | null
 * @param b  string | null
 */
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
/**
 * @description 스페인 정렬 함수
 * @param a  string | null
 * @param b  string | null
 */
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
/**
 * @description 포르투갈 정렬 함수
 * @param a  string | null
 * @param b  string | null
 */
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

// 네덜란드 정렬 함수
/**
 * @description 네덜란드 정렬 함수
 * @param a  string | null
 * @param b  string | null
 */
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
/**
 * @description 잉글랜드 정렬 함수
 * @param a  string | null
 * @param b  string | null
 */
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

/**
 * @description 선수의 포지션을 한글로 변환
 * @param value number
 * @returns
 */
export const formatValue = (value: number): string => {
  if (value >= 100000000) {
    return `${(value / 100000000).toFixed(2)}억`;
  } else if (value >= 10000) {
    return `${Math.round(value / 10000)}만`;
  } else {
    return value.toString();
  }
};

/**
 * @description 에러 발생시 기본 이미지로 대체
 * @param e any
 */
export const onErrorDefaultPlayerImg = (e: any) => {
  e.target.src = '/default.svg';
};

/**
 * @description 에러 발생시 기본 이미지로 대체
 * @param e any
 */
export const onErrorDefaultFlag = (e: any) => {
  e.target.src = '/defaultFlag.svg';
};
/**
 * @description 에러 발생시 기본 이미지로 대체
 * @param e any
 */
export const onErrorDefaultLogo = (e: any) => {
  e.target.src = '/defaultLogo.png';
};

/**
 * @description 멘탈 스탯 계산
 * @param stat any
 */
export const culMentalStat = (stat: any) => {
  let total = 0;
  total = stat.Dec + stat.Tea + stat.Ant + stat.Bra + stat.Det + stat.Cnt;
  // 6개의 평균값 구하고, 100분율로 변환
  const average = total / 6;
  const result = average * 5;

  const finalResult = Math.floor(result);

  return finalResult;
};
/**
 * @description 수비 스탯 계산
 * @param stat any
 */
export const culDefStat = (stat: any) => {
  let total = 0;
  total = stat.Pos + stat.Tck + stat.Mar + stat.Cnt;
  // 평균값 구하고, 100분율로 변환
  const average = total / 4;
  const result = average * 5;

  const finalResult = Math.floor(result);

  return finalResult;
};
/**
 * @description 공격 스탯 계산
 * @param stat any
 */
export const culAtkStat = (stat: any) => {
  let total = 0;
  total = stat.Cmp + stat.Fin + stat.Dri + stat.OtB;
  // 평균값 구하고, 100분율로 변환
  const average = total / 4;
  const result = average * 5;

  const finalResult = Math.floor(result);

  return finalResult;
};
/**
 * @description 스피드 스탯 계산
 * @param stat any
 */
export const culSpdStat = (stat: any) => {
  let total = 0;
  total = stat.Agi + stat.Acc + stat.Pac;
  // 평균값 구하고, 100분율로 변환
  const average = total / 3;
  const result = average * 5;

  const finalResult = Math.floor(result);

  return finalResult;
};
/**
 * @description 기술 스탯 계산
 * @param stat any
 */
export const culTechStat = (stat: any) => {
  let total = 0;
  total = stat.Tec + stat.Vis + stat.Fla + stat.Pas + stat.Fir;
  // 평균값 구하고, 100분율로 변환
  const average = total / 5;
  const result = average * 5;

  const finalResult = Math.floor(result);

  return finalResult;
};
/**
 * @description 피지컬 스탯 계산
 * @param stat any
 */
export const culPhyStat = (stat: any) => {
  let total = 0;
  total = stat.Bal + stat.Str + stat.Jum + stat.Sta + stat.Nat;
  // 평균값 구하고, 100분율로 변환
  const average = total / 5;
  const result = average * 5;

  const finalResult = Math.floor(result);

  return finalResult;
};

/**
 * @description 골키퍼 세이브 스탯 계산
 * @param stat any
 */
export const culGkSaveStat = (stat: any) => {
  let total = 0;
  total = stat.One + stat.Ref;
  // 평균값 구하고, 100분율로 변환
  const average = total / 2;
  const result = average * 5;

  const finalResult = Math.floor(result);

  return finalResult;
};

/**
 * @description 골키퍼 피지컬 스탯 계산
 * @param stat any
 */
export const culGkPhyStat = (stat: any) => {
  let total = 0;
  total = stat.Str + stat.Acc + stat.Bal + stat.Sta;
  // 평균값 구하고, 100분율로 변환
  const average = total / 4;
  const result = average * 5;

  const finalResult = Math.floor(result);

  return finalResult;
};

/**
 * @description 골키퍼 스피드 스탯 계산
 * @param stat any
 */
export const culGKSpdStat = (stat: any) => {
  let total = 0;
  total = stat.Agi + stat.Acc + stat.Pac;
  // 평균값 구하고, 100분율로 변환
  const average = total / 3;
  const result = average * 5;

  const finalResult = Math.floor(result);

  return finalResult;
};

/**
 * @description 골키퍼 수비조율 스탯 계산
 * @param stat any
 */
export const culGkDefCtlStat = (stat: any) => {
  let total = 0;
  total = stat.Com + stat.Cmd;
  // 평균값 구하고, 100분율로 변환
  const average = total / 2;
  const result = average * 5;

  const finalResult = Math.floor(result);

  return finalResult;
};

/**
 * @description 골키퍼 공중장악 스탯 계산
 * @param stat any
 */
export const culGkAerStat = (stat: any) => {
  let total = 0;
  total = stat.Aer + stat.Pun + stat.Han;
  // 평균값 구하고, 100분율로 변환
  const average = total / 3;
  const result = average * 5;

  const finalResult = Math.floor(result);

  return finalResult;
};

/**
 * @description 골키퍼 볼배급 스탯 계산
 * @param stat any
 */
export const culGkDistStat = (stat: any) => {
  let total = 0;
  total = stat.Kic + stat.Thr;
  // 평균값 구하고, 100분율로 변환
  const average = total / 2;
  const result = average * 5;

  const finalResult = Math.floor(result);

  return finalResult;
};

/**
 * @description 골키퍼 멘탈 스탯 계산
 * @param stat any
 */
export const culGkMentalStat = (stat: any) => {
  let total = 0;
  total = stat.Dec + stat.Tea + stat.Ant + stat.Bra + stat.Det + stat.Cnt;
  // 6개의 평균값 구하고, 100분율로 변환
  const average = total / 6;
  const result = average * 5;

  const finalResult = Math.floor(result);

  return finalResult;
};
/**
 * @description 골키퍼 기행 스탯 계산
 * @param stat any
 */
export const culGkEccStat = (stat: any) => {
  let total = 0;
  total = stat.Ecc;
  const result = total * 5;

  const finalResult = Math.floor(result);

  return finalResult;
};

/**
 * @description 수치에 따른 색상 클래스 반환
 * @param abil number
 */
export const getColorClass = (abil: number) => {
  if (abil >= 11 && abil <= 15) return 'text-good';
  if (abil >= 16) return 'text-excellent';
  return 'text-soso';
};
