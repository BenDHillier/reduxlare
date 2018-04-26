import { fromJS } from 'immutable';

export default function createReducer(slice, stateObjects) {
  const initialState = combineInitialState(stateObjects);
  const propertyList = getPropertyList(stateObjects);
  const reducerList = getReducerList(slice, propertyList);
  const reducer = (state = fromJS(initialState), action) => {
    if (state === null) {
      throw new Error('holy shit');
    }
    return reducerList.reduce(
      (currentState, aReducer) => aReducer(currentState, action),
      state
    );
  };
  return { reducer };
}

function getPropertyList(stateObjects) {
  const flatPropertyList = stateObjects.reduce(
    (list, stateObject) => [...list, ...stateObject.properties],
    []
  );
  return flatPropertyList.reduce((list, property) => {
    const listContainsProperty =
      typeof list.find(element => property.equals(element)) !== 'undefined';
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

export function combineInitialState(stateObjects) {
  return stateObjects.reduce(
    (currentInitialState, stateObject) => ({
      ...currentInitialState,
      [stateObject.key]: stateObject.initialState
    }),
    {}
  );
}
