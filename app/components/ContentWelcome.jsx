var React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return {
    };
  },

  render: function () {
    return (
      <p>
        Here are your first steps:
        <br/>1. <a onClick={this.onClickRegister}>Register</a>
        <br/>2. <a onClick={this.onClickLogin}>Log in</a>
        <br/>3. <a onClick={this.onClickSurveillance}>Add Surveillance</a>
      </p>
    );
  },

  /* Custom Methods */
  onClickRegister: function() {
    this.props.do('addModule','registration')
  },
  onClickLogin: function() {
    this.props.do('focusLogin')
  },
  onClickSurveillance: function() {
    this.props.do('addModule','surveillance')
  }

});
