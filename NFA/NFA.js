class NFA {
  constructor(tuple, epsilonFinder) {
    this.delta = tuple.delta;
    this.startingState = tuple['start-state'];
    this.acceptableStates = tuple['final-states'];
    this.epsilonFinder = epsilonFinder;
  }

  doesAccept(alphabets) {
    let acceptableStates = this.acceptableStates;
    this.currentStates = [this.startingState];
    this.currentStates = this.epsilonFinder.getEpsilonAppliedStates(this.currentStates);
    alphabets.split("").forEach(alphabet => {
      this.currentStates = this.getNextStates(alphabet);
    });
    this.currentStates = this.epsilonFinder.getEpsilonAppliedStates(this.currentStates);
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
    newCurrentStates = this.epsilonFinder.getEpsilonAppliedStates(newCurrentStates);
    return newCurrentStates;
  }
}

module.exports = NFA;
