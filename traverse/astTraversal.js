/* This file actually creates the JSON file which is used by the visualizer */
const parser = require('@babel/parser'),
  traverse = require('@babel/traverse').default,
  t = require('@babel/types'),
  fs = require('fs'),
  path = require('path'),
  htmlElementsToIgnore = require('./util/htmlElementsToIgnore.js');

//const filePath = path.join(__dirname, '..', 'samples', 'todo', 'App.js');
const filePath = path.join(__dirname, '..', 'samples', 'test_cases', 'stateless.js');
const file = fs.readFileSync(filePath, 'utf8');

const ast = parser.parse(file, {
  sourceType: 'module',
  plugins: [ 'jsx' ]
});


//this is our main store
// this hierarchy constructor was used to conform with Raffi's d3 implementation
const hierarchyContainer = {
  Query: []
}
// function HierarchyConstructor() {
//   this.name = 'Query';
//   this.children = [];
// }

// HierarchyConstructor.prototype.addChildren = function(componentName) {
//   this.children.push({name: componentName});
// };

const addChildren = (componentName) => {
  hierarchyContainer.Query.push({name: componentName});
}

// const hierarchy = new HierarchyConstructor();

//this is a stateless traversal ***
const traverseFiles = {
  // default is used so this function can be named and invoked on module.exports
  default() {
      // search for ApolloClient declaration and copy body to apolloClientVar
      // first look for REACTDOM import to find if we're in the index.js file
      // first find the file that we want so we can read it
      findStatelessComponents(ast);
      findQueries(ast);
      //return hierarchy
      return hierarchyContainer;
  }
};

const findStatelessComponents = ast => {
  traverse(ast, {
    VariableDeclarator(path) {
      traverse(path.node, {
        JSXElement(path) {
          if (!htmlElementsToIgnore[ path.node.openingElement.name.name ] && path.parent.type !== 'CallExpression') {
            addChildren(path.node.openingElement.name.name);
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
          }
          traverse(path.node, {
            ExpressionStatement(path) {
              traverse(path.node, {
                JSXIdentifier(path) {
                  // hierarchy.addChildren(path.node.name);
                  addChildren(path.node.name);
                }
              }, path.scope, path.parent);
            }
          }, path.scope, path.parent);
        }
      }, path.scope, path.parent);
    }
  });
};

//this is a stateful traversal ***
// const cache = [];
// function traverseAst(ast) {
//   const visitorUtility = {
//     ClassDeclaration(path) {
//       path.traverse({
//         ClassBody(path) {
//           path.traverse({
//             ClassMethod(path) {
//               path.traverse({
//                 BlockStatement(path) {
//                   path.traverse({
//                     ReturnStatement(path) {
//                       path.traverse({
//                         JSXIdentifier(path) {
//                           cache.push(path);  
//                         }
//                       });
//                     }
//                   });
//                 }
//               });
//             }
//           });
//         }
//       });
//     }
//   };
//   traverse(ast, {
//     enter(path) {
//       path.traverse(visitorUtility);
//     }
//   });
// }

// const components = cache.filter(el => el.node.type === 'JSXIdentifier').filter(el => {  // Push the components to the store. Components filter from cache. 
//   //console.log(el);
//   if (!htmlElementsToIgnore[ el.node.name ]) {
//     if (el.node.name === 'Query') {
//       return true;
//     }
//     //hierarchy.addChildren(el.node.name);
//       addChildren(el.node.name);
//   }
// });
//**End of stateful traverse***



traverseFiles.default();
console.log(hierarchyContainer);

module.exports = hierarchyContainer;