//Apollo Aperture ast-generator 

const babelParser = require('@babel/parser'),
  fs = require('fs'),
  path = require('path');

const filePath = path.join(__dirname, '..', 'working-files', 'client.js');
const file = fs.readFileSync(filePath, 'utf8');

const ast = babelParser.parse(file, {
  sourceType: 'module',
  plugins: [ 'jsx' ]
});





module.exports = ast;