/**
 * @file Gathers hierarchies from a file and assembles them
 * @type {module:path}
 */
const path = require('path');
const { generic } = require('./constants');
const assembleFileImports = require('./assembleFileImports');
const assembleHierarchy = require('./assembleHierarchy');
const getASTProgramBody = require('./getASTProgramBody');
const getReactDOMRenderBody = require('./getReactDomRenderBody');
const traverseJSXElement = require('./traverseJSXElement');

function getReact(node) {
  return (
    node.openingElement &&
    node.openingElement.name &&
    node.openingElement.name.object &&
    node.openingElement.name.object.name &&
    node.openingElement.name.object.name === generic.REACT
  );
}

function traverseFile(completeFilePath) {
  const body = getASTProgramBody(completeFilePath);
  // TODO: refactor so getReactDOMRenderBody only runs once ever
  const reactDOMRenderBody = getReactDOMRenderBody(body);

  const fileAnatomy = {
    imports: null,
    hierarchy: null,
    variableDeclarationHierarchies: {},
    defaultExportName: null,
  };

  if (reactDOMRenderBody) {
    fileAnatomy.hierarchy = traverseJSXElement(reactDOMRenderBody, getReact);
  }

  // assign export default declaration
  // for now, assume there is only a default declaration (no named declarations)
  body.forEach(node => {
    if (node.type === generic.EXPORT_DEFAULT_DECLARATION) {
      fileAnatomy.defaultExportName = node.declaration.name;
    }
  });

  fileAnatomy.imports = assembleFileImports(
    path.dirname(completeFilePath),
    body
  );

  // generate object of variable declaration hierarchies
  const variableDeclarations = body.filter(
    node => node.type === generic.VARIABLE_DECLARATION
  );
  variableDeclarations.forEach(node => {
    const declaration = node.declarations[0];

    function isBlockStatement(declaration) {
      return declaration.init.body.type === generic.BLOCK_STATEMENT;
    }

    const jsxElement = isBlockStatement(declaration)
      ? declaration.init.body.body[0].argument
      : declaration.init.body;
    fileAnatomy.variableDeclarationHierarchies[
      declaration.id.name
    ] = traverseJSXElement(jsxElement);
  });

  fileAnatomy.hierarchy = assembleHierarchy(
    traverseFile,
    fileAnatomy.variableDeclarationHierarchies,
    fileAnatomy.imports,
    fileAnatomy.defaultExportName,
    fileAnatomy.hierarchy
  );

  return fileAnatomy.hierarchy;
}

module.exports = traverseFile;
