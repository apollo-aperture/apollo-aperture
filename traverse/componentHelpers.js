const helpers = {};
const constants = require('./constants');
const htmlElementsToIgnore = {
  a: true,
  article: true,
  audio: true,
  b: true,
  blockquote: true,
  body: true,
  br: true,
  button: true,
  canvas: true,
  caption: true,
  cite: true,
  code: true,
  col: true,
  dialog: true,
  div: true,
  dl: true,
  dt: true,
  em: true,
  embed: true,
  font: true,
  footer: true,
  form: true,
  foreignObject: true,
  frame: true,
  g: true,
  h1: true,
  h2: true,
  h3: true,
  h4: true,
  h5: true,
  h6: true,
  header: true,
  hr: true,
  html: true,
  i: true,
  iframe: true,
  img: true,
  input: true,
  kbd: true,
  label: true,
  legend: true,
  li: true,
  link: true,
  main: true,
  map: true,
  menu: true,
  noscript: true,
  object: true,
  ol: true,
  option: true,
  p: true,
  path: true,
  param: true,
  pre: true,
  progress: true,
  q: true,
  rb: true,
  rt: true,
  ruby: true,
  s: true,
  samp: true,
  script: true,
  section: true,
  select: true,
  small: true,
  source: true,
  span: true,
  strong: true,
  style: true,
  sub: true,
  summary: true,
  svg: true,
  table: true,
  tbody: true,
  td: true,
  th: true,
  thead: true,
  title: true,
  tr: true,
  track: true,
  u: true,
  ul: true,
  var: true,
  video: true,
  wbr: true,
};

// every helper function should have a contains method and a return nodes method
// 1. intake AST node and if the desired node is found
// 2. then return nodes that match - should also return an object of the different
// nodes that are children - SHOULD THIS BE A LINKED LIST?
// 3. if not, then return false or undefined

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
  return undefined;
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

// assembles a hierarchy of components
helpers.componentsInChildren = function listComponentsInChildren(node) {};

helpers.findImportedComponents = (node, fileImports, hierarchy) => {
  // console.log('fileImports: ', fileImports);
  // for each filename in fileImports[i].defaultImport and
  // for each filename in fileImports[i].namedImports[j]
  // find them inside the node and add create their hierarchy
  fileImports.forEach(fileImport => {
    const { defaultImport } = fileImport;
    // look for the defaultImport value in the node
    if (helpers.isComponentInChildren(node, defaultImport)) {
      hierarchy.addComponentNode(defaultImport);
    }
  });
  // return hierarchy;
};

// finds a named component
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
