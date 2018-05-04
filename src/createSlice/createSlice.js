import createSelectors from './createSelectors';
import createReducer from './createReducer';
import createDispatchers from './createDispatchers';

export default function createSlice(slice, fields) {
  validateFields(fields);
  fields = fields.map(field => ({
    ...field,
    properties: flatten(field.properties),
  }));
  return {
    reducer: createReducer(slice, fields),
    dispatchers: createDispatchers(slice, fields),
    selectors: createSelectors(slice, fields),
  };
}

function flatten(properties) {
  if (properties) {
    return properties.reduce(
      (arr, elem) => (Array.isArray(elem) ? [...arr, ...elem] : [...arr, elem]),
      []
    );
  } else {
    return [];
  }
}

function validateFields(fields) {
  fields.forEach(field => {
    if (isDefined(field.initialState) && isDefined(field.fields)) {
      throw new Error(
        `ambiguous initialState for ${
          field.key
        }. You can only have one of 'initialState' and 'fields' for a given field`
      );
    }
    if (
      !isDefined(field.fields) &&
      (!isDefined(field.properties) || field.properties.length === 0)
    ) {
      throw new Error(
        `Field ${
          field.key
        } has no properties and no fields. Any field without nested fields must have at least one proerty`
      );
    }
  });
}

function isDefined(value) {
  return typeof value !== 'undefined';
}
