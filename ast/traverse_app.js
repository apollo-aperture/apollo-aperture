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

(async function init() {
  const file = await getFilePromisified(filePath);
  const ast = parser.parse(file, {
    sourceType: 'module',
    plugins: [ 'jsx' ]
  });

  // Check if stateful component
  const returnChildren = () => {
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
                }
              });
            }
          });
        }
      },
    });
    return children;
  };

  traverse(ast, {
    // find Class declaration
    ClassDeclaration(path) {
      traverse(path.node, {
        ReturnStatement(path) {
          if ('argument' in path.node && path.node.argument.type === 'JSXElement') {
            // path.node.argument.children are child nodes
            filterReturnJSXChildren(path.node.argument.children);
          }
        }
      }, path.scope, path.state);
    }
  });

  function returnChildComponents(children) {
    let elemNames = [];
    children.forEach(child => {
      if ('openingElement' in child && child.openingElement.name.type === 'JSXIdentifier' && !htmlElementsToIgnore[child.openingElement.name.name]) {
      elemNames.push(child.openingElement.name.name);
      } else if ('children' in child && child.children.length > 0) {
        console.log(child.children);
        elemNames = elemNames.concat(returnChildComponents(child.children));
      }
    });
    return elemNames;
  }

  function filterReturnJSXChildren(nodes) {
    const filtered = nodes.filter( el=> (el.type === 'JSXElement')).filter(el => (el.openingElement.name.type === 'JSXIdentifier'));
    let customElements = [];
    for (let i = 0; i < filtered.length; i++) {
      if (filtered[i].children.length > 0) {
        customElements = customElements.concat(returnChildComponents(filtered[i].children));
      } else {
        customElements.push(filtered[i].openingElement.name.name);
      }
    }
    console.log(customElements);
    return customElements;
  }

})();