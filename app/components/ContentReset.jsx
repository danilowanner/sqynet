var React = require('react');
var FormField = require('./FormField.jsx')

var helpers = require('../helpers.js')

const ContentReset = React.createClass({

  /* Custom Methods */
  _handleSubmit: function(e) {
    e.preventDefault();
    var form = React.findDOMNode(this.refs.form);
    var formData = new FormData(form);
    this._apiRegister(formData)
  },
  _apiRegister: function(formData) {
    helpers.postAPI('resetPassword', formData)
      .then(this._onResetResponse)
      .catch(this._onParsingFail)
  },
  _onParsingFail: function(ex) {
    console.log('JSON parsing failed', ex)
  },
  _onResetResponse: function(json) {
    if(json.error) {
      console.log(json)
      this.props.do("addMessage",{type: "error", content: json.errorString})
    } else {
      this.props.do("addMessage",{type: "success", content: "An e-mail with your new password has been sent to "+json.email})
    }
  },

  render: function () {

    return (
      <div className="Content ContentReset">
        <form onSubmit={this._handleSubmit} ref="form">
          <FormField name="email" label="Email" value="" />
          <p>
            Provide the e-mail you used to register for sQynet and we will generate and send a new password.
          </p>
          <p><input type="submit" value="Send a new password" /></p>
        </form>
      </div>
    )
  },

});

module.exports = ContentReset;
