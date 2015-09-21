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
        <ol>
          <li><a onClick={this.onClickRegister}>Register</a></li>
          <li><a onClick={this.onClickLogin}>Log in</a></li>
          <li><a onClick={this.onClickSurveillance}>Add Surveillance</a></li>
        </ol>
      </p>
    );
  },

  /* Custom Methods */
  onClickRegister: function() {
    this.props.do('addModule',{type: "registration"})
  },
  onClickLogin: function() {
    this.props.do('focusLogin')
  },
  onClickSurveillance: function() {
    this.props.do('addModule',{type: "surveillance"})
  }

});
