const traverse = require('@babel/traverse').default;
const htmlElementsToIgnore = require('../traverse/util/htmlElementsToIgnore');

function findStatelessComponents(ast) {
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
}

function assembleHierarchy(nodes) {
  const hierarchyContainer = {
    Query: [],
  };

}

function findStatelessComponents(ast) {
  const hierarchyContainer = {
    Query: [],
  };

  const addChildren = componentName => {
    hierarchyContainer.Query.push({name: componentName});
  };

  /*const findComponents = ast => {
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
                addChildren(path.node.openingElement.name.name);
              }
            },
          },
          path.scope,
          path.parent
        );
      },
    });
  };*/

  findComponents(ast);
  return hierarchyContainer;
};

module.exports = findStatelessComponents;
