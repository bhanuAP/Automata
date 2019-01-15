class NFA {
  constructor(tuple) {
    this.states = tuple.states;
    this.alphabets = tuple.alphabets;
    this.delta = tuple.delta;
    this.startingState = tuple['start-state'];
    this.acceptableStates = tuple['final-states'];
  }

  doesAccept(alphabets) {
    let acceptableStates = this.acceptableStates;
    this.currentStates = [this.startingState];
    this.currentStates = this.getEpsilonAppliedStates();
    alphabets.split("").forEach(alphabet => {
      this.currentStates = this.getNextStates(alphabet);
    });
    this.currentStates = this.getEpsilonAppliedStates();
    return this.currentStates.some(state => acceptableStates.includes(state));
  }

  getEpsilonAppliedStates(currentStates = this.currentStates, index = 0) {
    if(currentStates.length == index) {
      return currentStates;
    }
    currentStates = currentStates.concat(
      this.getRelativeEpsilonState(currentStates[index]));
    return this.getEpsilonAppliedStates(currentStates, ++index);
  }

  getRelativeEpsilonState(state, resultantStates = []) {
    if(this.delta[state] == undefined || !this.delta[state]["e"]) {
      return resultantStates;
    }
    let newState = this.delta[state]["e"];
    resultantStates = resultantStates.concat(newState);
    return this.getRelativeEpsilonState(newState, resultantStates);
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
    newCurrentStates = this.getEpsilonAppliedStates(newCurrentStates);
    return newCurrentStates;
  }
}

module.exports = NFA;
