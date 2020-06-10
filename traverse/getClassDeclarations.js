const helpers = require('./componentHelpers');
const constants = require('./constants');

// function getReturnStatementNode(node) {
//   if (node.body && node.body.length > 0) {
//     for (let i = 0; i < node.body.length; i++) {
//       const currentNode = node.body[i];
//       if (currentNode.type === constants.generic.ReturnStatement) return currentNode;
//     }
//   }
//   return undefined;
// }

function getReturnStatementArg(returnStatement) {
  return returnStatement.argument ? returnStatement.argument : false;
}

function getReturnStatementArgChildren(returnStatementArg) {}

function checkIfValidReact(returnStatementArg) {
  // check if type is not JSXElement
  if (!returnStatementArg.type && returnStatementArg.type !== constants.jsx.JSXElement)
    return false;
  // check is return statement has JSX opening and closing elements
  // Component class has method return that returns <div>{// code or components}</div>
  function checkIfValidReact(type) {
    const check = {
      OpeningElement: 'openingElement',
      ClosingElement: 'closingElement',
    };
    const key = check[type];
    return (
      returnStatementArg[key] &&
      returnStatementArg[key].type &&
      returnStatementArg[key].type === `JSX${type}`
    );
  }

  if (!checkIfValidReact('OpeningElement')) return false;
  return checkIfValidReact('ClosingElement');
}

function findComponentInReturnStatementChildren(returnStatementArg, componentName) {
  const foo = helpers.isComponentInChildren(returnStatementArg, 'ImportedComponent');
  console.log('foo: ', foo);
}

// class based React components
function getClassDeclarations(astBody) {
  // gather all class declarations
  const classNodes = astBody.filter(el => el.type === constants.generic.ClassDeclaration);
  if (!classNodes) return null;

  classNodes.forEach(node => {
    // look for render method
    if (node.body && node.body.body) {
      // all nodes with class methods of a React Component
      const classMethodNodes = node.body.body.filter(node => {
        return node.type === constants.generic.ClassMethod;
      });
      // find method with the render method
      const renderNodes = classMethodNodes.filter(node => {
        return node.key && node.key.name && node.key.name === constants.generic.render;
      });

      const blockStatement = helpers.getBlockStatement(renderNodes);
      const returnStatement = helpers.getReturnStatementNode(blockStatement);
      const returnStatementArg = getReturnStatementArg(returnStatement);
      if (!checkIfValidReact(returnStatementArg)) return false;
      findComponentInReturnStatementChildren(returnStatementArg);
      // check for children inside of return statement and find if the
      // react component which was imported is inside of the children
      console.log(returnStatementArg);
    }
  });
}

module.exports = getClassDeclarations;
