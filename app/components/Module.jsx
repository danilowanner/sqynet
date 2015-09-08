var React = require('react');
var ContentRegistrationForm = require('./ContentRegistrationForm.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return {
    };
  },

  render: function () {
    switch (this.props.type) {
      case "welcome":
        var title = "Welcome to sQynet";
        var content =
          <p>
            Welcome to sQynet!
            <br/><a onClick={this.props.getZoneTest}>Get Zone Test</a>
            <br/><a onClick={this.props.getAccountTest}>Get Account Test</a>
          </p>
        break;
      case "registration":
        var title = "Registration";
        var content = <ContentRegistrationForm />
        break;
      default:
        var content = "Module not found"
    }
    return (
      <div className="Module">
        <h1>{ title }</h1>
        { content }
      </div>
    );
  }
});
