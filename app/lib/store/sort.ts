import { Action, TableState } from './reduxType';

export const SET_HEADER = 'table/SET_HEADER';
export const TOGGLE_ORDER = 'table/TOGGLE_ORDER';

export const setHeader = (header: TableState['selectedHeader']): Action<TableState['selectedHeader']> => ({
  type: SET_HEADER,
  payload: header,
});

export const toggleOrder = (): Action<null> => ({
  type: TOGGLE_ORDER,
  payload: null,
});

const initialState: TableState = {
  selectedHeader: 'CA',
  order: 'desc',
};

const tableSortReducer = (state = initialState, action: Action<any>): TableState => {
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
