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
    this.currentStates = this.getUpdatedCurrentStates();
    alphabets.split("").forEach(alphabet => {
      this.currentStates = this.getCriteriaAppliedStates(alphabet);
    });
    this.currentStates = this.getUpdatedCurrentStates();
    return this.currentStates.some(state => acceptableStates.includes(state));
  }

  getUpdatedCurrentStates(currentStates = this.currentStates, index = 0) {
    if(currentStates.length == index) {
      return currentStates;
    }
    currentStates = currentStates.concat(
      this.getUpdatedLateralCurrentStates(currentStates[index]));
    return this.getUpdatedCurrentStates(currentStates, ++index);
  }

  getUpdatedLateralCurrentStates(state, resultantStates = []) {
    if(this.delta[state] == undefined || !this.delta[state]["e"]) {
      return resultantStates;
    }
    let newState = this.delta[state]["e"];
    resultantStates = resultantStates.concat(newState);
    return this.getUpdatedLateralCurrentStates(newState, resultantStates);
  }

  getCriteriaAppliedStates(alphabet) {
    let newCurrentStates = [];
    this.currentStates.forEach(state => {
      if(alphabet == "") {
        newCurrentStates.push(state);
      } else if(this.delta[state] == undefined) {
      } else if(this.delta[state][alphabet]) {
        newCurrentStates = newCurrentStates.concat(this.delta[state][alphabet]);
      }
    });
    newCurrentStates = this.getUpdatedCurrentStates(newCurrentStates);
    return newCurrentStates;
  }

}

module.exports = NFA;
