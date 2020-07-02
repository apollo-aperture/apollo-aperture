class Hierarchy {
  constructor(componentName) {
    this.reactComponent = componentName;
    this.children = [];
  }
  pushHierarchyIntoChild(hierarchy) {
    this.children.push(hierarchy);
  }
}

module.exports = Hierarchy;
