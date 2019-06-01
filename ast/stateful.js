const parser = require('@babel/parser'),
  traverse = require('@babel/traverse').default,
  t = require('@babel/types'),
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

const ast = parser.parse(file, {
  sourceType: 'module',
  plugins: [ 'jsx' ]
});

const cache = [];


function traverseAst(ast) {
  const visitorUtility = {
    ClassDeclaration(path) {
      path.traverse({
        ClassBody(path) {
          path.traverse({
            ClassMethod(path) {
              path.traverse({
                BlockStatement(path) {
                  path.traverse({
                    ReturnStatement(path) {
                      path.traverse({
                        JSXIdentifier(path) {
                          cache.push(path);
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  };

  traverse(ast, {
    enter(path) {
      path.traverse(visitorUtility);
    }
  });
}

traverseAst(ast);

const components = cache.filter(el => el.node.type === 'JSXIdentifier').filter(el => {
  if (!htmlElementsToIgnore[ el.node.name ]) {
    return true;
  }
});