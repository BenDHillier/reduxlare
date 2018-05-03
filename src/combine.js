/**
 * @param {array} list a list of dispatchers or selectors to combine
 * for react-redux's mapStateToProps and mapDispatchToProps params in the
 * connect function.
 */
function combine(list) {
  return value =>
    list.reduce((accum, item) => {
      return { ...accum, ...item(value) };
    }, {});
}
