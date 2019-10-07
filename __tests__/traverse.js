const glob = require('glob');
const init = require('../traverse/index');
const traverseFiles = require('../traverse/traverseFiles');
const findComponents = require('../traverse/findComponents');

const testSamplesPath = '../samples/spacex/src/**/*.js';
const singleFilePath = '../samples/spacex_simplified/src/components/App.js';

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