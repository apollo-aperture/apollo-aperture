/**
 * @file Determines if ReactDOM or render method is in the AST body
 * input an AST program body node
 * returns the 1st argument to ReactDOM.render() expression or null if it
 * does not exist
 */
function getReactDOMInfo(ASTProgramBodyNode) {
  const expressionStatementNodes = ASTProgramBodyNode.filter(
    node => node.type === 'ExpressionStatement'
  );
  // code below would work for React Portal
  const reactDOMNode = expressionStatementNodes.reduce((acc, node) => {
    const baseExpression = node.expression.callee;
    const isReactDOM =
      baseExpression.object &&
      baseExpression.object.name &&
      baseExpression.object.name === 'ReactDOM';
    if (isReactDOM || baseExpression.name === 'render') acc.push(node);
    return acc;
  }, []);
  if (reactDOMNode.length < 1) return null;
  return reactDOMNode[0].expression.arguments[0];
}

module.exports = getReactDOMInfo;
