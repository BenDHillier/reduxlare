import Property from './property';

const reducer = (state, action) =>
  state.set(action.key, !state.get(action.key));
const actionCreator = () => ({});
const prefix = 'toggle';

const toggleable = new Property('TOGGLE', reducer, actionCreator, prefix);

export default toggleable;
