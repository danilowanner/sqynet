var React = require('react');
require('whatwg-fetch');

var MenuBar = require('./MenuBar.jsx');
var Module = require('./Module.jsx');

/* Helpers */
var getAPI = function(path, formData) {
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
      user: {ID: null, Username: "ElphCrimLester"},
      modules: [
        <Module type="welcome"
          title="Welcome to sQynet!"
          getZoneTest={this.getZoneTest}
          getAccountTest={this.getAccountTest}/>
      ]
    };
  },

  componentDidMount: function() {

  },

  onParsingFail: function(ex) {
    console.log('JSON parsing failed', ex)
  },

  onSignIn: function(user,password) {
    var formData = new FormData();
    formData.append('user', user);
    formData.append('password', password);

    postAPI('login', formData)
      .then(this.onSignInResponse)
      .catch(this.onParsingFail)
  },

  onSignInResponse: function(json) {
    if(json.error) {
      console.log(json);
    } else {
      this.setState({user: json.user})
    }
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
  },

  addModule: function() {
    var modules = this.state.modules;
    modules.push(
      <Module type="welcome"
        title="Pushed Module"
        getZoneTest={this.getZoneTest}
        getAccountTest={this.getAccountTest} />
    )
    this.setState({modules: modules} )
  },

  removeModule: function() {
    var modules = this.state.modules;
    modules.pop()
    this.setState({modules: modules} )
  },

  onNavigate: function(where) {
    switch (where) {
      case "":

        break;
      default:

    }
  },

  render: function () {
    return (
      <div className="SqynetApp">
        <MenuBar user={this.state.user}
          addModule={this.addModule}
          removeModule={this.removeModule}
          onSignIn={this.onSignIn}/>
        <section className="modules">
          { this.state.modules }
        </section>
      </div>
    );
  }
});
