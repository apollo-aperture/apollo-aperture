/*
 * Intakes a file and returns the body of the file
 */

const fs = require('fs');
const parser = require('@babel/parser');

function getASTProgramBody(completeFilePath) {
  // filename = /.js/gi.test(filename) ? filename : `${filename}.js`;
  // const filePath = path.join(directory, filename);
  const file = fs.readFileSync(completeFilePath, 'utf8');
  const ast = parser.parse(file, {
    sourceType: 'module',
    plugins: ['jsx'],
  });
  return ast.program.body;
}

module.exports = getASTProgramBody;
