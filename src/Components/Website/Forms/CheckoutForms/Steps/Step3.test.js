const upperCaseFirst = require("./Step3").upperCaseFirst;

test('The output name should be a uppercase string', () => {

    const input = "testname";

    const result = upperCaseFirst(input);

    expect(result).toBe("Testname");
});