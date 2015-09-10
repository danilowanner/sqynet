var React = require('react');
var ContentRegistrationForm = require('./ContentRegistrationForm.jsx');
var ContentAddModule = require('./ContentAddModule.jsx');
var ContentZones = require('./ContentZones.jsx');

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
      case "zones":
        var title = <h1>Zones</h1>;
        var content = <ContentZones do={this.props.do}/>
        break;
      case "registration":
        var title = <h1>Registration</h1>;
        var content = <ContentRegistrationForm do={this.props.do} onRegister={this.removeModule} />
        break;
      default:
        var title = <h1>{ this.props.type }</h1>;
        var content = <p>Module not found</p>;
    }
    return (
      <div className={ "Module "+this.props.type }>
        { title }
        <div className="index">00.00{this.props.index}</div>
        {
          this.props.index != undefined ?
            <div className="close" onClick={this.removeModule}>x<div> close</div></div>
            : ""
        }
        { content }
      </div>
    );
  },

  /* Custom Methods */
  removeModule: function() {
    this.props.do("removeModule",this.props.index)
  }
});
