var React = require('react');
var ContentRegistrationForm = require('./ContentRegistrationForm.jsx');
var ContentAddModule = require('./ContentAddModule.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return {
    };
  },

  render: function () {
    switch (this.props.type) {
      case "welcome":
        var title = <h1>Welcome to sQynet</h1>;
        var content =
          <p>
            Welcome to sQynet!
            <br/><a onClick={this.props.getZoneTest}>Get Zone Test</a>
            <br/><a onClick={this.props.getAccountTest}>Get Account Test</a>
          </p>
        break;
      case "addmodule":
        var title = "";
        var content = <ContentAddModule do={this.props.do}/>
        break;
      case "registration":
        var title = <h1>Registration</h1>;
        var content = <ContentRegistrationForm />
        break;
      default:
        var content = "Module not found"
    }
    return (
      <div className={ "Module "+this.props.type }>
        { title }
        { content }
      </div>
    );
  }
});
