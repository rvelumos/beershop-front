const substituteNumberToName = require("./FilterLabels").substituteNumberToName;

test('Sending a string into substituteNumberToName within range should give the responding string', () => {
    const input = "10";
    const result = substituteNumberToName(input);
    expect(result).toBe("Quadrupel");
});

test('Input that does not correspond the give range in substituteNumberToName should return empty', () => {
    const input = "TEST";
    const result = substituteNumberToName(input);
    expect(result).toBe("");
});
