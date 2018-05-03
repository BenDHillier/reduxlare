# Reduxlare

Reduxlare is a declarative library for redux. It allows you to create your
reducers, action creators and selectors declaratively. The nicest thing about
redux is using it after it's already set up. Setting it up initially can be
a pain and refactoring can also be difficult. Reduxlare makes the initial
setup and refactoring simple. The main idea behind Reduxlare is that every
field in your state has properties that you use to modify the state.

## Usage

The main point of entry for reduxlare is the `createSlice()` method. You use `createSlice()` to create your reducer, selectors and dispatchers for a slice of your state. You then add your reducer to the `combineReducers()` method provided by redux.

```
// slice.js

import { createSlice, incrementable } from 'reduxlare';

/*
* createSlice takes two arguments. The name of the slice, and a list of fields
* Each field contains a key, an initialState, and a list of properties.
* Properties are used to generate dispatchers for the field.
*/
const { reducer, dispatchers, selectors } = createSlice('someSlice', [
  { key: 'counter', initialState: 0, properties: [incrementable] },
]);

export { reducer, dispatchers, selectors };
```
```
// store.js

import { createStore, combineReducers } from 'redux';
import { reducer } from './slice';

const store = createStore(combineReducers({ someSlice: reducer }));
```
```
// SomeComponent.jsx

import { connect } from 'react-redux';
import { combine } from 'reduxlare';
import { dispatchers, selectors } from './slice';

const SomeComponent = ({ counter, incrementCounter, decrementCounter }) => {
  <div>
    <p>{counter}</p>
    <button onClick={incrementCounter}>increment</button>
    <button onClick={decrementCounter}>increment</button>
  </div>;
};

/*
* Use the combine method provided by reduxlare if you want to use
* more than one selector or dispatcher in your component
*/
export default connect(
  selectors.counter,
  combine(
    dispatchers.counter.increment,
    dispatchers.counter.decrement
  )
)(SomeComponent);
```

## Nested Fields

```
const { reducer, dispatchers, selectors } = createSlice('someSlice', [
  {
    key: 'parent',
    properties: [settable]
    fields: [{ key: 'child', initialValue: 'hey', properties: [settable] }],
  },
]);

// set parent value
dispatchers.parent.set

// set child value
dispatchers.parent.child.set

// get parent value
selectors.parent

//get child value
selectors.parent.child

```

## Properties

Each field has a list of properties. Properties describe how a field can be
changed. Each property provides a method to your field in `dispatchers`
returned by `createSlice()`. Reduxlare provides several properties for you
 to use in your application. You can also define your own properties by using
 the `Property` class provided by Reduxlare, though you hopefully shouldn't
 have to do that too often.

### List of Properties
#### Settable

`import { settable } from 'reduxlare'`

`dispatchers.key.set`

`props.setKey(value)`

The `setKey` function passed into a components props takes a parameter called
value. `setKey` will set the key in your redux store to the
value parameter provided.

#### Toggleable

`toggleable` is used for boolean values to toggle between `true` and `false`

`import { toggleable } from 'reduxlare'`

`dispatchers.key.toggle`

`props.toggleKey()`

#### ListProperties

`listProperties` bundles together the `poppable`, `pushable`, and
`settableAtIndex` properties. You can also use the individual properties by
themselves for more fine grained control.

`import { listProperties } from 'reduxlare'`

`dispatchers.key.pop`

`dispatchers.key.push`

`dispatchers.key.setAtIndex`


`props.popKey()`

Removes the element at the last index of the list.

`props.pushKey(value)`

Pushes `value` to the end of the list.

`props.setAtIndexKey(value, index)`

Sets the element at `index` in the list to `value`. Throws an error if there is
no element at `index`.

#### AsyncProperty

Coming soon.

## Creating your own Properties

```
import { Property } from 'reduxlare';

const customProperty = new Property(actionType, reducer, actionCreator, prefix);

export default customProperty;
```

`actionType` is the action type that will be dispatched from the corresponding
dispatcher function generated when a field has the custom property.

`reducer` is the reducer used for `actionType`. Note that you do not have to
do the usual check that `action.type === actionType` as you do in vanilla redux.

`actionCreator` is a function that returns an action. It directly corresponds
to the dispatch function passed in as a prop when you connect your component.
Note that unlike action creators in vanilla redux, `actionCreator` does not
need you to specify an action type or a fields key.

`prefix` is the prefix for the dispatch function passed in as a prop, as well as
the name of the function in the `dispatchers` return from `createSlice()`. For
example, `settable`'s prefix is `'set'` and we have `dispatchers.key.set`, and
`props.setKey()`.
