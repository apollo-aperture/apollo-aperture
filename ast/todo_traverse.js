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

const reachProgram = {
  Program(path) {
    console.log(path);
  }
};

function VisitorUtilityCreator(node) {
  if (arguments.length < 1) {
    this.current = null;
  } else {
    this.current = node;
  }
  // this.findProgram = function(){
  //   const self = this;
  //   return {
  //     Program(path) {
  //       self.current = path;
  //     }
  //   }
  // };
}

VisitorUtilityCreator.prototype.findProgram = () => {
  return {
    Program(path) {
      this.current = path;
    }
  }
};

(async function init() {
  const file = await getFilePromisified(filePath);
  const ast = parser.parse(file, {
    sourceType: 'module',
    plugins: [ 'jsx' ]
  });
  const visitor = new VisitorUtilityCreator();
  // visitor.findProgram.bind(visitor);
  visitor.findProgram.bind(this);
  traverse(ast, visitor.findProgram());
  console.log(visitor.current);
})();

