export default function conversionUserCoords(value) {
  if (/^\[?[-]?\d*\.{1}\d*[,]{1}[ ]?[-]?\d*\.{1}\d*\]?$/.test(value)) {
    const array = [];
    value.split(',').forEach((el) => array.push((el.split('').filter((e) => e !== '[' && e !== ']' && e !== ' ')).join('')));
    return `[${array[0]}, ${array[1]}]`;
  }
  return false;
}
