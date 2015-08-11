var React = require('react');
require('whatwg-fetch');

var MenuBar = require('./MenuBar.jsx');

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
      zones: []
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

  render: function () {
    return (
      <div>
        <MenuBar user={this.state.user} onSignIn={this.onSignIn}/>
        <h1>Hello world!</h1>
        Welcome to sQynet!
        <br/><a onClick={this.getZoneTest}>Get Zone Test</a>
        <br/><a onClick={this.getAccountTest}>Get Account Test</a>
      </div>
    );
  }
});
