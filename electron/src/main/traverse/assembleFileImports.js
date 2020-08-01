/**
 * @file Assembles an array of variables imported from a file
 * ignores npm packages
 * returns a function that returns an array:
 * [
 *  {
 *    filename: '[filePath]/App.js',
 *    defaultImport: 'App',
 *    namedImports: ['Foo', 'Bar'],
 *  }
 * ]
 */
const path = require('path');
const { generic } = require('./constants');

function assembleFileImports(directory, astProgramBody) {
  const nodesWithFileImports = getFileImportNodes(astProgramBody);
  const importDeclarationMap = mapImportDeclarations(nodesWithFileImports);
  return createImportFilePaths(directory, importDeclarationMap);
}

function getFileImportNodes(ASTProgramBody) {
  //TODO improve regex and reduce number of methods
  return ASTProgramBody.filter(node => node.type === generic.IMPORT_DECLARATION)
    .filter(
      node =>
        !/(\.|\.\.)\/\S*(\.css|serviceWorker|.styled)/gi.exec(node.source.value)
    )
    .filter(node => /(\.|\.\.)\/\S*/.exec(node.source.value));
  // .map(node => node.source.value);
}

function mapImportDeclarations(importDeclarationNodes) {
  return importDeclarationNodes.reduce((acc, node) => {
    const fileImport = {
      filename: node.source.value,
      defaultImport: null,
      namedImports: [],
    };
    node.specifiers.forEach(specifierNode => {
      if (
        !fileImport.defaultImport &&
        specifierNode.type === generic.IMPORT_DEFAULT_SPECIFIER
      ) {
        fileImport.defaultImport = specifierNode.local.name;
      }
      if (specifierNode.type === generic.IMPORT_SPECIFIER) {
        // use local so imports which are aliased are used
        fileImport.namedImports.push(specifierNode.local.name);
      }
    });
    acc.push(fileImport);
    return acc;
  }, []);
}

//TODO make this work with ../

// Gets files imported with ./[filename] and ../[filename]
function createImportFilePaths(reactProjectDirectory, importMap) {
  return importMap.map(importObj => {
    const directory = path.parse(importObj.filename).dir;
    const filename = path.parse(importObj.filename).name;
    const joinedPath = path.join(reactProjectDirectory, directory);
    importObj.filename = path.format({
      dir: joinedPath,
      base: `${filename}.js`,
    });
    return importObj;
  });
}

module.exports = assembleFileImports;
