const path = require('path');
const traverseFile = require('../electron/src/main/traverse/traverseFile');

function generateFilePath(filename) {
  const basePath = path.join(
    __dirname,
    'apollo-react-files',
    'fragments',
    'traverse'
  );
  return path.join(basePath, filename);
}

describe('Hierarchy from multiple files', () => {
  it('Generic Components', () => {
    const result = traverseFile(generateFilePath('ParentComponent.js'));
    expect(result).toEqual({
      reactComponent: 'OuterComponent',
      children: [
        {
          reactComponent: 'ChildComponent',
          children: [
            {
              reactComponent: 'LocalComponent',
              children: [],
            },
          ],
        },
      ],
    });
  });
  it('only variable components', () => {
    const completeFilePath = generateFilePath('VariableComponents.js');
    const result = traverseFile(completeFilePath);
    expect(result).toEqual({
      reactComponent: 'Foo',
      children: [
        {
          reactComponent: 'Moo',
          children: [
            {
              reactComponent: 'Bar',
              children: [],
            },
            {
              reactComponent: 'Woo',
              children: [
                {
                  reactComponent: 'Boo',
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    });
  });
  it('React and Apollo', () => {
    const completeFilePath = generateFilePath('reactApollo.js');
    expect(traverseFile(completeFilePath)).toEqual({
      reactComponent: 'React',
      children: [
        {
          reactComponent: 'ApolloProvider',
          children: [
            {
              reactComponent: 'ReactApolloImport',
              children: [
                {
                  reactComponent: 'Component',
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    });
  });
});
