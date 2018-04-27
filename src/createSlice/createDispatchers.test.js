import chai from 'chai';
import createDispatchers from './createDispatchers';
import settable from '../properties/settable';

chai.should();

describe('createDispatchers()', () => {
  const slice = 'slice';
  const key = 'exampleKey',
    initialState = 'initial',
    key1 = 'exampleKey1',
    initialState1 = 'initial1';

  it('createDispatchers creates dispatchers for the expected keys', () => {
    const dispatchers = createDispatchers(slice, [
      { key, initialState, properties: [settable] },
      { key: key1, initialState: initialState1, properties: [settable] }
    ]);
    dispatchers.should.equal('setExampleKey');
    dispatchers.should.contain('setExampleKey');
    dispatchers.should.contain('setExampleKey1');
  });

  it('createDispatchers dispatches the correct action', () => {
    const dispatchers = createDispatchers(slice, [
      { key, initialState, properties: [settable] },
      { key: key1, initialState: initialState1, properties: [settable] }
    ]);
    const dispatchFunc = action => {
      action.should.include({ type: `${slice}/SET`, value: 'val', key });
    };
    const props = dispatchers.setExampleKey(dispatchFunc);
    props.setExampleKeyProp('val');
  });
});
