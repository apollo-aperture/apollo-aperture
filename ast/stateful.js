const babelParser = require('@babel/parser'),
  fs = require('fs'),
  path = require('path');

const htmlElementsToIgnore = {
  'a': true,
  'article': true,
  'audio': true,
  'b': true,
  'blockquote': true,
  'body': true,
  'br': true,
  'button': true,
  'canvas': true,
  'caption': true,
  'cite': true,
  'code': true,
  'col': true,
  'dialog': true,
  'div': true,
  'dl': true,
  'dt': true,
  'em': true,
  'embed': true,
  'font': true,
  'footer': true,
  'form': true,
  'foreignObject': true,
  'frame': true,
  'g': true,
  'h1': true,
  'h2': true,
  'h3': true,
  'h4': true,
  'h5': true,
  'h6': true,
  'header': true,
  'hr': true,
  'html': true,
  'i': true,
  'iframe': true,
  'img': true,
  'input': true,
  'kbd': true,
  'label': true,
  'legend': true,
  'li': true,
  'link': true,
  'main': true,
  'map': true,
  'menu': true,
  'noscript': true,
  'object': true,
  'ol': true,
  'option': true,
  'p': true,
  'path': true,
  'param': true,
  'pre': true,
  'progress': true,
  'q': true,
  'rb': true,
  'rt': true,
  'ruby': true,
  's': true,
  'samp': true,
  'script': true,
  'section': true,
  'select': true,
  'small': true,
  'source': true,
  'span': true,
  'strong': true,
  'style': true,
  'sub': true,
  'summary': true,
  'svg': true,
  'table': true,
  'tbody': true,
  'td': true,
  'th': true,
  'thead': true,
  'title': true,
  'tr': true,
  'track': true,
  'u': true,
  'ul': true,
  'var': true,
  'video': true,
  'wbr': true,
};

const filePath = path.join(__dirname, '..', 'samples', 'test_cases', 'stateful.js');
const file = fs.readFileSync(filePath, 'utf8');

const ast = babelParser.parse(file, {
  sourceType: 'module',
  plugins: [ 'jsx' ]
});

function hasRenderStatement(node) {
  // ast.program.body["3"].superClass
  if (node.type === 'ClassDeclaration' && 'superClass' in node) {
    node.body.body.forEach(el => {
      if (el.key.name === 'render') {
        el.body.body.forEach(innerEl => {
          if (innerEl.type === 'ReturnStatement' && innerEl.argument.type === 'JSXElement' && innerEl.argument.children.length > 0) {
            innerEl.argument.children.forEach(child => {
              if ('openingElement' in child && 'type' in child && child.type === 'JSXElement' && !htmlElementsToIgnore[child.openingElement.name.name]) {
                // reaches React Component
                console.log(child);
              }
            });
          }
        });
      }
    });
  }
  return false;
}

ast.program.body.forEach(node => {
  hasRenderStatement(node);
});