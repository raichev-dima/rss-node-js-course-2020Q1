const ALPHABET = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

function checkUpperCase(ch) {
  return ch === ch.toUpperCase();
}

function checkLatinChar(ch) {
  return typeof ch === 'string' && /^[A-Za-z]$/.test(ch);
}

function makeShift(ch, shift) {
  const index = ALPHABET.indexOf(ch);
  const sign = shift !== 0 ? Math.abs(shift) / shift : 1;
  const next = (index + shift) % (sign * ALPHABET.length);

  if (index > -1) {
    return next >= 0 ? ALPHABET[next] : ALPHABET[ALPHABET.length + next];
  }

  return ch;
}

function cipher(str, shift) {
  return str
    .split('')
    .map((ch) => {
      const isLatinChar = checkLatinChar(ch);

      if (!isLatinChar) {
        return ch;
      }

      const isUpperCase = checkUpperCase(ch);

      const next = makeShift(ch.toLowerCase(), shift);

      if (isUpperCase) {
        return next.toUpperCase();
      }

      return next;
    })
    .join('');
}

function encode(str, shift) {
  return cipher(str, shift);
}

function decode(str, shift) {
  return cipher(str, -shift);
}

module.exports = {
  encode,
  decode,
  makeShift,
};
