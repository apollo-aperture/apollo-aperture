function classComponents(astBody) {
  function getClassDeclarations (astBody) {
    const classNodes = astBody.filter(el => el.type === 'ClassDeclaration');
    // for each class declaration
    if (!classNodes) return undefined;
    return classNodes.forEach(classNode => {
      return classNodes.reduce((acc, node) => {
        if (node.body && node.body.body && node.body.body.length > 0) {
          node.body.body.forEach(bodyNode => {
            if (bodyNode.kind !== 'constructor') acc.push(bodyNode);
          });
        }
        return acc;
      }, []);
    });
  }
  const foo = getClassDeclarations(astBody);
  console.log(foo);
}

module.exports = classComponents;
