const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverseJSXElement = require('../electron/src/main/traverse/traverseJSXElement');

function assembleFilePaths(filename) {
  const basePath = path.join(
    __dirname,
    'apollo-react-files',
    'fragments',
    'traverseJSXElement'
  );
  const filePath = path.join(basePath, filename);
  const file = fs.readFileSync(filePath, 'utf8');
  const ast = parser.parse(file, {
    sourceType: 'module',
    plugins: ['jsx'],
  });
  return ast.program.body[0].expression;
}

it('finds no inner components', () => {
  const node = assembleFilePaths('noReactComponent.js');
  const result = traverseJSXElement(node);
  expect(result).toBeNull();
});

it('finds single closed React Component', () => {
  const node = assembleFilePaths('singlePairReactComponent.js');
  const result = traverseJSXElement(node);
  expect(result).toEqual({
    reactComponent: 'PairComponent',
    children: [],
  });
});

it('find single closed React Component', () => {
  const node = assembleFilePaths('singleClosedReactComponent.js');
  const result = traverseJSXElement(node);
  expect(result).toEqual({
    reactComponent: 'ClosedComponent',
    children: [],
  });
});

it('finds nested components', () => {
  const node = assembleFilePaths('nestedComponents.js');
  const result = traverseJSXElement(node);
  expect(result).toEqual({
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
