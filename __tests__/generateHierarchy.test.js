const path = require('path');
const generateHierarchy = require('../electron/src/main/traverse/generateHierarchy');

it('generates the hierarchy', () => {
  const completeFilePath = path.join(
    __dirname,
    'apollo-react-files',
    'complete-traversal',
    'index.js'
  );
  // console.log(filename);
  const result = generateHierarchy(completeFilePath);
  console.log('result', result);
});

it('generates hierarchy of App', () => {
  const completeFilePath = path.join(
    __dirname,
    'apollo-react-files',
    'complete-traversal',
    'App.js'
  );
  // console.log(filename);
  const result = generateHierarchy(completeFilePath);
  console.log('result', result);
});
