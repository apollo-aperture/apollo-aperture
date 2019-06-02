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

// const visitorUtility = (node) => {
//   if (arguments.length < 1) {
//     this.node = null;
//   }
//   this.node = node;
//   return {
//     program: {
//       Program(node) {
//         console.log(path);
//       }
//     }
//   };
// };

function VisitorUtilityCreator(node) {
  if (arguments.length < 1) {
    this.current = null;
  } else {
    this.current = node;
  }
  this.findProgram = {
    Program(path) {
      // this.current = path;
      // console.log(path);
    }
  };
  this.setTest = function() {
    this.current = 'foo';
  }
}

// VisitorUtilityCreator.prototype.test = function(input) {
//   this.current = input;
// };

// VisitorUtilityCreator.prototype.findProgram = () => {
//   function foo() {
//     return {
//       Program(path) {
//         this.current = path;
//         // updateCurrent(path)
//         // console.log(path);
//       }
//     }
//   }.bind(this)
// };

(async function init() {
  const file = await getFilePromisified(filePath);
  const ast = parser.parse(file, {
    sourceType: 'module',
    plugins: [ 'jsx' ]
  });
  const visitor = new VisitorUtilityCreator();
  traverse(ast, visitor.findProgram);
  visitor.setTest('foo');
  console.log(visitor.current);
})();