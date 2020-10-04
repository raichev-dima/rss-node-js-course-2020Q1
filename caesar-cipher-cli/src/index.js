#!/usr/bin/env node
const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, '../test/data/input.txt');

const reader = fs.createReadStream(path.join(filePath), {
  flag: 'a+',
  encoding: 'UTF-8',
  start: 5,
  end: 64,
  highWaterMark: 16,
});

reader.on('data', function (chunk) {
  console.log(chunk);
});
