import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', () => {

  describe('immutability', () => {
    function increment(currentState) {
      return currentState + 1;
    }

    it('is immutable', () => {
      let state = 42;
      let nextState = increment(state);
      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });
  });

  describe('A list', () => {

    function addAlbum(currentState, album) {
      return currentState.push(album);
    }

    it('is immutable', () => {
      let state = List.of('Human', 'Individual Thought Patterns');
      let nextState = addAlbum(state, 'Symbolic');
      expect(nextState).to.equal(List.of(
        'Human',
        'Individual Thought Patterns',
        'Symbolic'
      ));
      expect(state).to.equal(List.of(
        'Human',
        'Individual Thought Patterns'
      ));
    });
  });

  describe('A tree, nested data structures', () => {
     
    function addAlbum(currentState, album) {
      return currentState.set(
        'albums', currentState.get('albums').push(album)
      );
    }

    it('is immutable', () => {
      let state = Map({
        albums: List.of('Human', 'Individual Thought Patterns')
       });
      let nextState = addAlbum(state, 'Symbolic');
      expect(nextState).to.equal(Map({
        'albums': List.of(
          'Human',
          'Individual Thought Patterns',
          'Symbolic'
        )}
      ));
      expect(state).to.equal(Map({
        'albums': List.of(
          'Human',
          'Individual Thought Patterns'
        )}
      ));
    });
  });

  describe('using immutable helpers', () => {
     
    function addAlbum(currentState, album) {
      return currentState.update('albums', albums => albums.push(album));
    }

    it('is immutable', () => {
      let state = Map({
        albums: List.of('Human', 'Individual Thought Patterns')
       });
      let nextState = addAlbum(state, 'Symbolic');
      expect(nextState).to.equal(Map({
        'albums': List.of(
          'Human',
          'Individual Thought Patterns',
          'Symbolic'
        )}
      ));
      expect(state).to.equal(Map({
        'albums': List.of(
          'Human',
          'Individual Thought Patterns'
        )}
      ));
    });
  });

});
