import createSelectors from './createSelectors';
import createReducer from './createReducer';
import createDispatchers from './createDispatchers';

export default function createSlice(slice, fields) {
  fields = fields.map(field => ({
    ...field,
    properties: flatten(field.properties)
  }));
  return {
    reducer: createReducer(slice, fields),
    dispatchers: createDispatchers(slice, fields),
    selectors: createSelectors(slice, fields)
  };
}

function flatten(list) {
  return list.reduce(
    (arr, elem) => (Array.isArray(elem) ? [...arr, ...elem] : [...arr, elem]),
    []
  );
}
