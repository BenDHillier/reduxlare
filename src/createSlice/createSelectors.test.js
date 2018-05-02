import createSelectors from './createSelectors';

describe('createSelectors()', () => {
  const slice = 'slice',
    key = 'exampleKey',
    key1 = 'exampleKey1',
    key2 = 'exampleKey2',
    nestedKey = 'nestedKey';

  const selectors = createSelectors(slice, [
    { key },
    { key: key1 },
    { key: key2, fields: [{ key: nestedKey }] },
  ]);

  it('createSelectors creates selectors for the expected keys', () => {
    selectors[key].get.should.be.a('function');
    selectors[key1].get.should.be.a('function');
    selectors[key2].get.should.be.a('function');
    selectors[key2][nestedKey].get.should.be.a('function');
  });

  it('createSelectors grabs the correct state', () => {
    const state = {
      slice: {
        [key]: 'value',
        [key1]: 'value1',
        [key2]: { [nestedKey]: 'nestedValue' },
      },
    };
    const props = {
      ...selectors[key].get(state),
      ...selectors[key1].get(state),
      ...selectors[key2].get(state),
      ...selectors[key2][nestedKey].get(state),
    };
    props[key].should.equal('value');
    props[key1].should.equal('value1');
    props[key2].should.include({ [nestedKey]: 'nestedValue' });
    props[key2][nestedKey].should.equal('nestedValue');
  });
});
