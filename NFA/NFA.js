class NFA {
  constructor(tuple, epsilonHandler) {
    this.delta = tuple.delta;
    this.startingState = tuple['start-state'];
    this.acceptableStates = tuple['final-states'];
    this.epsilonHandler = epsilonHandler;
  }

  getEpsilonStates(states) {
    return this.epsilonHandler.findEpsilonStates(states);
  }

  setUpMachine() {
    this.currentStates = this.getEpsilonStates([this.startingState]);
  }

  getNextStates(state, alphabet) {
    let hasNextStates = this.delta[state] && this.delta[state][alphabet];
    return hasNextStates ? this.delta[state][alphabet] : "";
  }

  getCurrentStates(alphabet, states = []) {
    this.currentStates.map(state => {
      states = states.concat(this.getNextStates(state, alphabet));
    });
    return this.getEpsilonStates(states);
  }

  updateCurrentStates(alphabet) {
    this.currentStates = this.getCurrentStates(alphabet);
  }

  doesAccept(alphabets) {
    let alphabetsArray = alphabets.split("");
    let acceptableStates = this.acceptableStates;
    this.setUpMachine();
    alphabetsArray.map(alphabet=>this.updateCurrentStates(alphabet));
    return this.currentStates.some(state => acceptableStates.includes(state));
  }
}

module.exports = NFA;
