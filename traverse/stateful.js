const traverse = require('@babel/traverse').default;
const htmlElementsToIgnore = require('../traverse/util/htmlElementsToIgnore');

function findStatefulComponents(ast) {
  const hierarchyContainer = {
    name: '',
    children: [],
  };

  const addChildren = componentName => {
    let count = 1;
    if (componentName === 'Query') {
      hierarchyContainer.name = 'Query' + count;
      count++;
    } else {
      hierarchyContainer.children.push({ name: componentName });
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

  const statefulNodes = statefulTraversal(ast);
  filterNodes(statefulNodes)
  //return hierarchyContainer;
  // console.log(hierarchyContainer);
}

module.exports = findStatefulComponents;
