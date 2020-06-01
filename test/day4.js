// must be not six digits long
const sixDigits = (num) => num.toString().length === 6;

const LENGTH = "LENGTH";
const ADJACENT = "ADJACENT";
const DECREASE = "DECREASE";
const SUCCESS = "SUCCESS";

// must have two adjacent digits
const adjacentDigits = (num, part2) => {
  let previous = null;
  let frequency = 0;

  const digits = num.toString().split("");
  for (let i = 0; i < digits.length; i++) {
    const current = digits[i];
    if (!previous || previous === current) {
      frequency++;
    } else {
      if (part2) {
        if (frequency === 2) return true;
      } else if (frequency >= 2) return true;
      frequency = 1;
    }
    previous = current;
  }

  if (part2) {
    if (frequency === 2) return true;
  } else if (frequency >= 2) return true;
  return false;
};

// must have adjacent digits
const noDecrease = (num) => {
  const digits = num.toString().split("");
  if (digits.length < 2) return true;
  for (let i = 1; i < digits.length; i++) {
    const left = digits[i - 1];
    const right = digits[i];
    if (parseInt(left) > parseInt(right)) return false;
  }
  return true;
};

// digits must not decrease
const fitsCriteria = (i, part2 = false) => {
  if (!sixDigits(i)) return ADJACENT;
  if (!adjacentDigits(i, part2)) return ADJACENT;
  if (!noDecrease(i)) return DECREASE;
  return SUCCESS;
};

const numOptions = (lower, upper, part2 = false) => {
  let fit = [];
  for (let i = lower; i <= upper; i++)
    if (fitsCriteria(i, part2) === SUCCESS) fit.push(i);
  return fit.length;
};

var assert = require("assert");
describe("Day4", function () {
  describe("Part1", function () {
    it("sample inputs", function () {
      assert.equal(fitsCriteria(111111), SUCCESS);
      assert.equal(fitsCriteria(223450), DECREASE);
      assert.equal(fitsCriteria(123789), ADJACENT);
    });
    it("desired test", function () {
      assert.equal(numOptions(152085, 670283), 1764);
    });
  });

  describe("Part2", function () {
    it("sample inputs", function () {
      assert.equal(fitsCriteria(112233, true), SUCCESS);
      assert.equal(fitsCriteria(123444, true), ADJACENT);
      assert.equal(fitsCriteria(111122, true), SUCCESS);
    });
    it("desired test", function () {
      assert.equal(numOptions(152085, 670283, true), 1196);
    });
  });
});
