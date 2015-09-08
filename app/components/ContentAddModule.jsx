var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

module.exports = React.createClass({

  getInitialState: function() {
    return {
      open: false
    };
  },

  toggleOpen: function() {
    this.setState({open: !this.state.open});
  },

  render: function () {

    var menu = this.state.open ?
      <ul>
        <li onClick={this.props.do.bind(null,"addModule","registration")}>Registration</li>
        <li onClick={this.props.do.bind(null,"addModule","zones")}>Zones</li>
        <li onClick={this.props.do.bind(null,"addModule","surveillance")}>Surveillance</li>
      </ul>
      : "";

    return (
      <div onClick={this.toggleOpen}>
        <ReactCSSTransitionGroup transitionName="slideInOut">
          { menu }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});