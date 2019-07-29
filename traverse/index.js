const fs = require('fs');
const parser = require('@babel/parser');
const traverseFiles = require('./traverseFiles');
const findComponents = require('./findComponents');

function HierarchyConstructor() {
  this.name = 'Query';
  this.children = [];
}

HierarchyConstructor.prototype.addChildren = componentName => {
  this.children.push({ name: componentName });
};

async function init(filePath) {
  try {
    // get array of file names
    const files = await traverseFiles(filePath);
    // for each file, read it
    // then run it through the AST traversal
    // then use the output of the traversal to add to the hierarchy

    const hierarchy = new HierarchyConstructor();

    files.forEach(file => {
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) return err;
        const ast = parser.parse(data, {
          sourceType: 'module',
          plugins: ['jsx'],
        });

        // process ast for each file
        findComponents(ast, hierarchy);
      });
    });
    return hierarchy;
    // add each query or component to the hierarchy constructor
  } catch (err) {
    return err;
    // console.log(err);
  }
}

/*
traverseFiles('../samples/spacex/src/components/Launches.js')
  .then(files => {
    files.forEach(file => {
      assembleComponents(file)
        .then(ast => {
          console.log('ast', ast);
        })
        .catch(err => {
          console.log(err);
        });
    });
  })
  .catch(err => {
    console.log(err);
  });
*/

module.exports = init;
