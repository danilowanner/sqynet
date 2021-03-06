var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var FormField = require('./FormField.jsx')

var helpers = require('../helpers.js')

module.exports = React.createClass({

  getInitialState: function() {
    return {
      loading: false,
      zones: false
    };
  },
  render: function () {
    return (
      <div className="Content ContentZones">
        <ReactCSSTransitionGroup transitionName="swap">
          { this.renderForm() }
          { this.state.loading ? <p key="loading">loading...</p> : ""}
          { this.state.zones ? this.renderList() : "" }
          { this.state.zones.length==0 ? <p key="noresults">No results found</p> : "" }
          { this.state.zones.length==100 ? <p key="moreresults">Some results were left out. Narrow search to show them.</p> : "" }
        </ReactCSSTransitionGroup>
      </div>
    );
  },
  renderForm: function () {
    return (
      <div key="form">
        <form onSubmit={this.handleSubmit} ref="form">
          <FormField name="search" label="Search (ID or name)" value="" />
          <FormField name="country" label="Country" value="" />
          <p><input type="submit" value="Search zones" /></p>
        </form>
      </div>
    );
  },
  renderList: function () {
    return (
      <div className="table" key="list" >
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Region</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.zones.map((zone, index) =>
                <tr key={zone.ID}>
                  <td>{zone.ID}</td>
                  <td><a onClick={this.onClickZone.bind(null, zone.ID)}>{zone.ZoneName}</a></td>
                  <td><a onClick={this.onClickRegion.bind(null, zone.RegionID)}>{zone.RegionName}</a></td>
                  <td>{zone.CountryName}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    );
  },

  /* Custom Methods */
  handleSubmit: function(e) {
    e.preventDefault();
    var form = React.findDOMNode(this.refs.form);
    var formData = new FormData(form);
    this.apiSearchZones(formData)
  },
  apiSearchZones: function(formData) {
    helpers.postAPI('searchZones', formData)
      .then(this.onSearchResponse)
      .catch(this.onParsingFail)
    this.setState({loading: true})
  },
  onSearchResponse: function(json) {
    if(json.error) {
      console.log(json)
      this.props.do("addMessage",{type: "error", content: json.errorString})
      this.setState({loading: false})
    } else {
      this.props.do("addMessage",{type: "success", content: "Action successful: "+json.success})
      this.setState({loading: false, zones: json.zones})
    }
  },
  onParsingFail: function(ex) {
    console.log('JSON parsing failed', ex)
  },
  onClickZone: function(zoneid) {
    this.props.do("addModule",{type: "zone", data: {zoneid: zoneid}})
  },
  onClickRegion: function(regionid) {
    this.props.do("addModule",{type: "region", data: {regionid: regionid}})
  },

});
