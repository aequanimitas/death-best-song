import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('Application logic', () => {
  it('converts to immutable', () => {
    const state = Map();
    const entries = ['Human', 'Individual Thought Patterns'];
    const nextState = setEntries(state, entries);
    expect(nextState).to.equal(Map({
      entries: List.of('Human', 'Individual Thought Patterns')
    }));
  });

  describe('next', () => {
    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Human', 'Individual Thought Patterns', 'Leprosy')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Human', 'Individual Thought Patterns')
        }),
        entries: List.of('Leprosy')
      }));
    });

    it('puts winner of current vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Human', 'Individual Thought Patterns'),
          tally: Map({
            'Human': 4,
            'Individual Thought Patterns': 2
          })
        }),
        entries: List.of('Symbolic', 'The Sound of Perseverance', 'Leprosy', 'Spiritual Healing', 'Screamy Bloody Gore')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Symbolic', 'The Sound of Perseverance') 
        }),
        entries: List.of('Leprosy', 'Spiritual Healing', 'Screamy Bloody Gore', 'Human')
      }));
    });

    it('iputs both from tied vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Human', 'Individual Thought Patterns'),
          tally: Map({
            'Human': 3,
            'Individual Thought Patterns': 3
          })
        }),
        entries: List.of('Symbolic', 'The Sound of Perseverance', 'Leprosy', 'Spiritual Healing', 'Screamy Bloody Gore')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Symbolic', 'The Sound of Perseverance') 
        }),
        entries: List.of('Leprosy', 'Spiritual Healing', 'Screamy Bloody Gore', 'Human', 'Individual Thought Patterns')
      }));
    });

    it('marks winner if there is only one entry left', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Human', 'Individual Thought Patterns'),
          tally: Map({
            'Human': 4,
            'Individual Thought Patterns': 3
          })
        }),
        entries: List()
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        winner: 'Human'
      }));
    });
  });

  describe('vote', () => {
    it('creates a tally for the voted entry', () => {
      const state = Map({
        pair: List.of('Human', 'Individual Thought Patterns')
      });
      const nextState = vote(state, 'Human');
      console.log(nextState);
      expect(nextState).to.equal(Map({
        pair: List.of('Human', 'Individual Thought Patterns'),
        tally: Map({
          'Human': 1
        })
      }));
    });

    it('adds to existing tally for the voted entry', () => {
      const state = Map({
        pair: List.of('Human', 'Individual Thought Patterns'),
        tally: Map({
          'Human': 3,
          'Individual Thought Patterns': 2
        })
      });
      const nextState = vote(state, 'Human');
      expect(nextState).to.equal(Map({
        pair: List.of('Human', 'Individual Thought Patterns'),
        tally: Map({
          'Human': 4,
          'Individual Thought Patterns': 2
        })
       }));
     });
  });

});
