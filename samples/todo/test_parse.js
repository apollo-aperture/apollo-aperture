const babelParser = require('@babel/parser');
const babelTypes = require('@babel/types');
const fs = require('fs');
const path = require('path');
const acorn = require('acorn');
const jsx = require('acorn-jsx');
const walk = require('acorn-walk')

const bundlePath = path.join(__dirname, 'App.js');
const file = fs.readFileSync(bundlePath, 'utf8');

// const ast = babelParser.parse(file, {
//   sourceType: 'module',
//   plugins: ['jsx']
// })


const ast = acorn.Parser.extend(jsx()).parse(file, { sourceType: 'module' });

const findAfterResults = walk.findNodeAfter(ast, null, null, "VariableDeclaration")
console.log(findAfterResults)

// console.log('wrote an AST!');

// html element dictionary
// We don't want to include these elements in our tree?
// This is so we can target React elements
const htmlElementsToIgnore = {
  'h2': true,
  'div': true,
  'p': true
};

// const foo = ast;
// console.log(foo);

// TODO: file can have ImportDeclaration
// TODO: file can have VariableDeclaration
function returnVariableDeclarations(node) {
  const nodeObj = {};
  // iterate through declarations
  node.declarations.forEach(declarationNode => {
    nodeObj.reactElementName = declarationNode.id.name;
    const children = [];
    const childNodes = declarationNode.init.body.children;

    // iterate through children
    if (childNodes.length > 0) {
      childNodes.forEach(child => {
        if (child.type === 'JSXElement' && child.openingElement.name.type === 'JSXIdentifier' && !htmlElementsToIgnore[child.openingElement.name.name]) {
          children.push(child.openingElement.name.name);
        }
      });
    }
    nodeObj.children = children;
  });
  return nodeObj;
}

function createTree(ast) {
  const tree = [];
  // iterate through nodes
  ast.program.body.forEach(node => {
    // check for VariableDeclarations
    switch (node.type) {
      case 'VariableDeclaration':
        tree.push(returnVariableDeclarations(node));
        break;
      default:
        break;
    }
  });
  return tree;
}

// New function to extract relevant components

const reactComponents = [];


function createTree2(ast) {
  const tree = [];
  // iterate through nodes
  ast.program.body.forEach(node => {
    // check for VariableDeclarations
    switch (node.type) {
      case 'VariableDeclaration':
        tree.push(returnVariableDeclarations2(node));
        break;
      default:
        break;
    }
  });
  return tree;
}


function returnVariableDeclarations2(node) {
  const nodeObj = {};
  // iterate through declarations
  node.declarations.forEach(declarationNode => {
    nodeObj.reactElementName = declarationNode.id.name;
    const children = [];
    const childNodes = declarationNode.init.body //.children;

    // HELPER FUNCTION

    // console.log(childNodes)

    // iterate through children
    // if (childNodes !== undefined && childNodes.length > 0) {
    //   childNodes.forEach(child => {
    //     if (child.type === 'JSXElement' && child.openingElement.name.type === 'JSXIdentifier' && !htmlElementsToIgnore[child.openingElement.name.name]) {
    //       children.push(child.openingElement.name.name);
    //     }
    //   });
    // }
    // nodeObj.children = children;



  });
  return nodeObj;
}

// console.log(createTree2(ast))







// const outputPath = path.join(__dirname, 'relevantComponents');
const outputPath = path.join(__dirname, 'componentOutput4.json');
// fs.writeFileSync(outputPath, JSON.stringify(createTree(ast)));
fs.writeFileSync(outputPath, JSON.stringify(findAfterResults));
// console.log('wrote file');

