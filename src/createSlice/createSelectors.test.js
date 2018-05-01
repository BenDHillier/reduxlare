import createSelectors from './createSelectors';

describe('createSelectors()', () => {
  const slice = 'slice',
    key = 'exampleKey',
    key1 = 'exampleKey1';
  const selectors = createSelectors(slice, [{ key }, { key: key1 }]);
  it('createSelectors creates selectors for the expected keys', () => {
    selectors[key].should.be.a('function');
    selectors[key1].should.be.a('function');
  });

  it('createSelectors grabs the correct state', () => {
    const state = { slice: { exampleKey: 'value', [key1]: 'value1' } };
    const props = {
      ...selectors[key](state),
      ...selectors[key1](state)
    };
    props[key].should.equal('value');
    props[key1].should.equal('value1');
  });
});
