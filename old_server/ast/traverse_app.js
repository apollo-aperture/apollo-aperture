// another version that traverses through the to-do app
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

(async function init() {
  const file = await getFilePromisified(filePath);
  const ast = parser.parse(file, {
    sourceType: 'module',
    plugins: [ 'jsx' ]
  });

  // begin traversal here
  traverse(ast, {
    enter(path) {
      path.node.body.forEach((el, index) => {
        if (el.type === 'VariableDeclaration') {
          const node = path.node.body[ index ];
          // console.log(node);
          // JSXExpressionContainer(node);
          el.declarations.forEach(declaration => {
            const foo = declaration.init.body.openingElement.name.name === 'Query';
            console.log(foo);
          })
        }
      });
    }
  });

  function findQuery(node) {

  }

  function getArrowExpression(node) {
    console.log(node);
    if ('declarations' in node && node.declarations.length > 0) {
      node.declarations.forEach(declaration => {
        if (declaration.init.type === 'ArrowFunctionExpression') {
          // return declaration;
          getJSXElement(declaration);
        } else {
          return false;
        }
      });
    }
  }

  function getJSXElement(node) {
    if ('type' in node.init.body && node.init.body.type === 'JSXElement') {
      // get parent to find complete expression
      console.log('here');


      // console.log(path);
      // if (node.init.body.openingElement.type === 'JSXOpeningElement') {
      //   isQuery(node.init.body.openingElement);
      // }
      // if (node.init.body.closingElement === 'JSXClosingElement') {
      //
      // }
    }
  }

  function isQuery(node) {
    console.log(node);
  }



  function JSXExpressionContainer(node) {
    console.log(node);
    const arrowExpressions = [];
    if ('declarations' in node && node.declarations.length > 0) {
      node.declarations.forEach(declaration => {
        if ('name' in declaration.init.body.openingElement.name && declaration.init.body.openingElement.name.name === 'Query') {
          arrowExpressions.push(declaration);
        }
      });
    }
    console.log(arrowExpressions[0]);
  }

  // recursive function to get nested children
  function returnChildComponents(children) {
    let elemNames = [];
    children.forEach(child => {
      if ('openingElement' in child && child.openingElement.name.type === 'JSXIdentifier' && !htmlElementsToIgnore[ child.openingElement.name.name ]) {
        elemNames.push(child.openingElement.name.name);
      } else if ('children' in child && child.children.length > 0) {
        console.log(child.children);
        elemNames = elemNames.concat(returnChildComponents(child.children));
      }
    });
    return elemNames;
  }

  function filterReturnJSXChildren(nodes) {
    const filtered = nodes.filter(el => (el.type === 'JSXElement')).filter(el => (el.openingElement.name.type === 'JSXIdentifier'));
    let customElements = [];
    for (let i = 0; i < filtered.length; i++) {
      if (filtered[ i ].children.length > 0) {
        customElements = customElements.concat(returnChildComponents(filtered[ i ].children));
      } else {
        customElements.push(filtered[ i ].openingElement.name.name);
      }
    }
    console.log(customElements);
    return customElements;
  }

})();