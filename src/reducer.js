import {setEntries, next, vote, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    case 'NEXT':
      return next(state, action.entry);
    case 'VOTE':
      console.log('inside server reducer');
      return state.update('vote', voteState => vote(voteState, action.entry));
  }
  return state;
}
