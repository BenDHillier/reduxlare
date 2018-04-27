class Property {
  constructor(type, reducer, actionCreator, prefix) {
    this.reducer = reducer;
    this.type = type;
    this.actionCreator = (...args) => ({
      ...actionCreator(...args),
      type: this.getScopedType(slice)
    });
    this.prefix = prefix;
  }
  // need to define how to create an action creator for a specific property
  createActionCreator(slice) {
    return;
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

  createDispatcherName(key) {
    if (this.prefix && this.prefix.length !== 0) {
      return `${this.prefix}${key[0].toUpperCase()}${key.slice(1)}`;
    } else {
      return key;
    }
  }

  equals(otherProperty) {
    return this.type === otherProperty.type;
  }
}

export default Property;
