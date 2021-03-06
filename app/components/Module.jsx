var React = require('react');

var ContentWelcome = require('./ContentWelcome.jsx');
var ContentRegistrationForm = require('./ContentRegistrationForm.jsx');
var ContentAddModule = require('./ContentAddModule.jsx');
var ContentZones = require('./ContentZones.jsx');
var ContentZone = require('./ContentZone.jsx');
var ContentRegion = require('./ContentRegion.jsx');
var ContentAreas = require('./ContentAreas.jsx');
var ContentHelp = require('./ContentHelp.jsx');
var ContentReset = require('./ContentReset.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      contentHeight: 0,
    };
  },
  componentDidMount: function() {
    this.updateSize()
    this.timer = setInterval(this.checkSize,200)
  },
  componentWillUnmount: function() {
    clearInterval(this.timer)
  },
  checkSize: function() {
    var moduleEl = React.findDOMNode(this.refs.module)
    var height = moduleEl.offsetHeight
    if(height != this.state.contentHeight) this.updateSize(height);
  },
  updateSize: function(height) {
    if(this.props.onHeightChange) this.props.onHeightChange(this.props.index, height)
    this.setState({ contentHeight: height })
  },

  render: function () {
    switch (this.props.type) {
      case "welcome":
        var title = <h1>Welcome to sQynet</h1>;
        var content = <ContentWelcome do={this.props.do} user={this.props.user}/>
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
      case "areas":
        var title = <h1>Surveillance Areas</h1>;
        var content = <ContentAreas do={this.props.do}/>
        break;
      case "zone":
        if(!(this.props.data && this.props.data.zoneid)) {
          var title = <h1>Error</h1>, content = <p>No zoneid specified</p>
          break;
        }
        var title = <h1>Zone {this.props.data.zoneid}</h1>
        var content = <ContentZone do={this.props.do} zoneid={this.props.data.zoneid}/>
        break;
      case "region":
        if(!(this.props.data && this.props.data.regionid)) {
          var title = <h1>Error</h1>, content = <p>No regionid specified</p>
          break;
        }
        var title = <h1>Region {this.props.data.regionid}</h1>
        var content = <ContentRegion do={this.props.do} regionid={this.props.data.regionid}/>
        break;
      case "help":
        var title = <h1>sQynet Help</h1>;
        var content = <ContentHelp do={this.props.do} user={this.props.user}/>
        break;
      case "resetpassword":
        var title = <h1>Reset sQynet Password</h1>;
        var content = <ContentReset do={this.props.do} user={this.props.user}/>
        break;
      default:
        var title = <h1>{ this.props.type }</h1>;
        var content = <p>Module not found</p>;
    }
    return (
      <div className={ "Module "+this.props.type } ref="module">
        { title }
        { content }
      </div>
    );
  },

  /* Custom Methods */
  removeModule: function() {
    console.log("remove "+this.props.ID)
    this.props.do("removeModule",this.props.ID)
  }
});
