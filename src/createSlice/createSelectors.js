const createSelectorForField = (sliceName, field) => {
  return state => ({
    [field.key]: state[sliceName].get(field.key)
  });
};

export default function createSelectors(sliceName, fields) {
  return fields.reduce((selectors, field) => {
    return {
      ...selectors,
      [field.key]: createSelectorForField(sliceName, field)
    };
  }, {});
}
