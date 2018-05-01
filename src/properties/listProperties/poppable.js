import Property from '../property';
import produce from 'immer';

const reducer = (state, action) => {
  if (Array.isArray(state[action.key])) {
    return produce(state, draftState => {
      draftState[action.key].pop();
    });
  } else {
    console.error(
      `the field ${action.key} is not a list. Unable to perform action ${
        action.type
      }`
    );
  }
};
const actionCreator = () => ({});
const prefix = 'pop';

const poppable = new Property('POP', reducer, actionCreator, prefix);

export default poppable;
