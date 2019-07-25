const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const path = require('path');
const htmlElementsToIgnore = require('./util/htmlElementsToIgnore');
const stateful = require('./stateful');
const fs = require('fs');

const assembleComponents = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) reject(err);
      const ast = parser.parse(data, {
        sourceType: 'module',
        plugins: ['jsx'],
      });
      resolve(ast);
    });
  });
};

module.exports = assembleComponents;
