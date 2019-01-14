class DFA {
  constructor(tuple) {
    this.alphabets = tuple.alphabets;
    this.delta = tuple.delta;
    this.startingState = tuple['start-state'];
    this.acceptableStates = tuple['final-states'];
  }

  doesAccept(alphabets) {
    this.currentState = this.startingState;
    let result = this.checkAcceptance(alphabets);
    return result;
  }

  checkAcceptance(alphabets, index = 0) {
    if(alphabets.length == index) {
      return this.acceptableStates.includes(this.currentState);
    }
    this.currentState = this.delta[this.currentState][alphabets[index]];
    return this.checkAcceptance(alphabets, ++index);
  }
}

module.exports = DFA;
