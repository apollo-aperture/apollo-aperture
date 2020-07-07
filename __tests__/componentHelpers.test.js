const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');

const helpers = require('../traverse/componentHelpers');

function getAST(filename) {
  const filePath = path.join(
    __dirname,
    'apollo-react-files',
    'fragments',
    filename
  );
  const file = fs.readFileSync(filePath, 'utf8');
  return parser.parse(file, {
    sourceType: 'module',
    plugins: ['jsx'],
  });
}

it('finds React components inside of a JSX Expression', () => {
  const filePath = path.join(
    __dirname,
    'apollo-react-files',
    'fragments',
    'reactBody.js'
  );
  const file = fs.readFileSync(filePath, 'utf8');
  const ast = parser.parse(file, {
    sourceType: 'module',
    plugins: ['jsx'],
  });
  const node = ast.program.body[0].expression;
  expect(helpers.generateComponentTreeFromJSXElement(node)).toEqual({
    reactComponent: 'A',
    children: [
      {
        reactComponent: 'B',
        children: [],
      },
      {
        reactComponent: 'C',
        children: [
          {
            reactComponent: 'D',
            children: [],
          },
        ],
      },
    ],
  });
});

it('finds React and Apollo Components', () => {
  const ast = getAST('reactAndApollo.js');
  const node = ast.program.body[0].expression;
  const result = helpers.generateComponentTreeFromJSXElement(node);
  expect(result).toEqual({
    reactComponent: 'React',
    children: [
      {
        reactComponent: 'ApolloProvider',
        children: [{
          reactComponent: 'App',
          children: []
        }],
      },
    ],
  });
  // expect(result.node).toHaveProperty('type');
  // expect(result.node.type).toEqual('JSXElement');
});
