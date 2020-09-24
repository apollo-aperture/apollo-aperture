const path = require('path');
const fs = require('fs');
const parser = require('@babel/parser');

function returnAST(filename) {
  const fileContents = fs.readFileSync(filename, 'utf8');
  return parser.parse(fileContents, {
    sourceType: 'module',
    plugins: ['jsx'],
  });
};

module.exports = returnAST;
