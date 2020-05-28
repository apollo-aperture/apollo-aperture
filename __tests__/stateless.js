const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const findStatelessComponents = require('../traverse/stateless');

function generateASTFromPath(pathInput) {
  const filePath = path.join(__dirname, pathInput);
  const file = fs.readFileSync(filePath, 'utf8');
  return parser.parse(file, {
    sourceType: 'module',
    plugins: ['jsx'],
  });
}

function generateAST(file) {
  return parser.parse(file, {
    sourceType: 'module',
    plugins: ['jsx'],
  });
}

const filePathConstants = {
  stateless: '../samples/test_cases/stateless.js',
  statelessWithQuery: '../samples/test_cases/statelessWithQuery.js',
};

describe('find stateless components', () => {
  it('Does not find any inner components', () => {
    const noInnerStatelessComponents = `const foo = () => (
      <div>Hello World</div>
    );
    export default foo;`;
    const ast = generateAST(noInnerStatelessComponents);
    const result = findStatelessComponents(ast);
    expect(result).toEqual([]);
  });
  it('Uses the new stateless query', () => {
    const ast = generateASTFromPath(filePathConstants.stateless);
    const result = findStatelessComponents(ast);
    expect(result).toEqual([
      {
        name: 'Stateless',
        children: ['InnerStateless'],
      },
    ]);
  });
  it('finds a single component without a query', () => {
    // const filePath = path.join(__dirname, filePathConstants.stateless);
    // const file = fs.readFileSync(filePath, 'utf8');
    // const ast = generateAST(file);
    const ast = generateASTFromPath(filePathConstants.stateless);
    const result = findStatelessComponents(ast);
    expect(result).toEqual(['InnerStateless']);
  });
  it('finds a stateless component with a query', () => {
    // const filePath = path.join(__dirname, filePathConstants.statelessWithQuery);
    // const file = fs.readFileSync(filePath, 'utf8');
    // const ast = generateAST(file);
    const ast = generateASTFromPath(filePathConstants.statelessWithQuery);
    const result = findStatelessComponents(ast);
    expect(result).toEqual(['InnerStateless', 'Query']);
  });
});
