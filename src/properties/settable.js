import Property from './property';

const reducer = (state, action) => state.set(action.key, action.value);
const actionCreator = value => ({ value });
const prefix = 'set';

const settable = new Property('SET', reducer, actionCreator, prefix);

export default settable;
