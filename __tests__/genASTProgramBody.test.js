const path = require('path');
const genASTProgramBody = require('../traverse/genASTProgramBody');

const indexFileName = 'index.js';
const reactProjectIndexFile = path.join(
  __dirname,
  'apollo-react-files/index.js'
);
const reactProjectDirectory = path.dirname(reactProjectIndexFile);

it('Generates the program body of an AST of a given file', () => {
  const result = genASTProgramBody(reactProjectDirectory, indexFileName);
  expect(Array.isArray(result)).toBe(true);
});
