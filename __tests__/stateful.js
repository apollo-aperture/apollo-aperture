const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
// const traverse = require('@babel/traverse').default;
// const htmlElementsToIgnore = require('./util/htmlElementsToIgnore');
const findStatefulComponents = require('../traverse/stateful');

function generateASTFromPath(pathInput) {
  const filePath = path.join(__dirname, pathInput);
  const file = fs.readFileSync(filePath, 'utf8');
  return parser.parse(file, {
    sourceType: 'module',
    plugins: ['jsx'],
  });
}


function generateAST (file) {
  return parser.parse(file, {
    sourceType: 'module',
    plugins: ['jsx']
  });
}

const filePathConstants = {
  stateful: '../samples/test_cases/stateful.js'
};

// const filePath = path.join(__dirname, '../samples/test_cases/stateful.js');
// const filePath = path.join(__dirname, '../samples/test_cases/statefulInlineQuery.js');
// const file = fs.readFileSync(filePath, 'utf8');

describe('find stateful components', () => {
  it('finds React components', () => {
    const ast = generateASTFromPath(filePathConstants.stateful);
    const result = findStatefulComponents(ast);
    expect(result).toEqual({
      name: 'Query1',
      children: ['InnerComponent', 'Foo']
    });
  });
});