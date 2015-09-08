var React = require('react');
var FormField = require('./FormField.jsx')

module.exports = React.createClass({

  getInitialState: function() {
    return {
    };
  },

  handleSubmit: function(e) {
    e.preventDefault();
    alert("submit");
  },

  render: function () {
    return (
      <div className="Content ContentRegistrationForm">
        <form onSubmit={this.handleSubmit}>
          <FormField name="username" label="Username" value=""/>
          <FormField name="password" label="Password" value=""/>
          <FormField name="repeat" label="Repeat Password" value=""/>
          <FormField name="email" label="Email" value=""/>
          <p>
            This e-mail will be used to inform you of detected zone changes, alerts and general information from sQynet.
          </p>
          <input type="submit" value="Register" />
        </form>
      </div>
    );
  }
});
