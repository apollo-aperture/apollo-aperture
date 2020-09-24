/**
 * @file Determines if ReactDOM or render method is in the AST body
 * input an AST program body node
 * returns the 1st argument (JSXElement type) to ReactDOM.render() expression
 * or null if it
 * does not exist
 */
const { generic } = require('./constants');

function getReactDOMRenderBody(ASTProgramBodyNode) {
  const expressionStatementNodes = ASTProgramBodyNode.filter(
    node => node.type === generic.EXPRESSION_STATEMENT
  );
  // code below would work for React Portal
  const reactDOMNode = expressionStatementNodes.reduce((acc, node) => {
    const baseExpression = node.expression.callee;
    const isReactDOM =
      baseExpression.object &&
      baseExpression.object.name &&
      baseExpression.object.name === generic.REACT_DOM;
    if (isReactDOM || baseExpression.name === generic.RENDER) acc.push(node);
    return acc;
  }, []);
  if (reactDOMNode.length < 1) return null;
  return reactDOMNode[0].expression.arguments[0];
}

module.exports = getReactDOMRenderBody;
