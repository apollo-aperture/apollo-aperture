/**
 * @file Determines if ReactDOM or render method is in the AST body
 *
 * @typedef {object} ReactDOM
 * @property {boolean} hasReactDOMNode - does ReactDOM or render exist
 * @property {object} reactDOMNode - node with ReactDOM or render
 *
 * @param {object} ASTProgramBodyNode - AST program body
 *
 * @returns {ReactDOM} object - React Node information
 */
function getReactDOMInfo(ASTProgramBodyNode) {
  const expressionStatementNodes = ASTProgramBodyNode.filter(
    node => node.type === 'ExpressionStatement'
  );
  const reactDOMNode = expressionStatementNodes.reduce((acc, node) => {
    const baseExpression = node.expression.callee;
    const isReactDOM =
      baseExpression.object &&
      baseExpression.object.name &&
      baseExpression.object.name === 'ReactDOM';
    if (isReactDOM || baseExpression.name === 'render') acc.push(node);
    return acc;
  }, []);
  return {
    hasReactDOMNode: (reactDOMNode.length > 0),
    reactDOMNode: reactDOMNode[0],
  }
}

module.exports = getReactDOMInfo;
