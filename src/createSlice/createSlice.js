import createTypes from './createTypes';
import createStates from './createStates';
import createReducer from './createReducer';
import createDispatchers from './createDispatchers';
import createActionCreators from './createActionCreators';
import { fromJS } from 'immutable';

export default function createSlice(slice, fields) {
  return {
    reducer: createReducer(slice, fields),
    dispatchers: createDispatchers(slice, fields),
    selectors: createSelectors(slice, fields)
  };
}
