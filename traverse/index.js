/**
 * ************************************
 *
 * @description Generate a hierarchy object to be consumed by D3
 * It should be returned in the following format:
 * [{
 *   'name': 'Query1',
 *   'children': [ 'foo', 'bar' ]
 * },
 * {
 *   'name': 'Query2',
 *   'children': [ 'foo2', 'bar2' ]
 * }]
 *
 * ************************************
 */

const fs = require('fs');
const parser = require('@babel/parser');
const traverseFiles = require('./traverseFiles');
const findStatelessComponents = require('./stateless');
// const findComponents = require('./findComponents');
const findStatefulComponents = require('./stateful');

// Assemble array of queries and components found in different files
// into an array that can be consumed by D3
function assembleHierarchy(queryComponentArray) {
  // Code for assembly is pending
  return [
    {
      name: 'Query1',
      children: ['foo', 'bar'],
    },
  ];
}

async function init(filePath) {
  try {
    // invoke traverseFiles to get an array of file names
    const files = await traverseFiles(filePath);

    const queriesAndComponents = [];
    // generate an AST of each file
    files.forEach(file => {
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) return err;
        const ast = parser.parse(data, {
          sourceType: 'module',
          plugins: ['jsx'],
        });

        // run it through our ASt processors to find React Components
        // invoke a function to find stateful components
        queriesAndComponents.push(findStatefulComponents(ast));
        // invoke a function to find stateless components
        queriesAndComponents.push(findStatelessComponents(ast));
      });
    });

    // using the array of queries and components,
    // merge them using assembleHierarchy
    return assembleHierarchy(queriesAndComponents);
  } catch (err) {
    return err;
  }
}

module.exports = init;
