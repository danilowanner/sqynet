var React = require('react')

module.exports = React.createClass({

  propTypes: {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    textAnchor: React.PropTypes.string,
    fill: React.PropTypes.string,
    fontFamily: React.PropTypes.string,
  },

  getDefaultProps: function() {
    return {
      textAnchor: 'start',
      fill: '#fff',
      fontFamily: 'Arial',
    }
  },

  render: function () {
    return (
      <text className="SvgText"
        transform={"translate("+this.props.x+" "+this.props.y+")"}
        fontFamily={this.props.fontFamily}
        fontSize="14"
        textAnchor={this.props.textAnchor}
        fill={this.props.fill} >
        { this.props.children }
      </text>
    )
  },

});
