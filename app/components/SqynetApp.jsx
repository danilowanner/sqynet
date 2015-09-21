var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var cookie = require('react-cookie');

var helpers = require('../helpers.js');

var AutoResponsive = require('autoresponsive-react');
var MenuBar = require('./MenuBar.jsx');
var Module = require('./Module.jsx');
var Message = require('./Message.jsx');

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
      autoresponsiveProps: this.getAutoresponsiveProps(),
      gridHeight: 10
    };
  },
  getAutoresponsiveProps: function() {
    var em = document.body.clientWidth > 659 ? 17 : 15 /* mobile breakpoint at 659px */
    return {
      containerWidth: document.body.clientWidth-1*em, /* 1em border-width */
      gridWidth: em, /* 1em grid-width */
      itemClassName: 'grid-item',
      itemMargin: 0,
      transitionDuration: '.4',
      transitionTimingFunction: 'ease'
    }
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

    window.addEventListener('resize', this.onResize, false);
  },
  onResize: function() {
    this.setState({autoresponsiveProps: this.getAutoresponsiveProps()});
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
        <AutoResponsive {...this.state.autoresponsiveProps} >
          { this.renderModules() }
        </AutoResponsive>
        <Module type="addmodule" do={this.do} />
        <div className="background"></div>
      </div>
    );
  },
  renderModules: function() {
    return this.state.modules.map((module, i) => {
        // set width and height, limit width to containerWidth
        var styles = {
              width: Math.min(module.width*this.state.autoresponsiveProps.gridWidth, this.state.autoresponsiveProps.containerWidth),
              height: module.height*this.state.gridHeight
            }
        return (
          <div className="grid-item" key={module.key} style={styles}>
            <div className="index">00.0{i}.00{module.key}</div>
            <div className="close" onClick={this.removeModule.bind(null,i)}>x<div> close</div></div>
              <ReactCSSTransitionGroup transitionName="slideInOut" transitionAppear={true}>
                <Module do={this.do} type={module.type} key={module.key} data={module.data} index={i} onHeightChange={this.onModuleHeightChange}/>
              </ReactCSSTransitionGroup>
          </div>
        )
      })
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
  addModule: function(args) {
    var modules = this.state.modules;
    // create and add new module to array
    var module = this.createModule(args)
    modules.push(module)
    // update state with new modules array
    this.setState({modules: modules, lastModuleKey: module.key} )
  },
  createModule: function(args) {
    var type = args.type
    var data = args.data
    var key = this.state ? this.state.lastModuleKey+1 : 0;
    return {
      key: key,
      type: type,
      width: type=="zones" ? 30 : 20,
      height: 10,
      data: data
    }
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
  },
  onModuleHeightChange: function(index,height) {
    var modules = this.state.modules;
    // update style of this module to match height of content, plus bottom margin (30px)
    modules[index].height = Math.ceil(height/this.state.gridHeight) + 3;
    this.setState({modules: modules} )
  }

});
