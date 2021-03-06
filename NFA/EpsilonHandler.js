class EpsilonHandler {
  constructor(delta) {
    this.delta = delta;
  }

  getUniqueElements(array) {
    return array.filter((element, index, array) =>
    array.indexOf(element) == index);
  }

  isSubset(states, newStates) {
    return newStates.every(element => states.includes(element));
  }

  getRelativeEpsilonState(states, state, resultantStates=[]) {
    if(this.delta[state] == undefined || !this.delta[state]["e"]) {
      return resultantStates;
    }
    let newStates = this.delta[state]["e"];
    if(this.isSubset(states, newStates)) {
      return resultantStates;
    }
    resultantStates = this.getUniqueElements(resultantStates.concat(newStates));
    return this.getRelativeEpsilonState(states, newStates, resultantStates);
  }

  findEpsilonStates(states, index = 0) {
    if(states.length == index) return states;
    states = states.concat(
      this.getRelativeEpsilonState(states, states[index]));
    return this.findEpsilonStates(states, ++index);
  }
}

module.exports = EpsilonHandler;
