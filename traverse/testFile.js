const parser = require('@babel/parser');
const fs = require('fs');
const findComponents = require('./findComponents');

// const file = '../samples/spacex_simplified/src/components/App.js';
const file = '../samples/test_cases/stateful.js';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) console.log(err);
  const ast = parser.parse(data, {
    sourceType: 'module',
    plugins: ['jsx'],
  });

  function HierarchyConstructor() {
    this.name = 'Query';
    this.children = [];
  }

  HierarchyConstructor.prototype.addChildren = function addChildren(componentName) {
    this.children.push({ name: componentName });
  };
  const hierarchy = new HierarchyConstructor();

  /*
  * Not sure if I want to pass an instance of an object
  * or use the return from the findComponents function
  * */
  findComponents(ast, hierarchy);
  console.log('hierarchy here', hierarchy);
});
