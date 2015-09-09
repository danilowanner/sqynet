var React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      formData: {username: this.props.user.Username, password: ""}
    };
  },

  onChangeUsername: function(e) {
    var formData = this.state.formData;
    formData.username = e.target.value;
    this.setState({formData: formData});
  },
  onChangePassword: function(e) {
    var formData = this.state.formData;
    formData.password = e.target.value;
    this.setState({formData: formData});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var loginform = React.findDOMNode(this.refs.loginform);
    var formData = new FormData(loginform);
    this.props.do("apiLogin",formData);
  },

  render: function () {
    var user = this.props.user;
    var formData = this.state.formData;

    return (
      <div className="Account">
        {
          user.ID ?
            <h2>Hallo {user.Username}!</h2>
          :
            <form onSubmit={this.handleSubmit} ref="loginform">
              <input onChange={this.onChangeUsername} type="text" name="username" value={formData.username} />
              <input onChange={this.onChangePassword} type="password" name="password"  value={formData.password} />
              <input type="submit" value="Login" />
            </form>
        }
      </div>
    );
  }
});
