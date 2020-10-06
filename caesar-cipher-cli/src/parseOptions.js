const util = require('util');
const fs = require('fs');
const path = require('path');

const Errors = {
  ERR_SHIFT_CHECK: 'Shift value should be a number which is greater than 0',
  ERR_INVALID_ACTION: 'Action should be either encode or decode',
  ERR_INVALID_INPUT_FILE: 'Input file does not exist',
  ERR_INVALID_OUTPUT_FILE: 'Output file does not exist',
};

const fileExists = util.promisify(fs.exists);

module.exports = {
  parseOptions: async function parseOptions({ input, output, action, shift }) {
    if (!['encode', 'decode'].includes(action)) {
      throw new Error(Errors.ERR_INVALID_ACTION);
    }

    const shiftValue = parseInt(shift);

    if (!Number.isInteger(shiftValue)) {
      throw new Error(Errors.ERR_SHIFT_CHECK);
    }

    if (shiftValue <= 0) {
      throw new Error(Errors.ERR_SHIFT_CHECK);
    }
    const filePath = (file) =>
      path.isAbsolute(file) ? file : path.join(process.cwd(), file);

    const inputPath = input && filePath(input);
    const inputExists = await fileExists(inputPath);

    if (input && !inputExists) {
      throw new Error(Errors.ERR_INVALID_INPUT_FILE);
    }

    const outputPath = output && filePath(output);
    const outputExits = await fileExists(outputPath);

    if (output && !outputExits) {
      throw new Error(Errors.ERR_INVALID_OUTPUT_FILE);
    }

    return {
      input: inputPath,
      output: outputPath,
      action,
      shift: shiftValue,
    };
  },
  Errors,
};
