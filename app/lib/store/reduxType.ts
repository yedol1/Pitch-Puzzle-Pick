export type Action<Payload> = {
  type: string;
  payload: Payload;
};

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
  filters: Filters;
  selectedFields: string[];
};
