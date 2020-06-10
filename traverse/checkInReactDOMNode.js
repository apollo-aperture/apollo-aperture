const constants = require('./constants')
// TODO: convert to helper function to find nodes with matching names
function findReactComponent(node, componentName) {
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
        return findReactComponent(current, componentName);
      }
    }
  }
  return false;
}

function findJSXElement(reactNode) {
  const { arguments } = reactNode.expression;
  // we only want an argument with a JSXElement. Ignore CallExpression because
  // that's the second argument to ReactDOM.render which references the DOM
  const JSXElementIndex = arguments.findIndex(el => el.type === constants.jsx.JSXElement);
  if (JSXElementIndex === -1) return null;
  return arguments[JSXElementIndex];
}

function checkForApp(reactNode, appElement) {
  const jsxElement = findJSXElement(reactNode);
  return findReactComponent(jsxElement, appElement);
}

module.exports = checkForApp;
