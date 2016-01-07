import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {type: 'SET_ENTRIES', entries: ['Human', 'Leprosy']}
    const nextState = reducer(initialState, action);
    console.log(nextState);
    expect(nextState).to.equal(fromJS({
      entries: ['Human', 'Leprosy']
    }));
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Human', 'Leprosy']
      },
      entries: []
    });
    const action = {type: 'NEXT'}
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote:{
        pair: ['Human', 'Leprosy']
      },
      entries: []
    }));
  });

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Human', 'Leprosy']
      },
      entries: []
    });
    const nextState = reducer(initialState, {type: 'VOTE', entry: 'Human'});
    expect(nextState).to.equal(fromJS({
      vote:{
        pair: ['Human', 'Leprosy'],
        tally: {'Human': 1}
      },
      entries: []
    }));
  });

  it('has an initial state', () => {
    const action = {type: 'SET_ENTRIES', entries: ['Human']};
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      entries: ['Human']
    }));
  });

  it('can be used with reduce', () => {
    const actions = [
      {type: 'SET_ENTRIES', entries: ['Human', 'Leprosy']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'Human'},
      {type: 'VOTE', entry: 'Leprosy'},
      {type: 'VOTE', entry: 'Human'},
      {type: 'NEXT'}
    ];
    const finalState = actions.reduce(reducer, Map());
    console.log(finalState);
    expect(finalState).to.equal(fromJS({
      winner: 'Human'
    }));
  });
});
