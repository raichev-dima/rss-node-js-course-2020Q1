#!/usr/bin/env node

const util = require('util');
const stream = require('stream');
const commander = require('commander');
const fs = require('fs');
const Caesar = require('./Caesar');
const parseOptions = require('./parseOptions');

const pipeline = util.promisify(stream.pipeline);

const program = new commander.Command();

program.storeOptionsAsProperties(false).passCommandToAction(false);

async function run(options) {
  const { input, output, action, shift } = parseOptions(options);

  const stdin = input ? fs.createReadStream(input) : process.stdin;

  const stdout = output
    ? fs.createWriteStream(output, {
        flags: 'a+',
      })
    : process.stdout;

  const transform = new stream.Transform({
    transform(chunk, encoding, callback) {
      const data = chunk.toString();
      const output = Caesar[action](data, shift);

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
