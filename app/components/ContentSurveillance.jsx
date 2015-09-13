var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var FormField = require('./FormField.jsx')

var helpers = require('../helpers.js')

module.exports = React.createClass({

  getInitialState: function() {
    return {
      showList: true,
      loading: true,
      surveillanceAreas: []
    };
  },
  componentDidMount: function() {
    this.apiGetSurveillanceAreas()
  },

  render: function () {
    var list = this.state.loading ? <p>loading</p> :
      <div key="list">
        <table>
          <tr>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Radius</th>
          </tr>
          {
            this.state.surveillanceAreas.map((area, index) =>
              <tr key={index}>
                <td>{area.Latitude}</td>
                <td>{area.Longitude}</td>
                <td>{area.Radius}</td>
              </tr>
            )
          }
        </table>
        {
          this.state.surveillanceAreas.length==0 ?
            <p>You have no surveillance areas yet.</p> : ""
        }
        <p><input type="button" onClick={this.toggleShowList} value="Add new surveillance area" /></p>
      </div>

    var form =
      <div key="form">
        <form onSubmit={this.handleSubmit} ref="form">
          <FormField name="latitude" label="Latitude (North/South)" type="number" value={0} />
          <FormField name="longitude" label="Longitude (East/West)" type="number" value={0} />
          <FormField name="radius" label="Radius (in km)" type="number" value={42} />
          <input type="hidden" name="type" value="1" />
          <p>
            This will add a suveilance zone (circular) around the provided coordinates (lat/long). You will be notified of all zone changes in this area.
          </p>
          <p><input type="submit" value="Add surveillance zone" /></p>
          <p><input type="button" onClick={this.toggleShowList} value="Cancel" /></p>
        </form>
      </div>

    return (
      <div className="Content ContentSurveillance">
        <ReactCSSTransitionGroup transitionName="swap">
          { this.state.showList ? list : form }
        </ReactCSSTransitionGroup>
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
      .then(this.onAddResponse)
      .catch(this.onParsingFail)
  },
  onAddResponse: function(json) {
    if(json.error) {
      console.log(json)
      this.props.do("addMessage",{type: "error", content: json.errorString})
    } else {
      this.props.do("addMessage",{type: "success", content: "Action successful: "+json.success})
      this.setState({showList: true})
      this.apiGetSurveillanceAreas()
    }
  },
  apiGetSurveillanceAreas: function() {
    helpers.getAPI('getSurveillanceAreas')
      .then(this.onGetResponse)
      .catch(this.onParsingFail)
  },
  onGetResponse: function(json) {
    if(json.error) {
      console.log(json)
      this.props.do("addMessage",{type: "error", content: json.errorString})
    } else {
      console.log(json);
      this.setState({loading: false, surveillanceAreas: json.data})
      this.props.do("addMessage",{type: "success", content: "Action successful: "+json.success})
    }
  },
  onParsingFail: function(ex) {
    console.log('JSON parsing failed', ex)
  },
  toggleShowList: function() {
    this.setState({showList: !this.state.showList})
  }

});
