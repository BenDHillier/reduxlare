export default function createReducer(slice, stateObjects) {
  const initialState = combineInitialStates(stateObjects);
  const propertyList = getPropertyList(stateObjects);
  const reducerList = getReducerList(slice, propertyList);
  const reducer = (state = initialState, action) => {
    return reducerList.reduce(
      (currentState, aReducer) => aReducer(currentState, action),
      state
    );
  };
  return reducer;
}

function getPropertyList(stateObjects) {
  let a = 0;

  const flatPropertyList = stateObjects.reduce((list, stateObject) => {
    return [...list, ...stateObject.properties];
  }, []);
  return flatPropertyList.reduce((list, property) => {
    if (typeof property === 'undefined') {
    }
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

function combineInitialStates(stateObjects) {
  return stateObjects.reduce(
    (currentInitialState, stateObject) => ({
      ...currentInitialState,
      [stateObject.key]: stateObject.initialState
    }),
    {}
  );
}
