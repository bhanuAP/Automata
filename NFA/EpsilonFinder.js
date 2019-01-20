class EpsilonFinder {
  constructor(delta) {
    this.delta = delta;
  }

  getEpsilonAppliedStates(currentStates = this.currentStates, index = 0) {
    if(currentStates.length == index) {
      return currentStates;
    }
    currentStates = currentStates.concat(
      this.getRelativeEpsilonState(currentStates, currentStates[index]));
    return this.getEpsilonAppliedStates(currentStates, ++index);
  }

  getRelativeEpsilonState(currentStates, state, resultantStates=[]) {
    if(this.delta[state] == undefined || !this.delta[state]["e"]) {
      return resultantStates;
    }
    let newState = this.delta[state]["e"];
    if(this.allElementsIncluded(currentStates, newState)) {
      return resultantStates;
    }
    newState.forEach(element => {
     if(!currentStates.includes(element))
     resultantStates.push(element);
    });
    resultantStates = resultantStates.concat(newState);
    return this.getRelativeEpsilonState(currentStates,newState,resultantStates);
  }

  allElementsIncluded(currentStates, newState) {
    return newState.every(element => currentStates.includes(element));
  }
}

module.exports = EpsilonFinder;
