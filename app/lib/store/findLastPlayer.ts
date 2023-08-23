import { Action, LastUIDState } from './reduxType';

export const SET_LAST_UID = 'lastUID/SET_LAST_UID';

export const setLastUID = (uid: string | null): Action<string | null> => ({
  type: SET_LAST_UID,
  payload: uid,
});

const initialState: LastUIDState = {
  lastUID: null,
};

const lastUIDReducer = (state = initialState, action: Action<any>): LastUIDState => {
  switch (action.type) {
    case SET_LAST_UID:
      return {
        ...state,
        lastUID: action.payload,
      };
    default:
      return state;
  }
};

export default lastUIDReducer;
