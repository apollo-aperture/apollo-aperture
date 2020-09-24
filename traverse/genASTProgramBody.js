const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');

function getASTProgramBody(directory, filename) {
  filename = /.js/gi.test(filename) ? filename : `${filename}.js`;
  const filePath = path.join(directory, filename);
  const file = fs.readFileSync(filePath, 'utf8');
  const ast = parser.parse(file, {
    sourceType: 'module',
    plugins: ['jsx'],
  });
  return ast.program.body;
}

module.exports = getASTProgramBody;