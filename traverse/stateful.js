const traverse = require('@babel/traverse').default;
const htmlElementsToIgnore = require('../traverse/util/htmlElementsToIgnore');

// returns an array of jsx identifier names
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

// select only JSXIdentifier nodes
function filterNodes(nodes) {
  const cache = [];
  const jsxIdentifierNodes = nodes.filter(
    node => node.node.type === 'JSXIdentifier'
  );

  jsxIdentifierNodes.forEach(innerNode => {
    if (!htmlElementsToIgnore[innerNode.node.name]) {
      cache.push(innerNode.node.name);
    }
  });
  return cache;
}

function assembleHierarchy(jsxNodes) {
  const hierarchyContainer = {
    name: '',
    children: [],
  };
  let count = 1;
  jsxNodes.forEach(node => {
    if (node === 'Query') {
      hierarchyContainer.name = `Query${count.toString()}`;
      count += 1;
    } else {
      hierarchyContainer.children.push(node);
    }
  });
  return hierarchyContainer;
}

function newFindStatefulComponents(ast) {
  const jsxNodes = statefulTraversal(ast);
  const componentNodes = filterNodes(jsxNodes);
  return assembleHierarchy(componentNodes);
}

module.exports = newFindStatefulComponents;
