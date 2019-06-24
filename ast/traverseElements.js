const traverse = require('@babel/traverse').default,
  htmlElementsToIgnore = require('./util/htmlElements');

const foundQueries = [];

const findQuery = (ast) => {
  traverse(ast, {
    enter(path) {
      if ('body' in path.node && Array.isArray(path.node.body)) {
        path.node.body.forEach((el) => {
          if (el.type === 'VariableDeclaration') {
            el.declarations.forEach(declaration => {
              if ('init' in declaration && declaration.init != null && 'body' in declaration.init) {
                if ('openingElement' in declaration.init.body) {
                  if (declaration.init.body.openingElement.name.name === 'Query') {
                    foundQueries.push(declaration);
                  }
                }
              }
            });
          }
        });
      }
    }
  });
};

const traverseElements = {
  default() {
    return async function init(ast) {
      return findQuery(ast);
    }
  }
};

module.exports = traverseElements.default();