const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const findStatelessComponents = require('../traverse/stateless');

function generateAST(file) {
  return parser.parse(file, {
    sourceType: 'module',
    plugins: ['jsx'],
  });
}

const filePath = path.join(__dirname, '../samples/test_cases/stateless.js');
const file = fs.readFileSync(filePath, 'utf8');
const noInnerStatelessComponents = `const foo = () => (
  <div>Hello World</div>
);

export default foo;`;

describe('find stateless components', () => {
  it('finds a file', () => {
    const statelessAST = generateAST(file);
    expect(findStatelessComponents(statelessAST))
      .toEqual(
        {
        Query: [
          {
            name: 'InnerStateless',
          },
        ],
      }
      );
  });
  it('Does not find any components', () => {
    const noComponents = generateAST(noInnerStatelessComponents);
    expect(findStatelessComponents(noComponents)).toEqual({
      Query: [],
    });
  });
});
