import chai from 'chai';
import createSlice from './createSlice';
import settable from '../properties/settable';
import { fromJS } from 'immutable';

chai.should();

// describe('createSlice()', () => {
//   const slice = 'slice';
//   const key = 'exampleKey',
//     initialState = 'initial',
//     key1 = 'exampleKey1',
//     initialState1 = 'initial1';
//   const { reducer, selectors, dispatchers } = createSlice(slice, [
//     { key: 'exampleKey', initialState: 0, properties: [settable] },
//     { key: 'exampleKey1', initialState: false, properties: [toggleable] }
//   ]);
//
//   it('createSlice() gives correct initial state', () => {
//     const state =
//   });
// });

//
// // dispatchers = {
// //   setExampleKey: dispatch => value =>
// //     dispatch(setAtionCreator(value, 'exampleKey')),
// //   setExampleKey1: dispatch => () => dispatch(toggleActionCreator()),
// //   setExampleKey1: dispatch => (...args) =>
// //     dispatch(property.actionCreator(...args))
// // };
//
// // transform { key: 'exampleKey', initialState: 0, properties: [settable] }
// // into setExampleKey: dispatch => value => dispatch({type: 'SET',key: 'exampleKey', value})
// // 'setExampleKey' = createDispatcherName('exampleKey')
// // d = dispatch => (...args) => dispatch(someActionCreator(...args))
//
// // it('reducer returns expected initialState', () => {
// //   const { reducer } = createSlice(slice, [
// //     { key, initialState, properties: [settable] },
// //     { key1, initialState1, properties: [settable] }
// //   ]);
// //   const returnedInitialState = reducer(undefined, { type: 'NO_MATCHES' });
// //   returnedInitialState.get(key).should.equal(initialState);
// //   returnedInitialState.get(key1).should.equal(initialState1);
// // });
// //
// // it('createSlice reducer works as expected with multiple stateObject', () => {
// //   const { reducer } = createSlice(slice, [
// //     { key, initialState, properties: [settable] },
// //     { key1, initialState1, properties: [settable] }
// //   ]);
// //
// //   const state = reducer(undefined, {
// //     type: `${slice}/${settable.type}`,
// //     key,
// //     value: 'coolValue'
// //   });
// //   state
// //     .keySeq()
// //     .toArray()[5]
// //     .should.equal('key');
// //   state.get('key').should.equal('coolValue');
// //   state.get(key1).should.equal(initialState1);
// // });
// // });
