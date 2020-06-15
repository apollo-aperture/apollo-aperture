/**
 * @file Assembles an array of variables imported from a file
 * ignores npm packages
 */
const path = require('path');

function getFileImportNodes(body) {
  //TODO improve regex and reduce number of methods
  return body
    .filter(node => node.type === 'ImportDeclaration')
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
        specifierNode.type === 'ImportDefaultSpecifier'
      ) {
        fileImport.defaultImport = specifierNode.local.name;
      }
      if (specifierNode.type === 'ImportSpecifier') {
        // use local so imports which are aliased are used
        fileImport.namedImports.push(specifierNode.local.name);
      }
    });
    acc.push(fileImport);
    return acc;
  }, []);
}

function createImportFilePaths(reactProjectDirectory, importMap) {
  return importMap.map(importObj => {
    const fileName = path.parse(importObj.filename).name;
    importObj.filename = path.format({
      dir: reactProjectDirectory,
      base: `${fileName}.js`,
    });
    return importObj;
  });
}

module.exports = function assembleFileImports(reactProjectDirectory, body) {
  const nodesWithFileImports = getFileImportNodes(body);
  const importDeclarationMap = mapImportDeclarations(nodesWithFileImports);
  return createImportFilePaths(reactProjectDirectory, importDeclarationMap);
};
