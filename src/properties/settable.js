import Property from './property';

const reducer = (state, action) => state.set(action.field, action.value);

const actionCreator = (field, value) => ({ field, value });

const settable = new Property('SET', reducer, actionCreator);

export default settable;
