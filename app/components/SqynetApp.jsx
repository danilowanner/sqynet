var React = require('react');
require('whatwg-fetch');

var MenuBar = require('./MenuBar.jsx');
var Module = require('./Module.jsx');

/* Helpers */
var getAPI = function(path) {
  var config = {
    method: 'get',
    headers: {
      'Accept': 'application/json'
    },
    credentials: 'include'
  }

  return window .fetch('http://public-api.sqynet.ch/'+path,config)
                .then(function(response) {
                  return response.json()
                })
}
var postAPI = function(path, formData) {
  var config = {
    method: 'post',
    headers: {
      'Accept': 'application/json'
    },
    credentials: 'include',
    body: formData
  }

  return window .fetch('http://public-api.sqynet.ch/'+path,config)
                .then(function(response) {
                  return response.json()
                })
}


/* Module, export component */
module.exports = React.createClass({

  getInitialState: function() {
    return {
      user: {ID: null, Username: "Lithagon"},
      modules: [
        <Module type="welcome" do={this.do}  />
      ]
    };
  },

  componentDidMount: function() {

  },

  render: function () {
    return (
      <div className="SqynetApp">
        <MenuBar user={this.state.user} do={this.do}/>
        <section className="modules">
          { this.state.modules }
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
      case "apiLogin": this.apiLogin(argument); break;
      case "apiRegister": this.apiRegister(argument); break;
    }
  },
  onParsingFail: function(ex) {
    console.log('JSON parsing failed', ex)
  },
  apiLogin: function(formData) {
    postAPI('login', formData)
      .then(this.onLoginResponse)
      .catch(this.onParsingFail)
  },
  onLoginResponse: function(json) {
    if(json.error) {
      console.log(json);
    } else {
      this.setState({user: json.user})
    }
  },
  apiRegister: function(formData) {
    postAPI('register', formData)
      .then(this.onRegisterResponse)
      .catch(this.onParsingFail)
  },
  addModule: function(type) {
    var modules = this.state.modules;
    modules.push(
      <Module type={type} do={this.do} />
    )
    this.setState({modules: modules} )
  },
  removeModule: function() {
    var modules = this.state.modules;
    modules.pop()
    this.setState({modules: modules} )
  },
  getZoneTest: function() {
    getAPI('getZone')
      .then(function(json) {
        console.log('parsed json', json)
      }).catch(this.onParsingFail)
  },
  getAccountTest: function() {
    getAPI('getAccount')
      .then(function(json) {
        console.log('parsed json', json)
      }).catch(this.onParsingFail)
  }
});
