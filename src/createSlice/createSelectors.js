const createSelectorForField = (sliceName, field) => {
  return {
    ...createSelectors(sliceName, field.fields),
    get: state => ({
      [field.key]: state[sliceName][field.key],
    }),
  };
};

export default function createSelectors(sliceName, fields) {
  if (typeof fields !== 'undefined') {
    return fields.reduce((selectors, field) => {
      return {
        ...selectors,
        [field.key]: createSelectorForField(sliceName, field),
      };
    }, {});
  } else {
    return null;
  }
}
