const path = require('path');

const Errors = {
  ERR_SHIFT_CHECK: 'Shift value should be a number which is greater than 0',
  ERR_INVALID_ACTION: 'Action should be either encode or decode',
};

module.exports = function parseOptions({ input, output, action, shift }) {
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

  return {
    input: input && filePath(input),
    output: output && filePath(output),
    action,
    shift: shiftValue,
  };
};
