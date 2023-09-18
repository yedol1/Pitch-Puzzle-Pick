import { Action } from './reduxType';

export const ADD_SUB_FIELD = 'squad/ADD_SUB_FIELD';
export const REMOVE_SUB_FIELD = 'squad/REMOVE_SUB_FIELD';
export const REMOVE_STARTING_FIELD = 'squad/REMOVE_STARTING_FIELD';
export const SET_SQUAD = 'squad/SET_SQUAD';
export const MOVE_SUB_TO_STARTING = 'squad/MOVE_SUB_TO_STARTING';
export const MOVE_STARTING_TO_SUB = 'squad/MOVE_STARTING_TO_SUB';
export const REARRANGE_STARTING = 'squad/REARRANGE_STARTING';
export const REARRANGE_SUB = 'squad/REARRANGE_SUB';
export const SWAP_STARTING_POSITIONS = 'squad/SWAP_STARTING_POSITIONS';
export const SWAP_SUB_TO_STARTING_POSITION = 'squad/SWAP_SUB_TO_STARTING_POSITION';
export const RESET_SQUAD = 'squad/RESET_SQUAD';

interface Player {
  UID: string;
  position: string;
  // 필요한 경우 여기에 추가적인 필드들을 추가
}

type SquadState = {
  starting: Array<{ position: string; player: Player | Player[] | null }>;
  sub: Player[];
};

export const addSubField = (field: number): Action<number> => ({
  type: ADD_SUB_FIELD,
  payload: field,
});

export const resetSquad = (): Action<void> => ({
  type: RESET_SQUAD,
  payload: undefined,
});

export const removeSubField = (field: number): Action<number> => ({
  type: REMOVE_SUB_FIELD,
  payload: field,
});

export const removeStartingField = (field: number): Action<number> => ({
  type: REMOVE_STARTING_FIELD,
  payload: field,
});

export const setSquad = (starting: string, sub: string): Action<any> => ({
  type: SET_SQUAD,
  payload: { starting, sub },
});

interface ActionWithPayload<T = void> {
  type: string;
  payload: T;
  endIndex?: number;
  position?: string;
}

export const moveSubToStarting = (field: number, endIndex: number, position: string): ActionWithPayload<number> => ({
  type: MOVE_SUB_TO_STARTING,
  payload: field,
  endIndex,
  position,
});

export const moveStartingToSub = (field: number, endIndex: number, position: string): ActionWithPayload<number> => ({
  type: MOVE_STARTING_TO_SUB,
  payload: field,
  position,
  endIndex,
});

interface RearrangeAction {
  type: string;
  startIndex: number;
  endIndex: number;
}
export const rearrangeStarting = (startIndex: number, endIndex: number): Action<void> => ({
  type: REARRANGE_STARTING,
  startIndex,
  endIndex,
  payload: undefined,
});

export const rearrangeSub = (startIndex: number, endIndex: number): Action<void> => ({
  type: REARRANGE_SUB,
  startIndex,
  endIndex,
  payload: undefined,
});

interface SwapStartingPositionsAction {
  type: string;
  sourcePosition: { position: string; player: Player | Player[] | null };
  destPosition: { position: string; player: Player | Player[] | null };
}

export const swapStartingPositions = (
  sourcePosition: { position: string; player: Player | Player[] | null },
  destPosition: { position: string; player: Player | Player[] | null },
): SwapStartingPositionsAction => ({
  type: SWAP_STARTING_POSITIONS,
  sourcePosition,
  destPosition,
});

interface SwapSubToStartingPositionAction {
  type: string;
  sourceIndex: number;
  destPosition: { position: string; player: Player | Player[] | null };
}

export const swapSubToStartingPosition = (
  sourceIndex: number,
  destPosition: { position: string; player: Player | Player[] | null },
): SwapSubToStartingPositionAction => ({
  type: SWAP_SUB_TO_STARTING_POSITION,
  sourceIndex,
  destPosition,
});

const initialState: SquadState = {
  starting: [
    {
      position: 'GK',
      player: null,
    },
    {
      position: 'DL',
      player: null,
    },
    {
      position: 'LCB',
      player: null,
    },
    {
      position: 'CB',
      player: null,
    },
    {
      position: 'RCB',
      player: null,
    },
    {
      position: 'DR',
      player: null,
    },
    {
      position: 'WBL',
      player: null,
    },
    {
      position: 'WBR',
      player: null,
    },
    {
      position: 'LDM',
      player: null,
    },
    {
      position: 'CDM',
      player: null,
    },
    {
      position: 'RDM',
      player: null,
    },
    {
      position: 'ML',
      player: null,
    },
    {
      position: 'MR',
      player: null,
    },
    {
      position: 'LCM',
      player: null,
    },
    {
      position: 'CM',
      player: null,
    },
    {
      position: 'RCM',
      player: null,
    },
    {
      position: 'AML',

      player: null,
    },
    {
      position: 'AMR',
      player: null,
    },
    {
      position: 'AMCL',
      player: null,
    },
    {
      position: 'AMC',
      player: null,
    },
    {
      position: 'AMCR',
      player: null,
    },
    {
      position: 'STC',
      player: null,
    },
  ],
  sub: [],
};

const parseStartingString = (str: string): Record<string, string> => {
  return str.split(',').reduce((acc, pair) => {
    const [position, UID] = pair.split(':');
    acc[position] = UID;
    return acc;
  }, {} as Record<string, string>);
};

const parseSubString = (str: string): string[] => {
  const result = str.split(',');
  return result[0] === '' ? [] : result;
};

const squadReducer = (state = initialState, action: Action<any>): any => {
  switch (action.type) {
    case RESET_SQUAD:
      return initialState;

    case ADD_SUB_FIELD:
      return {
        ...state,
        sub: [...state.sub, action.payload],
      };
    case REMOVE_SUB_FIELD:
      return {
        ...state,
        sub: state.sub.filter((player) => player !== action.payload),
      };

    case REMOVE_STARTING_FIELD:
      return {
        ...state,
        starting: state.starting.map((item) => (item.position === action.payload ? { ...item, player: null } : item)),
      };
    case SET_SQUAD:
      const startingMap = parseStartingString(action.payload.starting);
      const subList = parseSubString(action.payload.sub);

      // Process starting
      const processedStarting = state.starting.map((item) => {
        const UID = startingMap[item.position];
        if (UID) {
          return {
            position: item.position,
            player: Number(UID),
          };
        }
        return item;
      });

      // Process sub
      const processedSub = subList.map((UID) => Number(UID));

      return {
        ...state,
        starting: processedStarting,
        sub: processedSub,
      };
    case MOVE_SUB_TO_STARTING:
      if (action.endIndex !== undefined && action.position) {
        const updatedStarting = state.starting.map((item) => {
          // item의 position이 action.position과 일치하면 수정
          if (item.position === action.position) {
            return { position: action.position, player: action.payload };
          }
          // 일치하지 않으면 기존 항목 반환
          return item;
        });

        return {
          ...state,
          starting: updatedStarting,
          sub: state.sub.filter((player) => player !== action.payload),
        };
      }
      return state; // 조건에 맞지 않으면 원래 상태 반환

    case MOVE_STARTING_TO_SUB:
      if (action.endIndex !== undefined) {
        const updatedStarting = state.starting.map((item) => {
          // item의 position이 action.position과 일치하면 player를 null로 수정
          if (item.position === action.position) {
            return { ...item, player: null };
          }
          // 일치하지 않으면 기존 항목 반환
          return item;
        });

        const newArr = Array.from(state.sub);
        newArr.splice(action.endIndex, 0, action.payload);

        return {
          ...state,
          starting: updatedStarting,
          sub: newArr,
        };
      }
      return state; // 조건에 맞지 않으면 원래 상태 반환

    case REARRANGE_STARTING:
      if (action.startIndex !== undefined && action.endIndex !== undefined) {
        const newArr = Array.from(state.starting);
        const [moved] = newArr.splice(action.startIndex, 1);
        newArr.splice(action.endIndex, 0, moved);
        return {
          ...state,
          starting: newArr,
        };
      }
      return state;
    case REARRANGE_SUB:
      if (action.startIndex !== undefined && action.endIndex !== undefined) {
        const newArr = Array.from(state.sub);
        const [moved] = newArr.splice(action.startIndex, 1);
        newArr.splice(action.endIndex, 0, moved);
        return {
          ...state,
          sub: newArr,
        };
      }
      return state;
    case SWAP_STARTING_POSITIONS:
      if (action.sourcePosition && action.destPosition) {
        return {
          ...state,
          starting: state.starting.map((item) => {
            if (item.position === action.sourcePosition?.position) {
              return { ...item, player: action.destPosition?.player };
            }
            if (item.position === action.destPosition?.position) {
              return { ...item, player: action.sourcePosition?.player };
            }
            return item;
          }),
        };
      }
      return state;

    case SWAP_SUB_TO_STARTING_POSITION:
      if (typeof action.sourceIndex === 'number' && action.destPosition) {
        const newSub = [...state.sub];
        const swappedPlayer = newSub.splice(action.sourceIndex, 1)[0];

        return {
          ...state,
          starting: state.starting.map((item) => {
            if (item.position === action.destPosition?.position) {
              return { position: item.position, player: swappedPlayer };
            }
            return item;
          }),
          sub: action.destPosition.player ? newSub.concat(action.destPosition.player as Player) : newSub, // destPosition player가 undefined인 경우
        };
      }
      return state; // sourceIndex 또는 destPosition이 없을 때 state 반환

    default:
      return state;
  }
};

export default squadReducer;
