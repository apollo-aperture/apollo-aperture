// Start AST here
const babelParser = require('@babel/parser'),
  traverse = require('@babel/traverse'),
  babelTypes = require('@babel/types'),
  fs = require('fs'),
  path = require('path');

const bundlePath = path.join(__dirname, '..', 'samples', 'crud_app', 'compiled', 'compiled.js');
///Users/jonathanperalez/WebstormProjects/apollo-aperture/samples/crud_app/compiled/compiled.js
const file = fs.readFileSync(bundlePath, 'utf8');

const ast = babelParser.parse(file, {
  sourceType: 'module',
  plugins: [ 'jsx' ]
});

const myAst = ast;
// Add comment