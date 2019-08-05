const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const htmlElementsToIgnore = require('./util/htmlElementsToIgnore');

function traverseAst(ast) {
  const cache = [];
  return new Promise((resolve) => {
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
    resolve(cache);
  });
}

module.exports = traverseAst;
