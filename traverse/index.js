const fs = require('fs');
const traverseFiles = require('./traverseFiles');
const assembleComponents = require('./newAstTraversal');

// used for testing
const globPath = '../samples/spacex/src/**/*.js';

// load the selected directory
// console.log('result: ', traverseDirectory(globPath));

function HierarchyConstructor() {
  this.name = 'Query';
  this.children = [];
}

HierarchyConstructor.prototype.addChildren = componentName => {
  this.children.push({ name: componentName });
};

(async function init() {
  try {
    const files = await traverseFiles(
      '../samples/spacex/src/components/Launches.js',
    );
    console.log(files);
  } catch (err) {
    console.log(err);
  }
})();

/* traverseFiles('../samples/spacex/src/components/Launches.js')
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
  }); */
