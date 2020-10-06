const path = require('path');
const { parseOptions, Errors } = require('../src/parseOptions');

describe('parseOptions', () => {
  it('should throw if action is invalid', async () => {
    await expect(
      parseOptions({ action: 'encode', shift: '1' })
    ).resolves.not.toThrow();

    await expect(
      parseOptions({ action: 'decode', shift: '1' })
    ).resolves.not.toThrow();

    await expect(
      parseOptions({ action: 'blabla', shift: '1' })
    ).rejects.toEqual(new Error(Errors.ERR_INVALID_ACTION));
  });

  it('should throw if shift value is invalid', async () => {
    await expect(
      parseOptions({ action: 'encode', shift: '1' })
    ).resolves.not.toThrow();

    await expect(
      parseOptions({ action: 'encode', shift: '-1' })
    ).rejects.toEqual(new Error(Errors.ERR_SHIFT_CHECK));

    await expect(
      parseOptions({ action: 'encode', shift: 'abc' })
    ).rejects.toEqual(new Error(Errors.ERR_SHIFT_CHECK));

    await expect(
      parseOptions({ action: 'encode', shift: '0' })
    ).rejects.toEqual(new Error(Errors.ERR_SHIFT_CHECK));

    await expect(
      parseOptions({
        action: 'encode',
        shift: '1',
        input: 'doesnotexist.txt',
      })
    ).rejects.toEqual(new Error(Errors.ERR_INVALID_INPUT_FILE));

    await expect(
      parseOptions({
        action: 'encode',
        shift: '1',
        output: 'doesnotexist.txt',
      })
    ).rejects.toEqual(new Error(Errors.ERR_INVALID_OUTPUT_FILE));
  });

  it('should parse the options', async () => {
    expect(
      await parseOptions({
        action: 'encode',
        shift: '1',
        input: 'test/data/input.txt',
        output: 'test/data/output.txt',
      })
    ).toStrictEqual({
      action: 'encode',
      shift: 1,
      input: path.join(process.cwd(), 'test/data/input.txt'),
      output: path.join(process.cwd(), 'test/data/output.txt'),
    });
  });
});
