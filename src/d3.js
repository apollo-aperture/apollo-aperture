import React, { Component } from 'react'
import './App.css'
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
      .attr('class', 'canvasTree')

    const theTree = d3.tree()
      .size([600, 700]);
    d3.json('http://localhost:3000/api/d3json')
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
          .attr('text-anchor', d => d.depth === 0 ? 'start' : 'start')
          .attr('font-size', d => 4 - d.depth + 'em')
          .text(d => d.data.name)
      })
  }
  render() {
    return (<div>
      <svg ref={canvas => this.canvas = canvas}
        width={1200} height={600}>
      </svg>
    </div>
    )
  }
}
export default QueryTree;