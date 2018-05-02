import createDispatchers from './createDispatchers';
import settable from '../properties/settable';
import toggleable from '../properties/toggleable';

describe('createDispatchers()', () => {
  const slice = 'slice';
  const key = 'exampleKey',
    initialState = 'initial',
    key1 = 'exampleKey1',
    initialState1 = 'initial1',
    key2 = 'exampleKey2',
    nestedKey = 'nestedKey',
    nestedState = 'hey';
  const dispatchers = createDispatchers(slice, [
    { key, initialState, properties: [settable] },
    {
      key: key1,
      initialState: initialState1,
      properties: [settable, toggleable],
    },
    {
      key: key2,
      fields: [
        { key: nestedKey, initialState: nestedState, properties: [settable] },
      ],
      properties: [],
    },
  ]);

  it('createDispatchers creates dispatchers for the expected keys', () => {
    dispatchers[key].set.should.be.a('function');
    dispatchers[key1].set.should.be.a('function');
    dispatchers[key1].toggle.should.be.a('function');
    dispatchers[key2][nestedKey].set.should.be.a('function');
  });

  it('createDispatchers dispatches the correct action', () => {
    const setExampleKeyDispatch = action => {
      action.should.include({ type: `${slice}/SET`, value: 'val', key });
    };
    const toggleExampleKey1Dispatch = action => {
      action.should.include({ type: `${slice}/TOGGLE`, key: key1 });
    };
    dispatchers[key].set(setExampleKeyDispatch).setExampleKey('val');
    dispatchers[key1].toggle(toggleExampleKey1Dispatch).toggleExampleKey1();
  });
});
