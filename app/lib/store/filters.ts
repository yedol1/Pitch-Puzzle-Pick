import { Action, FiltersState, Filters, Filter, FilterType } from './reduxType';

export const SET_FILTERS = 'filters/SET_FILTERS';
export const ADD_SELECTED_FIELD = 'filters/ADD_SELECTED_FIELD';
export const REMOVE_SELECTED_FIELD = 'filters/REMOVE_SELECTED_FIELD';

export const setFilters = (filters: any): Action<Filters> => ({
  type: SET_FILTERS,
  payload: filters,
});

export const addSelectedField = (field: string): Action<string> => ({
  type: ADD_SELECTED_FIELD,
  payload: field,
});

export const removeSelectedField = (field: string): Action<string> => ({
  type: REMOVE_SELECTED_FIELD,
  payload: field,
});

const initialState: any = {
  filters: {
    Club: { value: '' },
    Belong: {
      LeagueNat: '',
      Based: '',
      Club: '',
    },
    DetailedPos: [],
  },
  selectedFields: [],
};

const filtersReducer = (state = initialState, action: Action<any>): FiltersState => {
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
      return {
        ...state,
        selectedFields: state.selectedFields.filter((field: string) => field !== action.payload),
      };

    default:
      return state;
  }
};

export default filtersReducer;
