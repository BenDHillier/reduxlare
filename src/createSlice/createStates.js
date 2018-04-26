const createStateFor = (field, slice) => {
  return state => ({
    [field]: state[slice][field]
  });
};

export default function createStates(fields, slice) {
  let states = {};
  fields.forEach(field => {
    states[field] = createStateFor(field, slice);
  });
  return states;
}
