import createTypes from './createTypes';
import createStates from './createStates';
import createReducer from './createReducer';
import createDispatchers from './createDispatchers';
import createActionCreators from './createActionCreators';
import { fromJS } from 'immutable';

export default function createSlice(slice, stateObjects) {
  return { reducer: createReducer(slice, stateObjects) };
}

function combineSlice(seperatedSlice) {
  const initialState = seperatedSlice.reduce(
    (currentInitialState, individualSlice) => ({
      ...currentInitialState,
      [individualSlice.key]: individualSlice.initialState
    })
  );
  const reducer = (state = fromJS(initialState), action) =>
    seperatedSlice.reduce(
      (currentState, individualSlice) =>
        individualSlice.reducer(currentState, action),
      state
    );
  return { reducer };
}

// export default function createSlice(slice, fields, initialState) {
//   const types = createTypes(slice);
//   const actionCreators = createActionCreators(types, fields);
//   const reducer = createReducer(types, initialState);
//   const dispatchers = createDispatchers(actionCreators);
//   const states = createStates(fields, slice);
//   return { reducer, dispatchers, states, initialState, slice };
// }
