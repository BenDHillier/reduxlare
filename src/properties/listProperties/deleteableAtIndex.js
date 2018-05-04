import Property from '../property';
import produce from 'immer';

const reducer = (state, action) => {
  if (Array.isArray(state[action.key])) {
    return produce(state, draftState => {
      if (state[action.key].length > action.index) {
        state[action.key].splice(action.index, 1);
      } else {
        throw new Error(
          `can't delete element at index ${
            action.index
          } because it does not exist`
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
const actionCreator = index => ({ index });
const prefix = 'deleteAt';

const deleteableAtIndex = new Property(
  'DELETE_AT_INDEX',
  reducer,
  actionCreator,
  prefix
);

export default deleteableAtIndex;
