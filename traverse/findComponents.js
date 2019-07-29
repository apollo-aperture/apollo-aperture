const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const path = require('path');
const htmlElementsToIgnore = require('./util/htmlElementsToIgnore');
const stateful = require('./stateful');
const fs = require('fs');

function statefulTraversal(ast) {
  const cache = [];
  const visitorUtility = {
    ClassDeclaration(path) {
      path.traverse({
        ClassBody(path) {
          path.traverse({
            ClassMethod(path) {
              path.traverse({
                BlockStatement(path) {
                  path.traverse({
                    ReturnStatement(path) {
                      path.traverse({
                        JSXIdentifier(path) {
                          // hierarchy.addChildren(path);
                          cache.push(path);
                        },
                      });
                    },
                  });
                },
              });
            },
          });
        },
      });
    },
  };
  traverse(ast, {
    enter(path) {
      path.traverse(visitorUtility);
    },
  });
  return cache;
}

const filterNodes = (nodes, hierarchy) => {
  nodes
    .filter(node => node.node.type === 'JSXIdentifier')
    .filter(innerNode => {
      if (innerNode.node.name === 'Query') {
        console.log(true);
      }
      hierarchy.addChildren(innerNode.node.name);
  });
};

const findComponents = (ast, hierarchy) => {
  const nodes = statefulTraversal(ast);
  filterNodes(nodes, hierarchy);
  console.log(hierarchy);
};

module.exports = findComponents;
