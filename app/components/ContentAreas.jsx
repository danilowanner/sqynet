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
    var list =
      <div key="list">
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Lat</th>
                <th>Long</th>
                <th>Radius</th>
                <th>d</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.surveillanceAreas.map((area, index) =>
                  <tr key={area.ID}>
                    <td>{area.Latitude}</td>
                    <td>{area.Longitude}</td>
                    <td>{area.Radius}</td>
                    <td><a onClick={this.apiRemoveArea.bind(null,area.ID)} title="remove">✕</a></td>
                  </tr>
                )
              }
              {
                this.state.loading ? <tr key="loading"><td colSpan={4} style={{textAlign: "center"}}>loading</td></tr> : ""
              }
              {
                this.state.surveillanceAreas.length==0 ?
                  <tr key="empty"><td colSpan={4} style={{textAlign: "center"}}>You have no surveillance areas yet.</td></tr> : ""
              }
            </tbody>
          </table>
        </div>

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
          <p><input type="submit" value="Add surveillance area" /></p>
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
    this.apiAddArea(formData)
  },

  apiRemoveArea: function(id) {
    helpers.getAPI('removeSurveillance/?id='+id)
      .then(this.onAddRemoveResponse)
      .catch(this.onFail)
  },

  apiAddArea: function(formData) {
    helpers.postAPI('addSurveillance', formData)
      .then(this.onAddRemoveResponse)
      .catch(this.onFail)
  },

  onAddRemoveResponse: function(json) {
    if(json.error) {
      console.log(json)
      this.props.do("addMessage",{type: "error", content: json.errorString})
    } else {
      this.props.do("addMessage",{type: "success", content: "Action successful: "+json.success})
      this.setState({showList: true, loading: true})
      this.apiGetSurveillanceAreas()
    }
  },

  apiGetSurveillanceAreas: function() {
    helpers.getAPI('getSurveillanceAreas')
      .then(this.onGetResponse)
      .catch(this.onFail)
  },

  onGetResponse: function(json) {
    if(json.error) {
      console.log(json)
      this.props.do("addMessage",{type: "error", content: json.errorString})
    } else {
      console.log(json);
      this.setState({loading: false, surveillanceAreas: json.data})
    }
  },

  onFail: function(ex) {
    console.log('JSON parsing or handling failed', ex)
  },

  toggleShowList: function() {
    this.setState({showList: !this.state.showList})
  },

});
