import { createStore, combineReducers } from 'redux';
import filtersReducer from './filters';
import tableSortReducer from './sort';
import lastUIDReducer from './findLastPlayer';

// Root reducer 생성
const rootReducer = combineReducers({
  filters: filtersReducer,
  table: tableSortReducer,
  lastUID: lastUIDReducer,
});

// Store의 전체 상태에 대한 타입 정의
export type RootState = ReturnType<typeof rootReducer>;

// Store 생성
const store = createStore(rootReducer);

export default store;
