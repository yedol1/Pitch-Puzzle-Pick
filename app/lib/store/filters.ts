import { LastUIDState } from './findLastPlayer';

// 1. Types
type Filter = {
  min?: number;
  max?: number;
};

export type Filters = {
  [key: string]: Filter;
};

type FilterPayload = Filters;

type FiltersState = {
  filters: {
    [key: string]: Filter;
  };
  selectedFields: string[];
};

type SetFiltersAction = {
  type: typeof SET_FILTERS;
  payload: {
    [key: string]: Filter;
  };
};

type TableState = {
  selectedHeader: 'CA' | 'PA' | 'Name' | 'Salary' | 'AP';
  order: 'asc' | 'desc';
};

export type RootState = {
  filters: FiltersState;
  table: TableState;
  lastUID: LastUIDState;
};

type AddSelectedFieldAction = {
  type: typeof ADD_SELECTED_FIELD;
  payload: string;
};

type RemoveSelectedFieldAction = {
  type: typeof REMOVE_SELECTED_FIELD;
  payload: string;
};

type FiltersActionTypes = SetFiltersAction | AddSelectedFieldAction | RemoveSelectedFieldAction;

// 2. Actions Types
const SET_FILTERS = 'filters/SET_FILTERS';
const ADD_SELECTED_FIELD = 'filters/ADD_SELECTED_FIELD';
const REMOVE_SELECTED_FIELD = 'filters/REMOVE_SELECTED_FIELD';

// 3. Action Creators
export const setFilters = (filters: FilterPayload) => ({
  type: SET_FILTERS,
  payload: filters,
});

export const addSelectedField = (field: string): AddSelectedFieldAction => ({
  type: ADD_SELECTED_FIELD,
  payload: field,
});

export const removeSelectedField = (field: string): RemoveSelectedFieldAction => ({
  type: REMOVE_SELECTED_FIELD,
  payload: field,
});

// 4. Initial State
const initialState: FiltersState = {
  filters: {},
  selectedFields: [],
};

// 5. Reducer
const filtersReducer = (state = initialState, action: FiltersActionTypes): FiltersState => {
  switch (action.type) {
    case SET_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };
    case ADD_SELECTED_FIELD:
      return {
        ...state,
        selectedFields: [...state.selectedFields, action.payload],
      };
    case REMOVE_SELECTED_FIELD:
      const updatedFilters = { ...state.filters };
      delete updatedFilters[action.payload]; // Removes the filter for the deleted field.
      return {
        ...state,
        filters: updatedFilters,
        selectedFields: state.selectedFields.filter((field) => field !== action.payload),
      };
    default:
      return state;
  }
};

export default filtersReducer;
