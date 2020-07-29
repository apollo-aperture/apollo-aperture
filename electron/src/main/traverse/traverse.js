const path = require('path');
const assembleFileImports = require('./assembleFileImports');
const getFileAnatomy = require('./fileAnatomy');
const traverseJSXElement = require('./traverseJSXElement');
const getASTProgramBody = require('./genASTProgramBody');
const getReactDOMRenderBody = require('./getReactDomRenderBody');
const notHTMLElement = require('./util/notHTMLElement');
const { generic } = require('./constants');

const defaultHierarchy = {
  reactComponent: null,
  children: [],
};

function getReact(node) {
  return (
    node.openingElement &&
    node.openingElement.name &&
    node.openingElement.name.object &&
    node.openingElement.name.object.name &&
    node.openingElement.name.object.name === 'React'
  );
}

// accept fileAnatomy
// returns a hierarchy provided that a variable, function, or class matches
// a default export and/or named export
function traverse(completeFilePath) {
  const body = getASTProgramBody(completeFilePath);
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

  const directory = path.dirname(completeFilePath);
  fileAnatomy.imports = assembleFileImports(directory, body);

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
    fileAnatomy.defaultExportName,
    fileAnatomy.variableDeclarationHierarchies,
    fileAnatomy.imports
  );

  function assembleHierarchy(componentName, hierarchies, imports) {
    const rootObject = hierarchies[componentName];

    function componentInImports(componentName, imports) {
      for (let idx = 0; idx < imports.length; idx++) {
        if (imports[idx].defaultImport === componentName) return idx;
      }
      return false;
    }

    function assemble(hierarchyObject) {
      // if component has no children
      // find if it exists in variables or imports
      if (hierarchyObject.children.length < 1) {
        let componentExistsInImports = componentInImports(
          hierarchyObject.reactComponent,
          imports
        );
        // look up in variables
        if (hierarchies[hierarchyObject.reactComponent]) {
          // add matching component declared in the hierarchies as a child
          hierarchyObject.children.push(
            assemble(hierarchies[hierarchyObject.reactComponent])
          );
        } else if (componentExistsInImports !== false) {
          const importHierarchy = traverse(
            imports[componentExistsInImports].filename
          );
          hierarchyObject.children.push(importHierarchy);
        } else {
          return hierarchyObject;
        }
      }
      let children = hierarchyObject.children;
      for (let i = 0; i < children.length; i++) {
        let childName = children[i].reactComponent;
        if (hierarchies[childName]) {
          const childHierarchy = assemble(hierarchies[childName]);
          children[i].children.push(childHierarchy);
        }
      }
      return hierarchyObject;
    }

    return assemble(rootObject);
  }

  return fileAnatomy.hierarchy;
  // assemble hierarchy of variables
  // could be recursive

  /*// find React components in the file
  // generate a hierarchy
  // and return it
  const fileAnatomy = getFileAnatomy(completeFilePath);
  const {
    variableDeclarations,
    // functionDeclarations,
    // classes,
    exportDefaultDeclaration
    // exportNamedDeclarations,
  } = fileAnatomy.anatomy;
  
  // check if default export is defined, if not, look at named declarations
  if (exportDefaultDeclaration) {
    const defaultExportComponentName =
      exportDefaultDeclaration.declaration.name;
    // check if it is the same as any of the variables, functions, or classes
    for (let variableDec of variableDeclarations) {
      const { declarations } = variableDec;
      for (let declaration of declarations) {
        const {
          id: { name }
        } = declaration;
        if (name === defaultExportComponentName) {
          // hierarchy is generated based on this component
          const { body: jsxElement } = declaration.init;
          // traverse it
          const result = traverseJSXElement(jsxElement);
          console.log(result);
          
        }
      }
    }
  }*/

  // look for function declarations, variable declarations, or classes
  // that match the parentNode
  // iterate through variable declarations
  // return hierarchy;
}

module.exports = traverse;
