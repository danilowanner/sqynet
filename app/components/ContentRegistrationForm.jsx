var React = require('react')
var FormField = require('./FormField.jsx')

var helpers = require('../helpers.js')

module.exports = React.createClass({

  getInitialState: function() {
    return {
    };
  },

  render: function () {
    return (
      <div className="Content ContentRegistrationForm">
        <form onSubmit={this.handleSubmit} ref="form">
          <FormField name="username" label="Username" value={this.state.username} />
          <FormField name="password" label="Password" type="password" value={this.state.password} />
          <FormField name="repeat" label="Repeat Password" type="password" value={this.state.repeat} />
          <FormField name="email" label="Email" value={this.state.email} />
          <p>
            This e-mail will be used to inform you of detected zone changes, alerts and general information from sQynet.
          </p>
          <FormField name="latitude" label="Latitude (North/South)" type="number" value={null} />
          <FormField name="longitude" label="Longitude (East/West)" type="number" value={null} />
          <p>
            You will receive notifications for heavy attacks within nano missile reach.
          </p>
          <p><input type="submit" value="Register" /></p>
        </form>
      </div>
    );
  },

  /* Custom Methods */
  handleSubmit: function(e) {
    e.preventDefault();
    var form = React.findDOMNode(this.refs.form);
    var formData = new FormData(form);
    this.apiRegister(formData)
  },
  apiRegister: function(formData) {
    helpers.postAPI('register', formData)
      .then(this.onRegisterResponse)
      .catch(this.onParsingFail)
  },
  onParsingFail: function(ex) {
    console.log('JSON parsing failed', ex)
  },
  onRegisterResponse: function(json) {
    if(json.error) {
      console.log(json)
      this.props.do("addMessage",{type: "error", content: json.errorString})
    } else {
      this.props.onRegister();
      this.props.do("onRegister",json.username)
    }
  }

});
