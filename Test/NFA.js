const NFA = require('../NFA/NFA');
const Assert = require('./Assertions');
const TestData = require('./nfaTestData.json');

describe("NFA", function() {
  let assertions;

  beforeEach("Asserts", () => {
    assertions = new Assert();
  });

  it("should run all test cases of NFA", function() {
    for(let index = 0; index < TestData.length; index++) {
      const machine = new NFA(TestData[index]['tuple']);
      assertions.assertPassCases(machine, TestData[index]['pass-cases']);
      assertions.assertFailCases(machine, TestData[index]['fail-cases']);
    }
  });
});
