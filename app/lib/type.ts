export interface PlayerStatusType {
  UID: number;
  Wor: number;
  One: number;
  Tec: number;
  Fin: number;
  Kic: number;
  Thr: number;
  OtB: number;
  Aer: number;
  Bal: number;
  Ecc: string; // VARCHAR type
  Bra: number;
  TRO: string; // VARCHAR type
  Dri: number;
  Ldr: number;
  Str: number;
  Agi: number;
  Ref: number;
  Fir: number;
  Han: number;
  Pos: number;
  Com: number;
  Acc: number;
  Det: number;
  Vis: number;
  Ant: number;
  Mar: number;
  LTh: number;
  Agg: number;
  Jum: number;
  Pac: number;
  Lon: number;
  Sta: number;
  Cnt: number;
  Fla: number;
  Cmp: number;
  Cor: number;
  Cro: number;
  Nat: number;
  Tck: number;
  Tea: number;
  Dec: number;
  Pas: number;
  Pun: number;
  Cmd: number;
  Pen: number;
  Fre: number;
  Hea: number;
}

export interface PlayerInfoType {
  UID: number;
  Based?: string; // VARCHAR type
  Division?: string; // VARCHAR type
  Club?: string; // VARCHAR type
  Name?: string; // VARCHAR type
  CA?: number;
  PA?: number;
  Position?: string; // VARCHAR type
  Age?: number;
  Nat?: string; // VARCHAR type
  DOB?: string; // VARCHAR type (Date format can also be used if consistent)
  Weight?: string; // VARCHAR type
  Height?: string; // VARCHAR type
  RightFoot?: string; // VARCHAR type
  LeftFoot?: string; // VARCHAR type
  AP?: number;
  Salary?: number;
  Personality?: string; // VARCHAR type
  ImpM?: number;
  InjPr?: number;
  Cons?: number;
  Dirt?: number;
  // Note: The foreign key relationship is not represented in the type.
  // This would be managed by the database and ORM, not TypeScript.
}

export type TableProps = {
  isDisabled?: boolean;
  filters?: any;
};

export type HeaderType = 'CA' | 'PA' | 'Name' | 'Salary' | 'AP';
export type OrderType = 'asc' | 'desc';
export interface FetchPlayersArgs {
  pageParam?: number;
  selectedHeader: HeaderType;
  order: OrderType;
  filters?: any;
}

export type AlignBtnProps = {
  header: HeaderType;
  order: OrderType;
  currentHeader: HeaderType;
};

export interface IProps {
  handleIntersection: () => void;
}

export interface FilterState {
  [key: string]: {
    min: number | null;
    max: number | null;
  };
}
