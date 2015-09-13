var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var cookie = require('react-cookie');

var helpers = require('../helpers.js');

var MenuBar = require('./MenuBar.jsx');
var Module = require('./Module.jsx');
var Message = require('./Message.jsx');

/* Module, export component */
module.exports = React.createClass({

  getInitialState: function() {
    var modules = cookie.load('hideWelcome')
      ? [ ]
      : [ {key: 1, type: "welcome"} ];

    return {
      user: {ID: null, Username: ""},
      loginFocus: false,
      modules: modules,
      lastModuleKey: 1,
      messages: [],
      lastMessageKey: 0,
    };
  },
  componentDidMount: function() {
    this.apiGetAccount()
  },

  render: function () {
    return (
      <div className="SqynetApp">
        <MenuBar user={this.state.user} loginFocus={this.state.loginFocus} do={this.do}/>
        <section className="messages">
          <ReactCSSTransitionGroup transitionName="slideInOut">
          {
            this.state.messages.map((message, index) =>
              <Message type={message.type} content={message.content} do={this.do} index={index} messageKey={message.key} key={message.key} />
            )
          }
          </ReactCSSTransitionGroup>
        </section>
        <section className="modules">
          <ReactCSSTransitionGroup transitionName="slideInOut">
          {
            this.state.modules.map((module, index) =>
              <Module type={module.type} do={this.do} index={index} moduleKey={module.key} key={module.key} />
            )
          }
          </ReactCSSTransitionGroup>
          <Module type="addmodule" do={this.do}/>
        </section>
        <div className="background"></div>
      </div>
    );
  },

  /* Custom Methods */
  do: function(what,argument) {
    switch (what) {
      case "addModule": this.addModule(argument); break;
      case "removeModule": this.removeModule(argument); break;
      case "addMessage": this.addMessage(argument); break;
      case "removeMessage": this.removeMessage(argument); break;
      case "onLogin": this.onLogin(argument); break;
      case "onLogout": this.onLogout(argument); break;
      case "onRegister": this.onRegister(argument); break;
      case "onUsernameChange": this.onUsernameChange(argument); break;
      case "focusLogin": this.focusLogin(argument); break;
    }
  },
  apiGetAccount: function() {
    helpers.getAPI('getAccount')
      .then(this.onGetAccountResponse)
      .catch(this.onParsingFail)
  },
  onGetAccountResponse: function(json) {
    if(json.error) {
      // Not logged in
    } else {
      this.setState({user: json.user})
    }
  },
  focusLogin: function() {
    // Set loginFocus to true for a short period of time
    // to trigger focus in Account.jsx
    setTimeout(function(){ this.setState({loginFocus: false}) }, 1000)
    this.setState({loginFocus: true})
  },
  onUsernameChange: function(username) {
    var user = this.state.user;
    user.Username = username;
    this.setState({user: user});
  },
  onRegister: function(username) {
    console.log("onRegister "+username);
    if(this.state.user.ID==null) {
      this.setState({user: {ID: null, Username: username}})
      this.focusLogin()
    }
  },
  onLogin: function(user) {
    this.setState({user: user});
  },
  onLogout: function() {
    this.setState({user: {ID: null, Username: ""}});
  },
  addModule: function(type) {
    var modules = this.state.modules
    var key = this.state.lastModuleKey+1;
    modules.push({key: key, type: type})
    this.setState({modules: modules, lastModuleKey: key} )
  },
  removeModule: function(index) {
    var modules = this.state.modules;
    // when hiding welcome message, save in cookie to disable showing in future
    if(modules[index].type=="welcome") cookie.save('hideWelcome', true);
    // remove module
    modules.splice(index, 1);
    this.setState({modules: modules} )
  },
  addMessage: function(message) {
    var messages = this.state.messages
    var key = this.state.lastMessageKey+1
    messages.push({key: key, type: message.type, content: message.content})
    this.setState({messages: messages, lastMessageKey: key} )
  },
  removeMessage: function(index) {
    var messages = this.state.messages;
    messages.splice(index, 1);
    this.setState({messages: messages} )
  },
  onParsingFail: function(ex) {
    console.log('JSON parsing failed', ex)
  }

});
