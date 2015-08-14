var React = require('react');

module.exports = React.createClass({

  render: function () {
    return (
      <nav className="Navigation">
        <a onClick={this.props.addModule}>Push Module</a>
        <a onClick={this.props.removeModule}>Pop Module</a>
      </nav>
    );
  }
});
