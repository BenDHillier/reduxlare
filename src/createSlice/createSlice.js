import createTypes from './createTypes';
import createStates from './createStates';
import createReducer from './createReducer';
import createDispatchers from './createDispatchers';
import createActionCreators from './createActionCreators';

export default function createSlice(slice, stateObjects) {
  return { reducer: () => {} };
}

// export default function createSlice(slice, fields, initialState) {
//   const types = createTypes(slice);
//   const actionCreators = createActionCreators(types, fields);
//   const reducer = createReducer(types, initialState);
//   const dispatchers = createDispatchers(actionCreators);
//   const states = createStates(fields, slice);
//   return { reducer, dispatchers, states, initialState, slice };
// }
