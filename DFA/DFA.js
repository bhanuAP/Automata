class DFA {
  constructor(tuple) {
    this.tuple = tuple;
    this.states = tuple.states;
    this.alphabets = tuple.alphabets;
    this.delta = tuple.delta;
    this.currentState = tuple['start-state'];
    this.finalStates = tuple['final-states'];
  }

  doesAccept(alphabets) {
    let result = this.isAcceptable(alphabets);
    this.currentState = this.tuple['start-state'];
    return result;
  }

  isAcceptable(alphabets, index = 0) {
    if(alphabets.length == index) {
      return this.finalStates.includes(this.currentState);
    }
    this.currentState = this.delta[this.currentState][alphabets[index]];
    return this.isAcceptable(alphabets, ++index);
  }
}

module.exports = DFA;
