const fs = require('fs');
const parser = require('@babel/parser');
const path = require('path');
const traverseFiles = require('./traverseFiles');
const findStatelessComponents = require('./stateless');
const findComponents = require('./findComponents');
const findStatefulComponents = require('./stateful');


// testing purposes//
const filePath = path.join(__dirname, '..', 'samples', 'test_cases', 'stateful.js');
//const filePath = path.join(__dirname, '..', 'samples', 'test_cases', 'stateless.js');
const file = fs.readFileSync(filePath, 'utf8');
const ast = parser.parse(file, {
  sourceType: 'module',
  plugins: ['jsx'],
});
// testing purposes//

// Main container of our components
const hierarchyContainer = {
  name: '',
  children: [],
};

async function init(filePath) {
  try {
    // get array of file names
    const files = await traverseFiles(filePath);
    // for each file, read it
    // then run it through the AST traversal
    // then use the output of the traversal to add to the hierarchy

    // const hierarchy = new HierarchyConstructor();

    // files ['lauches.js', 'dateOfLaunch.js', 'query.js']
    files.forEach(file => {
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) return err;
        const ast = parser.parse(data, {
          sourceType: 'module',
          plugins: ['jsx'],
        });

        // process ast for each file
        findComponents(ast, hierarchyContainer);
        // run a function to find stateless components
        const statelessComponents = findStatelessComponents(ast);
        const statefulComponents = findStatefulComponents(ast);
        // run a function to find stateful components
        // 1 - react component Launches
        // 2 - react component DateOfLaunch
        // 3 - Apollo Query - that has Launches and DateOfLaunch as child components
        // {Query: 'LaunchQuery', children: ['Launches', 'DateOfLaunch']}
      });
    });
    // return hierarchy;
    return hierarchyContainer;
    // add each query or component to the hierarchy constructor
  } catch (err) {
    return err;
    // console.log(err);
  }
}


findStatefulComponents(ast)

module.exports = init;
