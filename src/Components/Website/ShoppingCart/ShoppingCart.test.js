const calculateVat = require("./ShoppingCart").calculateVat;
const determineShippingCosts = require("./ShoppingCart").determineShippingCosts;

test('The VAT result should be a calculated value from the total price', () => {
    const input = 22;
    const result = calculateVat(input);
    expect(result).toBe(4.62);
});

test('VAT should return 0 as negative number never get calculated', () => {
    const input = -726;
    const result = calculateVat(input);
    expect(result).toBe(0);
});

test('Shippingcosts should be 0 when price is over 24.95', () => {
    const input = 25;
    const result = determineShippingCosts(input);
    expect(result).toBe(0);
});

test('Shippingcosts should be 4.95 when price is below 24.95', () => {
    const input = 2;
    const result = determineShippingCosts(input);
    expect(result).toBe(4.95);
});