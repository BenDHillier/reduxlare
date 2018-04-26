import Property from './property';

const reducer = (state, action) => state.set(action.key, action.value);

const actionCreator = (key, value) => ({ key, value });

const settable = new Property('SET', reducer, actionCreator);

export default settable;
