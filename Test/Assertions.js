const chai = require('chai');
const assert = chai.assert;

class Assert {
  constructor() {}

  assertPassCases(machine, passCases) {
    passCases.forEach( (element, index) => {
      assert.isOk(machine.doesAccept(element));
    });
  }

  assertFailCases(machine, failCases) {
    failCases.forEach( (element, index) => {
      assert.isNotOk(machine.doesAccept(element));
    });
  }
}

module.exports = Assert;
