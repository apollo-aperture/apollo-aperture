const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');

const traverse = require('@babel/traverse').default;
const htmlElementsToIgnore = require('../traverse/util/htmlElementsToIgnore');

function findQueriesInClassNodes(classNodes) {
  function findClassMethods(nodeArrays, node) {
    // if (node.body && node.body.body && node.body.body.length > 0) {
    //   const nodes = node.body.body;
    //   console.log(nodes);
    //   // ignore constructors
    // };
    // return nodeArrays;
  }

  const nonConstructorClassMethods = classNodes.reduce(findClassMethods, []);
}

function findStatefulComponents(ast) {
  const { body } = ast.program;
  // find import declarations
  // const importDeclarations = body.filter(
  //   node => node.type === 'ImportDeclaration'
  // );
  // find which import declarations point to file imports
  // const fileImports = importDeclarations.filter(node =>
  //   /(\.|\.\.)\/\S+/g.exec(node.source.value)
  // );

  const fileImports = body
    .filter(node => node.type === 'ImportDeclaration')
    .filter(node => /(\.|\.\.)\/\S+/g.exec(node.source.value))
    .map(node => node.source.value);

  const importStatement = fileImports[0];
  const filePath = path.join(__dirname, importStatement);
  const file = fs.readFileSync(filePath, 'utf8');
  console.log('file', file);

  // later use reduce to create an object with file import declarations and class declarations

  // find all class declarations in a file
  const classNodes = body.filter(el => el.type === 'ClassDeclaration');
  // for each class declaration
  classNodes.forEach(classNode => {
    // find
    const classMethods = classNodes.reduce((acc, node) => {
      if (node.body && node.body.body && node.body.body.length > 0) {
        node.body.body.forEach(bodyNode => {
          if (bodyNode.kind !== 'constructor') acc.push(bodyNode);
        });
      }
      return acc;
    }, []);
    console.log(classMethods);
  });
}

module.exports = findStatefulComponents;
