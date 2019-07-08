/* This file actually creates the JSON file which is used by the visualizer */
const parser = require('@babel/parser'),
  traverse = require('@babel/traverse').default,
  t = require('@babel/types'),
  fs = require('fs'),
  path = require('path'),
  traverseElements = require('./traverseElements'),
  htmlElementsToIgnore = require('./util/htmlElements');

// const filePath = path.join(__dirname, '..', 'samples', 'todo', 'App.js');
// const filePath = path.join(__dirname, '..', 'samples', 'todo', 'index.js');

// OLD promisified file
/*const getFilePromisified = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, file) => {
      if (err) reject(err);
      resolve(file);
    });
  });
};*/

// this hierarchy constructor was used to conform with Raffi's d3 implementation
function HierarchyConstructor() {
  this.name = 'Query';
  this.children = [];
}

HierarchyConstructor.prototype.addChildren = function(componentName) {
  this.children.push({name: componentName});
};

// Old hierarchy constructor
// This was used and worked previously
/*function OriginalHierarchyConstructor() {
  this.components = [];
  this.query = {
    children: []
  };
};*/

/*OriginalHierarchyConstructor.prototype.addComponent = function(componentName){
  this.components.push(componentName);
};*/

/*OriginalHierarchyConstructor.prototype.addChildComponent = function(componentName) {
  for (let i = 0; i < this.components.length; i++) {
    if (this.components[i] === componentName) {
      this.query.children.push(componentName);
    }
  }
};*/
const hierarchy = new HierarchyConstructor();
// const newHierarchy = new OriginalHierarchyConstructor();

const traverseFiles = {
  // default is used so this function can be named and invoked on module.exports
  default() {
    return async function findContent(file) {
      // search for ApolloClient declaration and copy body to apolloClientVar
      // first look for REACTDOM import to find if we're in the index.js file
      // first find the file that we want so we can read it
      // const data = await getFilePromisified(file);
      const ast = parser.parse(file, {
        sourceType: 'module',
        plugins: [ 'jsx' ]
      });
      // findQuery(ast);
      findComponents(ast);
      findQueries(ast);
      return hierarchy;
    };
  }
};

const findComponents = ast => {
  traverse(ast, {
    VariableDeclarator(path) {
      traverse(path.node, {
        JSXElement(path) {
          if (!htmlElementsToIgnore[ path.node.openingElement.name.name ] && path.parent.type !== 'CallExpression') {
            // hierarchy.addComponent(path.node.openingElement.name.name);
            // reactComponents.push(path.node);
          }
        }
      }, path.scope, path.parent);
    }
  });
};

const findQueries = ast => {
  traverse(ast, {
    VariableDeclarator(path) {
      traverse(path.node, {
        JSXElement(path) {
          if (path.node.openingElement.name.name === 'Query') {
            // hierarchy.query = path.node.openingElement.name.name;
          }
          traverse(path.node, {
            ExpressionStatement(path) {
              traverse(path.node, {
                JSXIdentifier(path) {
                  // hierarchy.addChildComponent(path.node.name);
                  hierarchy.addChildren(path.node.name);
                  // console.log(path.node.name);
                }
              }, path.scope, path.parent);
            }
          }, path.scope, path.parent);
        }
      }, path.scope, path.parent);
    }
  });
};

module.exports = traverseFiles.default();