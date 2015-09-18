var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var helpers = require('../helpers.js')

module.exports = React.createClass({

  getInitialState: function() {
    return {
      loading: true,
      region: null
    };
  },
  componentDidMount: function() {
    this.apiGetRegion()
  },

  render: function () {
    return (
      <div className="Content ContentRegion">
        {
          this.state.loading ? <p>Loading region {this.props.regionid}</p>
        : this.renderRegion(this.state.region)
        }
      </div>
    );
  },
  renderRegion: function(region) {
    return (
      <div>
        <div className="icon-and-text">
          <div class="icon">
            <iframe className="icon" src={ region.SurveillanceID ? "assets/sqynet_satellite.svg" : "assets/sqynet_globe.svg" }></iframe>
          </div>
          <p>
            <strong>{region.RegionName}</strong><br/>
            <span>{region.CountryName}</span>
          </p>
        </div>
        <p>
          {
            region.SurveillanceID ?
              <input type="button" onClick={this.removeSurveillance} value="Remove surveillance" />
              : <input type="button" onClick={this.addSurveillance} value="Surveil this region" />
          }
        </p>
      </div>
    )
  },

  /* Custom Methods */
  apiGetRegion: function() {
    helpers.getAPI('getRegion/?regionid='+this.props.regionid)
      .then(this.onGetResponse)
      .catch(this.onFail)
  },
  onGetResponse: function(json) {
    if(json.error) {
      console.log(json)
      this.props.do("addMessage",{type: "error", content: json.errorString})
    } else {
      this.setState({loading: false, region: json.region})
    }
  },
  addSurveillance: function() {
    helpers.getAPI('addSurveillance/?type=3&regionid='+this.props.regionid)
      .then(this.onAddRemoveResponse)
      .catch(this.onFail)
  },
  removeSurveillance: function() {
    helpers.getAPI('removeSurveillance/?id='+this.state.region.SurveillanceID)
      .then(this.onAddRemoveResponse)
      .catch(this.onFail)
  },
  onAddRemoveResponse: function(json) {
    if(json.error) {
      console.log(json)
      this.props.do("addMessage",{type: "error", content: json.errorString})
    } else {
      this.props.do("addMessage",{type: "success", content: "Action successful: "+json.success})
      this.apiGetRegion()
    }
  },
  onFail: function(ex) {
    console.log('JSON parsing or handling failed', ex)
  },


});
