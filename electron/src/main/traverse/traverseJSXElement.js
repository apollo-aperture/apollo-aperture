/**
 * @file Returns component hierarchy from a JSX Element
 */
const notHTMLElement = require('./util/notHTMLElement');
const Hierarchy = require('./util/Hiearchy');
const { jsx, generic } = require('./constants');

function traverseJSXElement(node, func, hierarchy = new Hierarchy()) {
  if (func != null && func(node)) {
    // hierarchy.setReactComponent('React');
    hierarchy.setReactComponent(generic.REACT);
  }
  // self-closing element
  if (
    node.openingElement &&
    node.openingElement.selfClosing &&
    notHTMLElement(node)
  ) {
    // hierarchy.reactComponent = node.openingElement.name.name;
    hierarchy.setReactComponent(node.openingElement.name.name);
  }
  // non-HTML JSXElement
  if (
    node.openingElement &&
    node.openingElement.name &&
    node.openingElement.name.name &&
    notHTMLElement(node)
  ) {
    hierarchy.setReactComponent(node.openingElement.name.name);
    // hierarchy.reactComponent = node.openingElement.name.name;
  }
  // look at children
  if (node.children && node.children.length > 0) {
    for (let childNode of node.children) {
      // if (childNode.type === 'JSXElement') {
      if (childNode.type === jsx.JSX_ELEMENT) {
        if (hierarchy.reactComponent !== null) {
          const childHierarchy = traverseJSXElement(childNode);
          if (childHierarchy != null) {
            hierarchy.addChildComponent(childHierarchy);
          }
        } else {
          hierarchy = traverseJSXElement(childNode);
        }
      }
    }
  }
  return hierarchy == null || hierarchy.reactComponent == null
    ? null
    : hierarchy;
  // return hierarchy;
}

module.exports = traverseJSXElement;
