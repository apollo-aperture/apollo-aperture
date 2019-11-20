// for traversing through to-do application
const parser = require('@babel/parser'),
  traverse = require('@babel/traverse').default,
  t = require('@babel/types'),
  fs = require('fs'),
  path = require('path'),
  htmlElementsToIgnore = require('./util/htmlElements');

const filePath = path.join(__dirname, '..', 'samples', 'todo', 'index.js');

const getFilePromisified = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, file) => {
      if (err) reject(err);
      resolve(file);
    });
  });
};

function ApolloClientRef(node, callback) {
  // To step into a path of a node, you need to provide the parent, opts, scope, state, and parent path
  // scope and parent path
  // parent, opts, scope, state, parentPath
  if (node.node.init.type === 'NewExpression') {
    traverse(node.parent, {
      VariableDeclarator(path) {
        if (path.node.init.callee.name === 'ApolloClient') {
          callback(node.parent);
        }
      }
    }, node.scope, node.state);
  }
}

function VisitorUtilityCreator(node) {
  if (arguments.length < 1) {
    this.current = null;
  } else {
    this.current = node;
  }
}

VisitorUtilityCreator.prototype.Program = function () {
  const self = this;
  return {
    Program(path) {
      self.current = path;
    },
    ClassDeclaration(path) {
      console.log(path);
    }
  }
};

VisitorUtilityCreator.MyProgram = {

  Program(path){
    // do stuff
  }
};

(async function init() {
  const file = await getFilePromisified(filePath);
  const ast = parser.parse(file, {
    sourceType: 'module',
    plugins: [ 'jsx' ]
  });
  // const visitor = new VisitorUtilityCreator();
  // traverse(ast, visitor.Program());

  function returnValue(val) {
    console.log(val);
  }
  traverse(ast, {
    VariableDeclarator(path) {
      ApolloClientRef(path, returnValue);
    }
  });
})();

