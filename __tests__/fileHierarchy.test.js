const path = require('path');
const getFileAnatomy = require('../electron/src/main/traverse/fileAnatomy');
const fileHierarchy = require('../electron/src/main/traverse/fileHierarchy');

const filename = 'fileAnatomyTest.js';
const completeFilePath = path.join(
  __dirname,
  'apollo-react-files',
  filename
);

it('gets the hierarchy for a file', () => {
  const fileAnatomy = getFileAnatomy(completeFilePath);
  const result = fileHierarchy(fileAnatomy);
  console.log(result);
});