const path = require('path');
const genASTProgramBody = require('../traverse/genASTProgramBody');
const assembleFileImports = require('../traverse/assembleFileImports');

const filePath = path.join(__dirname, 'apollo-react-files');

describe('assembles the imports for a file', () => {
  it('assembles the default imports', () => {
    const astProgramBody = genASTProgramBody(filePath, 'defaultImports.js');

    const fileImports = assembleFileImports(filePath, astProgramBody);
    expect(Array.isArray(fileImports)).toBe(true);
    expect(fileImports).toEqual([
      {
        filename: `${filePath}/App.js`,
        defaultImport: 'App',
        namedImports: [],
      },
      {
        filename: `${filePath}/client.js`,
        defaultImport: 'client',
        namedImports: [],
      },
    ]);
  });
  it('assembles the named imports', () => {
    const astProgramBody = genASTProgramBody(filePath, 'namedImports.js');
    const fileImports = assembleFileImports(filePath, astProgramBody);
    expect(Array.isArray(fileImports)).toBe(true);
    expect(fileImports).toEqual([
      {
        filename: `${filePath}/components/App.js`,
        defaultImport: null,
        namedImports: ['Foo', 'Bar']
      },
    ]);
  });
});
