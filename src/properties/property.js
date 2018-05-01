class Property {
  constructor(type, reducer, actionCreator, prefix) {
    this.reducer = reducer;
    this.type = type;
    this.actionCreator = (sliceName, key, ...args) => ({
      ...actionCreator(...args),
      type: this.getScopedType(sliceName),
      key
    });
    this.prefix = prefix;
    this.equals = this.equals.bind(this);
  }

  createActionCreator(sliceName, key) {
    return (...args) => this.actionCreator(sliceName, key, ...args);
  }

  getScopedType(sliceName) {
    return `${sliceName}/${this.type}`;
  }

  createReducer(sliceName) {
    return (state, action) => {
      if (action.type === this.getScopedType(sliceName)) {
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
    return otherProperty && this.type === otherProperty.type;
  }
}

export default Property;
