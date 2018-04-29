import createStates from './createStates';
import createReducer from './createReducer';
import createDispatchers from './createDispatchers';

export default function createSlice(slice, fields) {
  return {
    reducer: createReducer(slice, fields),
    dispatchers: createDispatchers(slice, fields),
    selectors: createSelectors(slice, fields)
  };
}
