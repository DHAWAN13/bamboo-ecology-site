const { add, subtract } = require("../../utils/math");

describe("Math Functions", () => {

  test("adds two numbers correctly", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("subtracts two numbers correctly", () => {
    expect(subtract(10, 4)).toBe(6);
  });

});