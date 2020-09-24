const htmlElementsToIgnore = require('./htmlElementsToIgnore');

function isNotHTMLElement(node) {
  return (
    node.openingElement &&
    node.openingElement.name &&
    node.openingElement.name.name &&
    !htmlElementsToIgnore[node.openingElement.name.name]
  );
}

module.exports = isNotHTMLElement;
