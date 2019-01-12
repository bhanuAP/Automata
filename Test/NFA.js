const chai = require('chai');
const assert = chai.assert;
const NFA = require('../NFA/NFA');

describe("NFA", function() {
  it("should return true for alternate characters beginning and ending with same letter", function() {
    let tuple = {
      states: "states":[
        "q1",
        "q3",
        "q7",
        "q2",
        "q5",
        "q6",
        "q4"
      ],
      alphabets: ['1', '0'],
      delta: {
        "q1":{
          "e":[
            "q2",
            "q5"
          ]
        },
        "q2":{
          "0":[
            "q3"
          ]
        },
        "q3":{
          "1":[
            "q4"
          ]
        },
        "q4":{
          "0":[
            "q3"
          ]
        },
        "q5":{
          "1":[
            "q6"
          ]
        },
        "q6":{
          "0":[
            "q7"
          ]
        },
        "q7":{
          "1":[
            "q6"
          ]
        }
      },
      'start-state': 'q1',
      'final-states': [
        "q3",
        "q6"
      ]
    };

    const machine = new NFA(tuple);
    assert.isOk(machine.doesAccept('0'));
    assert.isOk(machine.doesAccept('010'));
    assert.isOk(machine.doesAccept('01010'));
    assert.isOk(machine.doesAccept('1'));
    assert.isOk(machine.doesAccept('101'));
    assert.isOk(machine.doesAccept('10101'));
  });
});
