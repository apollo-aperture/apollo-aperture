const path = require('path');
const genASTProgramBody = require('./genASTProgramBody');

const assembleFileImports = require('./detectFileImports');
const getReactDOMInfo = require('./getReactDOMInfo');
const checkForApp = require('./checkInReactDOMNode');

const getClassDeclarations = require('./getClassDeclarations');
const hasApolloProvider = require('./hasApolloProvider');
const classComponents = require('./classComponents');

// location of react's index.js file
const reactProjectIndexFile = path.join(
  __dirname,
  '..',
  'samples/complete-traversal-test/index.js'
);
const reactProjectDirectory = path.dirname(reactProjectIndexFile);

// const file = fs.readFileSync(reactProjectIndexFile, 'utf8');
// const ast = parser.parse(file, {
//   sourceType: 'module',
//   plugins: ['jsx'],
// });

// const astProgramBody = ast.program.body;
const astProgramBody = genASTProgramBody(reactProjectDirectory, 'index.js');

const reactDOMInfo = getReactDOMInfo(astProgramBody);

const hierarchy = {
  structure: null,
  addComponentNode: function(name) {
    if (this.structure === null) this.structure = { name, children: [] };
  },
};

if (reactDOMInfo.hasReactDOMNode) {
  if (hasApolloProvider(astProgramBody)) {
    const fileImports = assembleFileImports(
      reactProjectDirectory,
      astProgramBody
    );

    // find apollo component
    const reactDOMNode = reactDOMInfo.reactDOMNode;


    // iterate through fileImports and examine hierarchy in each imported file
    fileImports.forEach(fileImport => {
      console.log('fileImport: ', fileImport);
    });

    // appName = object with filename, defaultImport, and imports array
    // old version
    /*const appName = fileImports.reduce((acc, file) => {
      // look for App component
      if (file.defaultImport === 'App') acc = file.defaultImport;
      return acc;
    });

    const reactDOMNode = reactDOMInfo.reactDOMNode;
    // check if App component is rendered by react DOM
    if (checkForApp(reactDOMNode, appName.defaultImport)) {
      // Read AST of App.js
      const appASTBody = genASTProgramBody(
        reactProjectDirectory,
        appName.defaultImport
      );
      // pass AST to function to find class based components
      const foo = getClassDeclarations(appASTBody);
      console.log(foo);
      // find React components in import declarations in App.js
      // find class declarations in App.js
      // find if the components in the import declarations are in the class declaration
      // generate linkage between App.js and ImportedComponent
    } else {
      console.log('App not imported');
    }*/
  } else {
    console.log('apollo not found in project');
  }
} else {
  console.log('ReactDOM import not found');
}
