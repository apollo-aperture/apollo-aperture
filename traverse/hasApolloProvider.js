function hasApolloProvider(body) {
  const importNodes = body.filter(node => node.type === 'ImportDeclaration');
  for (let i = 0; i < importNodes.length; i++) {
    const importNode = importNodes[i];
    if ('specifiers' in importNode) {
      for (let j = 0; j < importNodes[i].specifiers.length; j++) {
        const specifierNode = importNode.specifiers[j];
        if (
          'imported' in specifierNode &&
          specifierNode.imported &&
          specifierNode.imported.name &&
          specifierNode.imported.name === 'ApolloProvider'
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

module.exports = hasApolloProvider;
