class Property {
  constructor(type, reducer, actionCreator) {
    this.reducer = reducer;
    this.type = type;
    this.actionCreator = actionCreator;
  }

  createActionCreator(slice) {
    return (...args) => ({
      type: this.getScopedType(slice),
      ...this.actionCreator(...args)
    });
  }

  getScopedType(slice) {
    return `${slice}/${this.type}`;
  }

  createReducer(slice) {
    return (state, action) => {
      if (action.type === this.getScopedType(slice)) {
        return this.reducer(state, action);
      }
      return state;
    };
  }

  equals(otherProperty) {
    return this.type === otherProperty.type;
  }
}

export default Property;
