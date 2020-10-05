const path = require('path');
const parseOptions = require('../src/parseOptions');

describe('parseOptions', () => {
  it('should throw if action is invalid', () => {
    expect(() => parseOptions({ action: 'encode', shift: '1' })).not.toThrow();
    expect(() => parseOptions({ action: 'decode', shift: '1' })).not.toThrow();
    expect(() => parseOptions({ action: 'blabla', shift: '1' })).toThrow();
  });

  it('should throw if shift value is invalid', () => {
    expect(() => parseOptions({ action: 'encode', shift: '1' })).not.toThrow();
    expect(() => parseOptions({ action: 'encode', shift: '-1' })).toThrow();
    expect(() => parseOptions({ action: 'encode', shift: 'abc' })).toThrow();
    expect(() => parseOptions({ action: 'encode', shift: '0' })).toThrow();
  });

  it('should parse the options', () => {
    expect(
      parseOptions({
        action: 'encode',
        shift: '1',
        input: './input.txt',
        output: '/opt/work/output.txt',
      })
    ).toStrictEqual({
      action: 'encode',
      shift: 1,
      input: path.join(process.cwd(), './input.txt'),
      output: '/opt/work/output.txt',
    });
  });
});
