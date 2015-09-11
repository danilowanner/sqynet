var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var MenuBar = require('./MenuBar.jsx');
var Module = require('./Module.jsx');

/* Module, export component */
module.exports = React.createClass({

  getInitialState: function() {
    return {
      user: {ID: null, Username: "Username"},
      modules: [
        {key: 1, type: "welcome"}
      ],
      lastModuleKey: 1
    };
  },

  render: function () {
    return (
      <div className="SqynetApp">
        <MenuBar user={this.state.user} do={this.do}/>
        <section className="modules">
          <ReactCSSTransitionGroup transitionName="slideInOut">
          {
            this.state.modules.map((module, index) =>
              <Module type={module.type} do={this.do} index={index} moduleKey={module.key} key={module.key} />
            )
          }
          </ReactCSSTransitionGroup>
          <Module type="addmodule" do={this.do} />
        </section>
      </div>
    );
  },

  /* Custom Methods */
  do: function(what,argument) {
    switch (what) {
      case "addModule": this.addModule(argument); break;
      case "removeModule": this.removeModule(argument); break;
      case "getZoneTest": this.getZoneTest(argument); break;
      case "getAccountTest": this.getAccountTest(argument); break;
      case "onLogin": this.onLogin(argument); break;
      case "onRegister": this.onRegister(argument); break;
      case "onUsernameChange": this.onUsernameChange(argument); break;
      case "focusLogin": this.focusLogin(argument); break;
    }
  },
  focusLogin: function() {
    // TODO
  },
  onUsernameChange: function(username) {
    var user = this.state.user;
    user.Username = username;
    this.setState({user: user});
  },
  onRegister: function(username) {
    console.log("onRegister "+username);
    if(this.state.user.ID==null) {
      this.setState({user: {ID: null, Username: username}});
    }
  },
  onLogin: function(user) {
    this.setState({user: user});
  },
  addModule: function(type) {
    var modules = this.state.modules
    var key = this.state.lastModuleKey+1;
    modules.push({key: key, type: type})
    this.setState({modules: modules, lastModuleKey: key} )
  },
  removeModule: function(index) {
    var modules = this.state.modules;
    modules.splice(index, 1);
    this.setState({modules: modules} )
  },
  getZoneTest: function() {
    helpers.getAPI('getZone')
      .then(function(json) {
        console.log('parsed json', json)
      }).catch(this.onParsingFail)
  },
  getAccountTest: function() {
    helpers.getAPI('getAccount')
      .then(function(json) {
        console.log('parsed json', json)
      }).catch(this.onParsingFail)
  }

});
