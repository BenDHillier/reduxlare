export default function createDispatchers(actionCreators) {
  const dispatchers = {};

  Object.keys(actionCreators).forEach(action => {
    dispatchers[action] = dispatch => ({
      [action]: (...args) => dispatch(actionCreators[action](...args))
    });
  });
  return dispatchers;
}
