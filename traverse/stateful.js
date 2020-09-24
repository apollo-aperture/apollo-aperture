const traverse = require('@babel/traverse').default;
const htmlElementsToIgnore = require('../traverse/util/htmlElementsToIgnore');

// returns an array of jsx identifier names
// this captures both React components and HTML elements
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
                      // console.log(path);
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
  const newUtility = {
    // Only gets JSX Elements inside of a Class Declaration
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
                        JSXElement(path) {
                          if (
                            !htmlElementsToIgnore[
                              path.node.openingElement.name.name
                            ] &&
                            path.parent.type !== 'CallExpression'
                          ) {
                            cache.push(path.node.openingElement.name.name);
                          }
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
    // JSXElement(path) {
    //   if (
    //     !htmlElementsToIgnore[path.node.openingElement.name.name] &&
    //     path.parent.type !== 'CallExpression'
    //   ) {
    //     cache.push(path.node.openingElement.name.name);
    //   }
    // },
  };
  // console.log(ast);
  traverse(ast, {
    enter(path) {
      // path.traverse(visitorUtility);
      path.traverse(newUtility);
    },
  });
  return cache;
}

// returns an array of only JSXIdentifier nodes
function filterNodes(nodes) {
  const cache = [];
  const jsxIdentifierNodes = nodes.filter(
    node => node.node.type === 'JSXIdentifier'
  );

  jsxIdentifierNodes.forEach(innerNode => {
    // if the jsx node is NOT a regular html element,push it to the children
    if (!htmlElementsToIgnore[innerNode.node.name]) {
      cache.push(innerNode.node.name);
    }
  });
  return cache;
}

// given the jsx nodes, create the hierarchy object
function assembleHierarchy(jsxNodes) {
  const hierarchyContainer = {
    name: '',
    children: [],
  };
  let count = 1;
  jsxNodes.forEach(node => {
    // in case there is more than one query found, append a number to it
    if (node === 'Query') {
      hierarchyContainer.name = `Query${count.toString()}`;
      count += 1;
    } else {
      hierarchyContainer.children.push(node);
    }
  });
  return hierarchyContainer;
}

function findStatefulComponents(ast) {
  const jsxNodes = statefulTraversal(ast);
  const componentNodes = filterNodes(jsxNodes);
  return assembleHierarchy(componentNodes);
}

module.exports = findStatefulComponents;
