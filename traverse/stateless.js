const traverse = require('@babel/traverse').default;
const htmlElementsToIgnore = require('../traverse/util/htmlElementsToIgnore');

/*function findStatelessComponents(ast) {
  const cache = [];
  traverse(ast, {
    VariableDeclarator(path) {
      traverse(
        path.node,
        {
          JSXElement(path) {
            if (
              !htmlElementsToIgnore[path.node.openingElement.name.name] &&
              path.parent.type !== 'CallExpression'
            ) {
              // addChildren(path.node.openingElement.name.name);
              cache.push(path.node.openingElement.name.name);
            }
          },
        },
        path.scope,
        path.parent
      );
    },
  });
  return cache;
}*/

function statelessTraversal(ast) {
  const cache = [];
  traverse(ast, {
    VariableDeclarator(path) {
      traverse(
        path.node,
        {
          JSXElement(path) {
            if (
              !htmlElementsToIgnore[path.node.openingElement.name.name] &&
              path.parent.type !== 'CallExpression'
            ) {
              cache.push(path.node.openingElement.name.name);
            }
          },
        },
        path.scope,
        path.parent
      );
    },
  });
  // returns an array of React components
  return cache;
}

module.exports = statelessTraversal;
