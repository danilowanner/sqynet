var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var cookie = require('react-cookie');

var helpers = require('../helpers.js');

var AutoResponsive = require('autoresponsive-react');
var MenuBar = require('./MenuBar.jsx');
var Module = require('./Module.jsx');
var Message = require('./Message.jsx');
var Grid = require('./Grid.jsx');

/* Module, export component */
module.exports = React.createClass({

  getInitialState: function() {
    var modules = this.getInitialModules();
    return {
      user: {ID: null, Username: ""},
      loginFocus: false,
      modules: modules,
      lastModuleKey: 1,
      messages: [],
      lastMessageKey: 0,
    };
  },
  getInitialModules: function() {
    if( cookie.load('hideWelcome') ) {
      return [ this.createModule({type: "welcome"}) ]
    }
    else {
      return [ ]
    }
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
        <Grid do={this.do} modules={this.state.modules} />
        { /*<AutoResponsive {...this.state.autoresponsiveProps} >
          { this.renderModules() }
        </AutoResponsive> */ }
        <Module type="addmodule" do={this.do} />
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
      .catch(this.onFail)
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
    setTimeout(() =>{ this.setState({loginFocus: false}) }, 1000)
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

  createModule: function(args) {
    var type = args.type
    var data = args.data
    var key = this.state ? this.state.lastModuleKey+1 : 0;
    return {
      key: key,
      type: type,
      /*width: type=="zones" ? 30 : 20,
      height: 10,*/
      data: data
    }
  },

  addModule: function(args) {
    var modules = this.state.modules;
    // create and add new module to array
    var module = this.createModule(args)
    modules.push(module)
    // update state with new modules array
    this.setState({modules: modules, lastModuleKey: module.key} )
  },

  removeModule: function(key) {
    var modules = this.state.modules
    modules.some((module,i) => {
      if(module.key == key) {
        // when hiding welcome message, save in cookie to disable showing in future
        if(modules[i].type=="welcome") cookie.save('hideWelcome', true)
        // remove module
        modules.splice(i, 1)
        this.setState({modules: modules} )
        return true
      }
    })
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

  onFail: function(ex) {
    console.log('JSON parsing or handling failed', ex)
  },

});
