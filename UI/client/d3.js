import React, { Component } from 'react';
const d3 = require('d3');

class QueryTree extends Component {
  constructor(props) {
    super(props)
    this.createTree = this.createTree.bind(this)
  }

  componentDidMount() {
    this.createTree();
  }

  componentDidUpdate() {
    this.createTree();
  }

  createTree() {

    let canvas = d3
      .select('body')
      .append('svg')
      .attr('width', 1000)
      .attr('height', 1000)
      .append('g')
      .attr('transform', 'translate(100, 100)');

    const theTree = d3.tree()
      .size([900, 700]);

    d3.json('sampleJSON.json')
      .then(data => {
        const root = d3.hierarchy(data);
        const links = theTree(root).links();
        const linkPathGenerator = d3.linkHorizontal()
          .x(d => d.y)
          .y(d => d.x);

        canvas.selectAll('path').data(links)
          .enter().append('path')
          .attr('d', linkPathGenerator);

        canvas.selectAll('text').data(root.descendants())
          .enter().append('text')
          .attr('x', d => d.y)
          .attr('y', d => d.x)
          .attr('dy', '0.32em')
          .attr('text-anchor', d => d.children ? 'middle' : 'start')
          .attr('font-size', d => 4 - d.depth + 'em')
          .text(d => d.data.name)
      })
  }
  render() {

    return (
      <svg ref={canvas}></svg>
    );
  }
}


export default QueryTree;