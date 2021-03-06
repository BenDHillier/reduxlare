import Property from '../property';
import produce from 'immer';

const reducer = (state, action) => {
  if (Array.isArray(state[action.key])) {
    return produce(state, draftState => {
      if (state[action.key].length > action.index) {
        state[action.key][action.index] = action.value;
      } else {
        throw new Error(
          `can't modify array at index ${
            action.index
          } because array is too short`
        );
      }
    });
  } else {
    console.error(
      `the field ${action.key} is not a list. Unable to perform action ${
        action.type
      }`
    );
  }
};
const actionCreator = (value, index) => ({ value, index });
const prefix = 'setAt';

const settableAtIndex = new Property(
  'SET_AT_INDEX',
  reducer,
  actionCreator,
  prefix
);

export default settableAtIndex;
