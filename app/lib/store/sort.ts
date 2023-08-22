// tableRedux.js

// 1. Types
export type TableState = {
  selectedHeader: string;
  order: 'asc' | 'desc';
};

type SetHeaderAction = {
  type: typeof SET_HEADER;
  payload: string;
};

type ToggleOrderAction = {
  type: typeof TOGGLE_ORDER;
};

type TableActionTypes = SetHeaderAction | ToggleOrderAction;

// 2. Action Types
const SET_HEADER = 'table/SET_HEADER';
const TOGGLE_ORDER = 'table/TOGGLE_ORDER';

// 3. Action Creators
export const setHeader = (header: string): SetHeaderAction => ({
  type: SET_HEADER,
  payload: header,
});

export const toggleOrder = (): ToggleOrderAction => ({
  type: TOGGLE_ORDER,
});

// 4. Initial State
const initialState: TableState = {
  selectedHeader: 'CA',
  order: 'desc',
};

// 5. Reducer
const tableSortReducer = (state: TableState = initialState, action: TableActionTypes): TableState => {
  switch (action.type) {
    case SET_HEADER:
      return {
        ...state,
        selectedHeader: action.payload,
        order: 'desc',
      };
    case TOGGLE_ORDER:
      return {
        ...state,
        order: state.order === 'desc' ? 'asc' : 'desc',
      };
    default:
      return state;
  }
};

export default tableSortReducer;
