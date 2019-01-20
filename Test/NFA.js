const NFA = require('../NFA/NFA');
const Assert = require('./Assertions');
const TestData = require('./nfaTestData.json');
const EpsilonFinder = require('../NFA/EpsilonFinder');

describe("NFA", function() {
  let assertions;

  beforeEach("Asserts", () => {
    assertions = new Assert();
  });

  it("should run all test cases of NFA", function() {
    for(let index = 0; index < TestData.length; index++) {
      const tuple = TestData[index]['tuple'];
      const epsilonFinder = new EpsilonFinder(tuple.delta);
      const machine = new NFA(tuple, epsilonFinder);
      assertions.assertPassCases(machine, TestData[index]['pass-cases']);
      assertions.assertFailCases(machine, TestData[index]['fail-cases']);
    }
  });
});
