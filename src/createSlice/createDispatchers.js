export default function createDispatchers(sliceName, fields) {
  return fields.reduce((dispatchers, field) => {
    return { ...dispatchers, ...createDispatchersForField(sliceName, field) };
  }, {});
  return dispatchers;
}

function createDispatchersForField(sliceName, field) {
  return field.properties.reduce((dispatchers, property) => {
    const actionCreator = property.createActionCreator(sliceName, field.key);
    const action = property.createDispatcherName(field.key);
    return {
      ...dispatchers,
      [action]: dispatch => ({
        [action]: (...args) => dispatch(actionCreator(...args))
      })
    };
  }, {});
}
