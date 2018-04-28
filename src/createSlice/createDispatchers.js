export default function createDispatchers(sliceName, fields) {
  const dispatchers = {};
  // throw new Error(fields[0].properties[0].createDispatcherName('yo'));
  fields.forEach(field => {
    const property = field.properties[0];
    const actionCreator = property.createActionCreator(sliceName, field.key);
    const action = property.createDispatcherName(field.key);
    dispatchers[action] = dispatch => ({
      [action]: (...args) => dispatch(actionCreator(...args))
    });
  });
  return dispatchers;
}

// turn actionCreator into dispatch => value => dispatch(actionCreator(value))
