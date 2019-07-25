import React, { Component } from 'react'
const d3 = require('d3');


class QueryTree extends Component {
  constructor(props) {
    super(props)
    this.createTree = this.createTree.bind(this)
  }

  componentDidMount() {
    this.createTree()
  }
  componentDidUpdate() {
    this.createTree()
  }

  createTree() {
    let canvas = d3.select(this.canvas)
    canvas
      .attr('transform', 'translate(50, 50)')


    const theTree = d3.tree()
      .size([500, 600]);
    d3.json('sample.json')
      .then(data => {
        const root = d3.hierarchy(data);
        const links = theTree(root).links();
        const linkPathGenerator = d3.linkHorizontal()
          .x(d => d.y)
          .y(d => d.x);

        canvas.selectAll('path').data(links)
          .enter().append('path')
          .attr('d', linkPathGenerator)
          .attr('fill', 'none')
          .attr('stroke', 'black')
          .attr('width', 'fitContent')
          .attr('height', 'fit-content')

        canvas.selectAll('text').data(root.descendants())
          .enter().append('text')
          .attr('x', d => d.y)
          .attr('y', d => d.x)
          .attr('dy', '0.32em')
          .attr('text-anchor', d => d.children ? 'middle' : 'start')
          .attr('text-anchor', d => d.depth === 0 ? 'start' : 'start')
          .attr('font-size', d => 4 - d.depth + 'em')
          .text(d => d.data.name)
      })
  }
  render() {
    return (<React.Fragment>
      <svg ref={canvas => this.canvas = canvas} width="100%" height="100%">
      </svg>
    </React.Fragment>
    )
  }
}

export default QueryTree;