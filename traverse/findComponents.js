// find components - gets a list of various react and apollo components
// it would do this by invoking functions that get components from stateless, stateful,
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const path = require('path');
const htmlElementsToIgnore = require('./util/htmlElementsToIgnore');
const stateful = require('./stateful');
const fs = require('fs');

const addChildren = (componentName, hierarchy) => {
  // hierarchy.Query.push({ name: componentName })
  let count = 1;

  if(componentName === 'Query'){
    hierarchy.name = 'Query' + count;
    count++;
  } else {
    hierarchy.children.push({ name: componentName });
  }
  
};

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
      if (!htmlElementsToIgnore[ innerNode.node.name ]){
        addChildren(innerNode.node.name, hierarchy);
      }
    });
};

// this is a stateless traversal ***
const statelessTraversal = {
  // default is used so this function can be named and invoked on module.exports
  default(ast, hierarchy) {
    // search for ApolloClient declaration and copy body to apolloClientVar
    // first look for REACTDOM import to find if we're in the index.js file
    // first find the file that we want so we can read it
    findStatelessComponents(ast, hierarchy);
    findQueries(ast, hierarchy);
    return hierarchy;
  },
};

const findStatelessComponents = (ast, hierarchy) => {
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
              addChildren(path.node.openingElement.name.name, hierarchy);
            }
          },
        },
        path.scope,
        path.parent
      );
    },
  });
};

const findQueries = (ast, hierarchy) => {
  traverse(ast, {
    VariableDeclarator(path) {
      traverse(
        path.node,
        {
          JSXElement(path) {
            if (path.node.openingElement.name.name === 'Query') {
            }
            traverse(
              path.node,
              {
                ExpressionStatement(path) {
                  traverse(
                    path.node,
                    {
                      JSXIdentifier(path) {
                        addChildren(path.node.name, hierarchy);
                      },
                    },
                    path.scope,
                    path.parent
                  );
                },
              },
              path.scope,
              path.parent
            );
          },
        },
        path.scope,
        path.parent
      );
    },
  });
};
// this is End of stateless traversal ***

const findComponents = (ast, hierarchy) => {
  const statefulNodes = statefulTraversal(ast);
  filterNodes(statefulNodes, hierarchy);
  //statelessTraversal.default(ast, hierarchy); // checked if the ast is a stateless component. if yes, then it returns hierarchy// ['Launches']
  // const queryNode = queryTraversal(ast); // ['Query' - children 'DateOfLaunch', 'Launches']
  // Query
  // 1st child - Launch Sites - child component - Launch date -
  // {Query: 'Launches', children: ['Laun']}
};



module.exports = findComponents;
