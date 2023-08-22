export type LastUIDState = {
  lastUID: string | null;
};

type SetLastUIDAction = {
  type: typeof SET_LAST_UID;
  payload: string | null;
};

type LastUIDActionTypes = SetLastUIDAction;

const SET_LAST_UID = 'lastUID/SET_LAST_UID';

export const setLastUID = (uid: string | null): SetLastUIDAction => ({
  type: SET_LAST_UID,
  payload: uid,
});

const initialState: LastUIDState = {
  lastUID: null,
};

const lastUIDReducer = (state = initialState, action: LastUIDActionTypes): LastUIDState => {
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
