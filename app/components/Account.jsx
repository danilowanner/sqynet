var React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      formData: {user: this.props.user.Username, password: ""}
    };
  },

  onChangeUser: function(e) {
    var formData = this.state.formData;
    formData.user = e.target.value;
    this.setState({formData: formData});
  },
  onChangePassword: function(e) {
    var formData = this.state.formData;
    formData.password = e.target.value;
    this.setState({formData: formData});
  },

  handleSubmit: function(e) {
    e.preventDefault();

    this.props.onSignIn(this.state.formData.user, this.state.formData.password);
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
            <form onSubmit={this.handleSubmit}>
              <input onChange={this.onChangeUser} type="text" value={formData.user} />
              <input onChange={this.onChangePassword} type="password" value={formData.password} />
              <input type="submit" value="Login" />
            </form>
        }
      </div>
    );
  }
});
