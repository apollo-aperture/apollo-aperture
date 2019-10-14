const traverse = require('@babel/traverse').default;
const htmlElementsToIgnore = require('./util/htmlElementsToIgnore');

function generateAST(file) {
    return parser.parse(file, {
      sourceType: 'module',
      plugins: ['jsx'],
    });
  }
  
  const filePath = path.join(__dirname, '../samples/test_cases/stateful.js');
  const file = fs.readFileSync(filePath, 'utf8');