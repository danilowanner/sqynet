var React = require('react');

var helpers = require('../helpers.js');

module.exports = React.createClass({

  getInitialState: function() {
    return {
    };
  },

  render: function () {
    var user = this.props.user;

    return (
      <div className="Account">
        {
          user.ID ?
            <h2>Hallo {user.Username}!</h2>
          :
            <form onSubmit={this.handleSubmit} ref="loginform">
              <input onChange={this.onUsernameChange} type="text" name="username" placeholder="Username" value={this.props.user.Username} />
              <input type="password" name="password" placeholder="Password"/>
              <input type="submit" value="Login" />
            </form>
        }
      </div>
    );
  },

  /* Custom Methods */
  onUsernameChange: function(e) {
    this.props.do("onUsernameChange",e.target.value)
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var loginform = React.findDOMNode(this.refs.loginform);
    var formData = new FormData(loginform);
    this.apiLogin(formData);
  },
  apiLogin: function(formData) {
    helpers.postAPI('login', formData)
      .then(this.onLoginResponse)
      .catch(this.onParsingFail)
  },
  onLoginResponse: function(json) {
    if(json.error) {
      console.log(json)
      this.props.do("addMessage",{type: "error", content: json.errorString})
    } else {
      this.props.do("addMessage",{type: "success", content: "Action successful: "+json.success})
      this.props.do("onLogin",json.user)
    }
  },
  onParsingFail: function(ex) {
    console.log('JSON parsing failed', ex)
  }

});
