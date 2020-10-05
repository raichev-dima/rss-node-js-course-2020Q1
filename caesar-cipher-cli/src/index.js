#!/usr/bin/env node

const util = require('util');
const stream = require('stream');
const commander = require('commander');
const path = require('path');
const fs = require('fs');
const Caesar = require('./Caesar');

const pipeline = util.promisify(stream.pipeline);

const program = new commander.Command();

program.storeOptionsAsProperties(false).passCommandToAction(false);

const Errors = {
  ERR_SHIFT_CHECK:
    'Shift value should be a number which is greater or equal to 0',
  ERR_INVALID_ACTION: 'Action should be either encode or decode',
};

async function run({ input, output, action, shift }) {
  if (!['encode', 'decode'].includes(action)) {
    throw new Error(Errors.ERR_INVALID_ACTION);
  }

  const shiftValue = parseInt(shift);

  if (!Number.isInteger(shiftValue)) {
    throw new Error(Errors.ERR_SHIFT_CHECK);
  }

  if (shiftValue < 0) {
    throw new Error(Errors.ERR_SHIFT_CHECK);
  }

  const filePath = (file) => (path.isAbsolute(file) ? file : path.join(file));

  const stdin = input ? fs.createReadStream(filePath(input)) : process.stdin;

  const stdout = output
    ? fs.createWriteStream(filePath(output), {
        flags: 'a+',
      })
    : process.stdout;

  const transform = new stream.Transform({
    transform(chunk, encoding, callback) {
      const data = chunk.toString();

      const output = Caesar[action](data, shiftValue);

      callback(null, `${output.trim()}\n`);
    },
  });

  await pipeline(stdin, transform, stdout);
}

async function main() {
  program
    .requiredOption('-s, --shift <number>', 'a shift')
    .requiredOption('-a, --action <decode|encode>', 'an action encode/decode')
    .option('-i, --input <string>', 'an input file')
    .option('-o, --output <string>', 'an output file')
    .action(run);

  await program.parseAsync(process.argv);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
