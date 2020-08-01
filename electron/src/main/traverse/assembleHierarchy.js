//TODO: handle named exports
function assembleHierarchy(
  traverseFile,
  variableHierarchies,
  imports,
  componentName,
  reactHierarchy
) {
  function getComponentIdx(componentName, imports) {
    return imports.findIndex(
      fileImport => fileImport.defaultImport === componentName
    );
  }

  function assemble(hierarchyObject) {
    // if component has no children
    // find if it exists in variables or imports
    const reactComponentName = hierarchyObject.reactComponent;
    if (hierarchyObject.children.length <= 0) {
      const importsIdx = getComponentIdx(reactComponentName, imports);
      // look up in variables
      if (variableHierarchies[reactComponentName]) {
        // add matching component declared in the hierarchies as a child
        hierarchyObject.children.push(
          assemble(variableHierarchies[reactComponentName])
        );
        // look in imports
      } else if (importsIdx !== -1) {
        const importHierarchy = traverseFile(imports[importsIdx].filename);
        hierarchyObject.children.push(importHierarchy);
      } else {
        return hierarchyObject;
      }
    }
    const { children } = hierarchyObject;
    for (let child of children) {
      child = assemble(child);
    }
    return hierarchyObject;
  }

  return reactHierarchy == null || reactHierarchy === 'undefined'
    ? assemble(variableHierarchies[componentName])
    : assemble(reactHierarchy);
}

module.exports = assembleHierarchy;
