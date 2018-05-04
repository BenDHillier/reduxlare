export default function createReducer(slice, fields) {
  const initialState = combineInitialStates(fields);
  const propertyList = getPropertyList(fields);
  const reducerList = getReducerList(slice, propertyList);
  const reducer = (state = initialState, action) => {
    return reducerList.reduce(
      (currentState, aReducer) => aReducer(currentState, action),
      state
    );
  };
  return reducer;
}

function getPropertyList(fields) {
  const flatPropertyList = fields.reduce((list, field) => {
    if (field.properties) {
      return [...list, ...field.properties];
    } else {
      return list;
    }
  }, []);
  return flatPropertyList.reduce((list, property) => {
    const listContainsProperty =
      typeof list.find(property.equals) !== 'undefined';

    if (listContainsProperty) {
      return list;
    } else {
      return [...list, property];
    }
  }, []);
}

function getReducerList(slice, propertyList) {
  return propertyList.map(property => property.createReducer(slice));
}

function combineInitialStates(fields) {
  return fields.reduce(
    (currentInitialState, field) => ({
      ...currentInitialState,
      [field.key]: field.fields
        ? combineInitialStates(field.fields)
        : field.initialState,
    }),
    {}
  );
}
