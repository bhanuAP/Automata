class NFA {
  constructor(tuple, epsilonHandler) {
    this.delta = tuple.delta;
    this.startingState = tuple['start-state'];
    this.acceptableStates = tuple['final-states'];
    this.epsilonHandler = epsilonHandler;
  }

  doesAccept(word) {
    let acceptableStates = this.acceptableStates;
    this.currentStates = [this.startingState];
    this.currentStates = this.epsilonHandler.findEpsilonStates(this.currentStates);
    word.split("").forEach(alphabet => {
      this.currentStates = this.getNextStates(alphabet);
    });
    this.currentStates = this.epsilonHandler.findEpsilonStates(this.currentStates);
    return this.currentStates.some(state => acceptableStates.includes(state));
  }

  getNextStates(alphabet) {
    let newCurrentStates = [];
    this.currentStates.forEach(state => {
      if(alphabet == "") {
        newCurrentStates.push(state);
      } else if(this.delta[state] != undefined && this.delta[state][alphabet]) {
        newCurrentStates = newCurrentStates.concat(this.delta[state][alphabet]);
      }
    });
    newCurrentStates = this.epsilonHandler.findEpsilonStates(newCurrentStates);
    return newCurrentStates;
  }
}

module.exports = NFA;
