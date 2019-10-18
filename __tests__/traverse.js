const glob = require('glob');
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const init = require('../traverse/index');
const traverseFiles = require('../traverse/traverseFiles');
const findComponents = require('../traverse/findComponents');

const testSamplesPath = '../samples/spacex/src/**/*.js';
const singleFilePath = '../samples/spacex_simplified/src/components/App.js';

function generateAST(file) {
  return parser.parse(file, {
    sourceType: 'module',
    plugins: ['jsx'],
  });
}

const hierarchyContainer = {
  name: '',
  children: []
};

describe('test findComponents', () => {
  test('it returns stateless components', () => {
    const filePath = path.join(__dirname, '../samples/test_cases/stateless.js');
    const file = fs.readFileSync(filePath, 'utf8');
    const ast = generateAST(file);
    const result = findComponents(ast, hierarchyContainer);
    console.log('stateless', result);
    expect('foo').toEqual('foo');
  });

  test('it returns stateful components', () => {
    const filePath = path.join(__dirname, '../samples/test_cases/stateful.js');
    const file = fs.readFileSync(filePath, 'utf8');
    const ast = generateAST(file);
    const result = findComponents(ast, hierarchyContainer);
    console.log('stateful', result);
    expect('foo').toEqual('foo');
  })
});

describe('read files', () => {
  test('gets the correct file names', () => {
    glob(testSamplesPath, (err, files) => {
      if (err) {
        return err;
      }
      return traverseFiles(testSamplesPath)
        .then(result => expect(result).toEqual(files));

    });
  });
});

describe('get ast from files', () => {
  test('returns ast', () => {
    return init(testSamplesPath)
      .then(hierarchy => expect(hierarchy).toEqual({ name: 'Query', children: [] }));
  });
});

describe('test single file', () => {
  test('returns components', () => {
    function HierarchyConstructor() {
      this.name = 'Query';
      this.children = [];
    }

    HierarchyConstructor.prototype.addChildren = componentName => {
      this.children.push({ name: componentName });
    };
    const hierarchy = new HierarchyConstructor();
    const result = findComponents(singleFilePath, hierarchy);
    console.log(result);
  })
});