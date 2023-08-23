export type Action<Payload> = {
  type: string;
  payload: Payload;
};

export type Filters = {
  [key: string]: Filter;
};

export type Filter = {
  min?: number;
  max?: number;
};

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
