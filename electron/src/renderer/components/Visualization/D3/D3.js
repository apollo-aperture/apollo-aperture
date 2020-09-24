import React, {Component} from 'react';
import D3StyledDiv from './D3.styled';
const d3 = require('d3');
import data from './sample';
// console.log('d3: ', d3);

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
      .attr('transform', 'translate(0, 0)')
    
    const theTree = d3.tree()
      .size([400, 600]);
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
  
  }
  render() {
    const style = {
      width: '100%',
      // height: 'calc(100% - 50px)'
      height: '100%',
      // overflow: 'auto',
    }
    const svgStyle = {
      width: '100%',
      height: '100%',
      viewBox: '0 0 1000 1000'
    };
    return (
      <div style={style}>
        <svg ref={canvas => this.canvas = canvas} style={svgStyle}>
        </svg>
      </div>
    )
  }
}

const D3 = () =>
  <D3StyledDiv>
    <QueryTree />
  </D3StyledDiv>;

export default D3;
