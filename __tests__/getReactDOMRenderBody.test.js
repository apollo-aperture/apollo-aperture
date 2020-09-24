const path = require('path');
const genASTProgramBody = require('../traverse/genASTProgramBody');
const getReactDOMRenderBody = require('../traverse/getReactDomRenderBody');

const indexFileName = 'index.js';
const reactProjectIndexFile = path.join(
  __dirname,
  'apollo-react-files/index.js'
);

const reactProjectDirectory = path.dirname(reactProjectIndexFile);

const astProgramBody = genASTProgramBody(reactProjectDirectory, indexFileName);

it('generates the JSX expression inside of ReactDOM.render', () => {
  const reactDOMRenderBody = getReactDOMRenderBody(astProgramBody);
  expect(typeof reactDOMRenderBody).toBe('object');
  expect(reactDOMRenderBody.openingElement.type === 'JSXOpeningElement').toBe(true);
  expect(reactDOMRenderBody.closingElement.type === 'JSXClosingElement').toBe(true);
})