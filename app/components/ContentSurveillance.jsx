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
      <div className="Content ContentSurveillance">
        <form onSubmit={this.handleSubmit} ref="form">
          <FormField name="latitude" label="Latitude (North/South)" type="number" value={0} />
          <FormField name="longitude" label="Longitude (East/West)" type="number" value={0} />
          <FormField name="radius" label="Radius (in km)" type="number" value={42} />
          <input type="hidden" name="type" value="1" />
          <p>
            This will add a suveilance zone (circular) around the provided coordinates (lat/long). You will be notified of all zone changes in this zone.
          </p>
          <p><input type="submit" value="Add surveillance zone" /></p>
        </form>
      </div>
    );
  },

  /* Custom Methods */
  handleSubmit: function(e) {
    e.preventDefault();
    var form = React.findDOMNode(this.refs.form);
    var formData = new FormData(form);
    this.apiAddSurveillance(formData)
  },
  apiAddSurveillance: function(formData) {
    helpers.postAPI('addSurveillance', formData)
      .then(this.onResponse)
      .catch(this.onParsingFail)
  },
  onParsingFail: function(ex) {
    console.log('JSON parsing failed', ex)
  },
  onResponse: function(json) {
    if(json.error) {
      console.log(json)
      this.props.do("addMessage",{type: "error", content: json.errorString})
    } else {
      this.props.do("addMessage",{type: "success", content: "Action successful: "+json.success})
      // TODO update list of surveillance areas
    }
  }

});
