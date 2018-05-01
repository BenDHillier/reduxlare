import createDispatchers from './createDispatchers';
import settable from '../properties/settable';
import toggleable from '../properties/toggleable';

describe('createDispatchers()', () => {
  const slice = 'slice';
  const key = 'exampleKey',
    initialState = 'initial',
    key1 = 'exampleKey1',
    initialState1 = 'initial1';
  const dispatchers = createDispatchers(slice, [
    { key, initialState, properties: [settable] },
    {
      key: key1,
      initialState: initialState1,
      properties: [settable, toggleable]
    }
  ]);
  it('createDispatchers creates dispatchers for the expected keys', () => {
    dispatchers.setExampleKey.should.be.a('function');
    dispatchers.setExampleKey1.should.be.a('function');
    dispatchers.toggleExampleKey1.should.be.a('function');
  });

  it('createDispatchers dispatches the correct action', () => {
    const setExampleKeyDispatch = action => {
      action.should.include({ type: `${slice}/SET`, value: 'val', key });
    };
    const toggleExampleKey1Dispatch = action => {
      action.should.include({ type: `${slice}/TOGGLE`, key: key1 });
    };
    dispatchers.setExampleKey(setExampleKeyDispatch).setExampleKey('val');
    dispatchers
      .toggleExampleKey1(toggleExampleKey1Dispatch)
      .toggleExampleKey1();
  });
});
