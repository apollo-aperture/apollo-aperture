const path = require('path');
const getFileAnatomy = require('../electron/src/main/traverse/fileAnatomy');

const filename = 'fileAnatomy.js';
const completeFilePath = path.join(
  __dirname,
  'apollo-react-files',
  filename
);

it('get the file anatomy for a given file', () => {
  const fileAnatomy = getFileAnatomy(completeFilePath);
  const { variableDeclarations } = fileAnatomy.anatomy;
  console.log(variableDeclarations);
  expect(fileAnatomy).toHaveProperty('imports');
});