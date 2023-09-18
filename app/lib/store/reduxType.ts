export type Action<Payload> = {
  type: string;
  payload: Payload;
  startIndex?: number;
  position?: string;
  endIndex?: number;
  sourceIndex?: number;
  sourcePosition?: { position: string; player: Player | Player[] | null };
  destPosition?: { position: string; player: Player | Player[] | null };
};
interface Player {
  UID: string;
  position: string;
  // 필요한 경우 여기에 추가적인 필드들을 추가
}
export type Filters = {
  [key: string]: Filter;
};

export type FilterType = {
  min?: number;
  max?: number;
  value?: string;
};

// Update: Filter can be either a FilterType or a string array
export type Filter = FilterType;

export type RootState = {
  filters: FiltersState;
  table: TableState;
  lastUID: LastUIDState;
};

export type TableState = {
  selectedHeader: 'CA' | 'PA' | 'Name' | 'Salary' | 'AP';
  order: 'asc' | 'desc';
};

export type LastUIDState = {
  lastUID: string | null;
};

export type FiltersState = {
  filters: any;
  selectedFields: string[];
};
