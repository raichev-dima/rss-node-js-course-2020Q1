const Caesar = require('../src/Caesar');

test('makeShift', () => {
  expect(Caesar.makeShift('a', 26)).toEqual('a');
  expect(Caesar.makeShift('a', 3)).toEqual('d');
  expect(Caesar.makeShift('a', 29)).toEqual('d');
  expect(Caesar.makeShift('a', 23)).toEqual('x');
  expect(Caesar.makeShift('e', -1)).toEqual('d');
  expect(Caesar.makeShift('x', -23)).toEqual('a');
  expect(Caesar.makeShift('a', -7)).toEqual('t');
});

test('encode', () => {
  expect(Caesar.encode('a', 26)).toEqual('a');
  expect(Caesar.encode('attackatonce', 4)).toEqual('exxegoexsrgi');
  expect(Caesar.encode('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 23)).toEqual(
    'XYZABCDEFGHIJKLMNOPQRSTUVW'
  );
  expect(
    Caesar.encode('QEB NRFZH YOLTK CLU GRJMP LSBO QEB IXWV ALD', 3)
  ).toEqual('THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG');
  expect(
    Caesar.encode('КThis is secret. Message about "_" symbol!', 7)
  ).toEqual('КAopz pz zljyla. Tlzzhnl hivba "_" zftivs!');
});

test('decode', () => {
  expect(Caesar.decode('a', 26)).toEqual('a');
  expect(Caesar.decode('a', 7)).toEqual('t');
  expect(Caesar.decode('exxegoexsrgi', 4)).toEqual('attackatonce');
  expect(Caesar.decode('XYZABCDEFGHIJKLMNOPQRSTUVW', 23)).toEqual(
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  );
  expect(
    Caesar.decode('THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG', 3)
  ).toEqual('QEB NRFZH YOLTK CLU GRJMP LSBO QEB IXWV ALD');
  expect(
    Caesar.decode('КAopz pz zljyla. Tlzzhnl hivba "_" zftivs!', 7)
  ).toEqual('КThis is secret. Message about "_" symbol!');
});
