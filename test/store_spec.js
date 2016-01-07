import {Map, fromJS, List} from 'immutable';
import {expect} from 'chai';
import makeStore from '../src/store';

describe('store', () => {
  it('is a redux store', () => {
    const store = makeStore();
    expect(store.getState()).to.equal(Map());
    store.dispatch({
      type: 'SET_ENTRIES',
      entries: ['Human', 'Leprosy']
    });
    expect(store.getState()).to.equal(fromJS({
      entries: ['Human', 'Leprosy']
    }));
  });
});
