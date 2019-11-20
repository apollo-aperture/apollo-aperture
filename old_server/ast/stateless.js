const parser = require('@babel/parser'),
  traverse = require('@babel/traverse').default,
  t = require('@babel/types'),
  fs = require('fs'),
  path = require('path'),
  htmlElementsToIgnore = require('./util/htmlElements');

/*
const loadFile = new Promise(
  (resolve, reject) => {
    const filePath = path.join(__dirname, '..', 'samples', 'test_cases', 'stateless.js');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  }
);

const ast = function () {
  loadFile
    .then(file => {
      return parser.parse(file, {
        sourceType: 'module',
        plugins: [ 'jsx' ]
      });
    })
    .catch(err => {
      console.log(err);
    });
};*/

(init = async () => {
  const filePath = path.join(__dirname, '..', 'samples', 'test_cases', 'stateful.js');

})();

