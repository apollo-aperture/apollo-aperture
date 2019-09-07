// find components - gets a list of various react and apollo components
// it would do this by invoking functions that get components from stateless, stateful, 
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const path = require('path');
const htmlElementsToIgnore = require('./util/htmlElementsToIgnore');
const stateful = require('./stateful');
const fs = require('fs');

const addChildren = (componentName, hierarchy) => {
  hierarchy.Query.push({name: componentName});
}


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
     addChildren(innerNode.node.name, hierarchy);
  });
};

const findComponents = (ast, hierarchy) => {
  const statefulNodes = statefulTraversal(ast); // checks if the ast is a stateful component. if yes, then it returns the hierarchy// return ['DateOfLaunch'];
  // const statelessNodes = statelessTraversal(ast); // checked if the ast is a stateless component. if yes, then it returns hierarchy// ['Launches']
  // const queryNode = queryTraversal(ast); // ['Query' - children 'DateOfLaunch', 'Launches']
  filterNodes(statefulNodes, hierarchy);
  // Query
  // 1st child - Launch Sites - child component - Launch date - 
  // {Query: 'Launches', children: ['Laun']}
};


module.exports = findComponents;
