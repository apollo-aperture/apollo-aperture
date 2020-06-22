const helpers = {};
const constants = require('./constants');
const htmlElementsToIgnore = require('./util/htmlElementsToIgnore');

// every helper function should have a contains method and a return nodes method
// 1. intake AST node and if the desired node is found
// 2. then return nodes that match - should also return an object of the different
// nodes that are children - SHOULD THIS BE A LINKED LIST?
// 3. if not, then return false or undefined

// find JSX inside of code blocks inside of a react component
helpers.findJSXExpressionContainer = function findJSXExpressionContainer(node) {
  if (node.type === constants.jsx.JSXExpressionContainer) return true;
};

helpers.getBlockStatement = function getBlockStatement(node) {
  node = Array.isArray(node) ? node[0] : node;
  if (
    node.body &&
    node.body.type &&
    node.body.type === constants.generic.BlockStatement
  ) {
    return node.body;
  }
  return undefined;
};

helpers.getReturnStatementNode = function getReturnStatementNode(node) {
  if (node.body && node.body.length > 0) {
    for (let i = 0; i < node.body.length; i++) {
      const currentNode = node.body[i];
      if (currentNode.type === constants.generic.ReturnStatement)
        return currentNode;
    }
  }
  return null;
};

// assembles a hierarchy of components
helpers.loadASTFromDefaultImport = (reactProjectDirectory, filename) => {

}

helpers.importedComponentsInFileImports = (node, fileImports, appState) => {
  // the first time this runs, this is the top level file (index.js)
  // for each filename in fileImports[i].defaultImport and
  // for each filename in fileImports[i].namedImports[j]
  // find them inside the node and add create their hierarchy
  // need directory in order to find next file
  fileImports.forEach(fileImport => {
    const { defaultImport } = fileImport;
    // look for the defaultImport value in the node
    if (helpers.isComponentInChildren(node, defaultImport)) {
      // add it to the hierarchy
      appState.dispatch({
        type: 'addComponent',
        payload: defaultImport,
      });
      // look for named imports and iterate
      if (fileImport.namedImports) {
        fileImport.namedImports.forEach(namedImport => {
          if (helpers.isComponentInChildren(node, namedImport)) {
            appState.dispatch({
              type: 'addComponent',
              payload: namedImport,
            });
          }
          // check inside of App.js
        });
      }
    }
  });
};

// finds a named component
helpers.isComponentInChildren = function isComponentInChildren(
  node,
  componentName
) {
  function findComponent(node, componentName) {
    function foundMatch(node, componentName) {
      return (
        node.openingElement &&
        node.openingElement.name &&
        node.openingElement.name.name &&
        node.openingElement.name.name === componentName
      );
    }

    if (foundMatch(node, componentName)) return true;
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        const current = node.children[i];
        if (foundMatch(current, componentName)) return true;
        if (current.children) {
          return findComponent(current, componentName);
        }
      }
    }
    return false;
  }

  return findComponent(node, componentName);
};

helpers.ignoreElement = function(elementName) {
  return htmlElementsToIgnore[elementName];
};

module.exports = helpers;
