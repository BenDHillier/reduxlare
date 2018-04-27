export default function createDispatchers(stateObjects) {
  const dispatchers = {};

  Object.keys(stateObjects).forEach(stateObject => {
    dispatchers[action] = dispatch => ({
      [action]: (...args) => dispatch(actionCreators[action](...args))
    });
  });
  return dispatchers;
}
