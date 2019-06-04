const parser = require('@babel/parser'),
  traverse = require('@babel/traverse').default,
  t = require('@babel/types'),
  fs = require('fs'),
  path = require('path'),
  htmlElementsToIgnore = require('./util/htmlElements');

const filePath = path.join(__dirname, '..', 'samples', 'todo', 'App.js');

const getFilePromisified = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, file) => {
      if (err) reject(err);
      resolve(file);
    });
  });
};

// function isSuperClass(path, callback) {
//   if ('superClass' in path) {
//     callback(true);
//   } else {
//     callback(false);
//   }
// }

function isSuperClass(callback) {
  return {
    ClassDeclaration(path) {
      console.log(path);
      if ('superClass' in path.node && path.node.superClass.name === 'Component') {
        path.node.body.body.forEach(el => {
          if (el.key.name === 'render') {
            callback(path);
          }
        });
      }
    }
  }
}

function isRenderNode(callback) {
  return {
    ClassDeclaration(path) {
      if ('superClass' in path.node && path.node.superClass.name === 'Component') {
        path.node.body.body.forEach(el => {
          if (el.key.name === 'render') {
            console.log('reached');
            callback(el);
          }
        });
      }
    }
  }
}

/*const visitorUtility = function (callback) {
  const isRenderNode = {
    ClassDeclaration(path) {
      if ('superClass' in path.node && path.node.superClass.name === 'Component') {
        path.node.body.body.forEach(el => {
          if (el.key.name === 'render') {
            console.log('reached');
            callback(el);
          }
        });
      }
    }
  };
  return {
    isRenderNode: isRenderNode
  }
};*/

/*function visitor(func, callback) {
  return func(callback);
}*/

(async function init() {
  const file = await getFilePromisified(filePath);
  const ast = parser.parse(file, {
    sourceType: 'module',
    plugins: [ 'jsx' ]
  });

  function returnValue(val) {
    console.log(val);
  }

  // Check if stateful component
  /*const returnChildren = () => {
    const children = [];
    traverse(ast, {
      ClassDeclaration(path) {
        if ('superClass' in path.node && path.node.superClass.name === 'Component') {
          path.node.body.body.forEach(el => {
            if (el.key.name === 'render') {
              el.body.body.forEach(el => {
                if (el.type === 'ReturnStatement') {
                  path.traverse({
                    JSXIdentifier(path) {
                      children.push(path);
                    }
                  });
                  /!*
                                    el.argument.children.forEach(el => {
                                      if ('openingElement' in el && el.openingElement.name.type === 'JSXIdentifier') {
                                        console.log(el);
                                      }
                                    });
                  *!/
                }
              });
            }
          });
        }
      },
    });
    return children;
  };*/

  const returnChildren = () => {
    const children = [];
    traverse(ast, {
      ClassDeclaration(path) {
        console.log(path);
        traverse(path.node,{
          ReturnStatement(path) {
            console.log(path);
            console.log(path.node.argument);
          }
        }, path.scope, path.state);
      },
    });
    return children;
  };

  // const childComponents = returnChildren();
  traverse(ast, {
    ClassDeclaration(path) {
      console.log(path);
      path.traverse({
        enter(path) {
          console.log(path);
        }
      })
    }
  });
  const filtered = childComponents.filter(el => el.node.type === 'JSXIdentifier').filter(el => {
    if (!htmlElementsToIgnore[ el.node.name ]) {
      return true;
      // if (el.node.name === 'Mutation') {
      //   return true;
      // }
    }
  });
  console.log(filtered);

})();