class Hierarchy {
  constructor() {
    this.reactComponent = null;
    this.children = [];
  }
  setReactComponent(reactComponentName) {
    this.reactComponent = reactComponentName;
    return this;
  }
  addChildComponent(hierarchy) {
    this.children.push(hierarchy);
  }
  getHierarchy() {
    return this;
  }
}

module.exports = Hierarchy;
