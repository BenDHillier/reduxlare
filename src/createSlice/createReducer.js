export default function createReducer(
  { SET, UPDATE_MULTIPLE_FIELDS, TOGGLE_FIELD },
  initialState
) {
  return (state = initialState, action) => {
    if (action.type === SET) {
      state = state.set(action.field, action.value);
    }
    if (action.type === UPDATE_MULTIPLE_FIELDS) {
      action.FIELDs.forEach(
        FIELD => (state = state.set(FIELD.field, FIELD.value))
      );
    }
    if (action.type === TOGGLE_FIELD) {
      state = state.set(action.field, !state.get(action.field));
    }
    return state;
  };
}
