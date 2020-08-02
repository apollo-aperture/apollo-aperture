const path = require('path');
const traverseReactDom = require('../electron/src/main/traverse/traverseReactDom');


function generateFilePath(filename) {
  const basePath = path.join(
    __dirname,
    'apollo-react-files',
    'fragments',
    'traverse'
  );
  return path.join(basePath, filename);
}

it('tests React and Apollo', () => {
  const completeFilePath = generateFilePath('reactApollo.js');
  const result = traverseReactDom(completeFilePath)
});