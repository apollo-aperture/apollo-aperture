const helpers = {};
const constants = require('./constants');
const htmlElementsToIgnore = require('./util/htmlElementsToIgnore');
const Hierarchy = require('./util/hierarchy');

// class Hierarchy {
//   constructor(componentName) {
//     this.reactComponent = componentName;
//     this.children = [];
//   }
//   pushChildHierarchy(hierarchy) {
//     this.children.push(hierarchy);
//   }
// }

function findComponentInNode(node, componentName) {
  return (
    node.openingElement &&
    node.openingElement.name &&
    node.openingElement.name.name &&
    node.openingElement.name.name === componentName
  );
}

// does not assemble hierarchy containing React and/or ApolloProvider
helpers.generateComponentTreeFromJSXElement = function generateComponentTreeFromJSXElement(
  node
) {
  function isValidNode(node) {
    return (
      node.openingElement &&
      node.openingElement.name &&
      node.openingElement.name.name &&
      !htmlElementsToIgnore[node.openingElement.name.name]
    );
  }

  function genTree(node, hierarchy = { reactComponent: null, children: [] }) {
    // React
    if (
      node.openingElement &&
      node.openingElement.name &&
      node.openingElement.name.object &&
      node.openingElement.name.object.name &&
      node.openingElement.name.object.name === 'React'
    ) {
      hierarchy.reactComponent = 'React';
    }
    // base case
    // find self closing elements
    // A self-closing element will not have any children
    // unless they're defined as a separate react component (function or variable declaration)
    // or they're in another file
    // if they're in another file, the file will need to be visited,
    // and a hierarchy will need to be assembled
    // and merged into the higher hierarchy
    if (node.openingElement && node.openingElement.selfClosing) {
      if (isValidNode(node)) {
        // could be a variable declaration or
        // it could be an import from another file
        
        // old version just checked the current structure
        hierarchy.reactComponent = node.openingElement.name.name;
        return hierarchy;
      }
    }
    if (isValidNode(node)) {
      hierarchy.reactComponent = node.openingElement.name.name;
    }
    for (let i = 0; i < node.children.length; i++) {
      const curr = node.children[i];
      // this ignores JSXText elements
      if (curr.type === 'JSXElement') {
        hierarchy.children.push(genTree(curr));
      }
    }
    return hierarchy;
  }

  return genTree(node);
};

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
  return null;
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

// finds a named component in current node or in children of node
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
