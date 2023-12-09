import conversionUserCoords from "../js/conversionUserCoords";

test.each([
    ['51.50851, -0.12572', '[51.50851, -0.12572]'],
    ['51.50851,-0.12572', '[51.50851, -0.12572]'],
    ['[51.50851, -0.12572]', '[51.50851, -0.12572]'],
    ['51.50851, -0.12572]', '[51.50851, -0.12572]'],
    ['asd', false],
    ['123123213, 2312321.3', false],
    [1290, false]
])('', (value, expected) => {
    const received = conversionUserCoords(value);
    expect(received).toBe(expected);
})