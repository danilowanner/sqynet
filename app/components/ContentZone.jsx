var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var helpers = require('../helpers.js')

module.exports = React.createClass({

  getInitialState: function() {
    return {
      loading: true,
      zone: null
    };
  },
  componentDidMount: function() {
    this.apiGetZone()
  },

  render: function () {
    return (
      <div className="Content ContentZone">
        {
          this.state.loading ? <p>Loading zone {this.props.zoneid}</p>
          : this.renderZone(this.state.zone)
        }
      </div>
    );
  },
  renderZone: function(zone) {
    return (
      <div>
        <div className="icon-and-text">
          <div class="icon">
            <iframe className="icon" src={ zone.SurveillanceID ? "assets/sqynet_satellite.svg" : "assets/sqynet_globe.svg" }></iframe>
          </div>
          <p>
            <strong>{zone.ZoneName}</strong><br/>
            <span>{zone.RegionName}</span><br/>
            {zone.Latitude} / {zone.Longitude}
          </p>
        </div>
        <ul className="counts">
          <li className="swarm">Swarm: <em>{zone.SwarmCount}</em></li>
          <li className="legion">Legion: <em>{zone.LegionCount}</em></li>
          <li className="faceless">Faceless: <em>{zone.FacelessCount}</em></li>
        </ul>
        <p>
          {
            zone.SurveillanceID ?
              <input type="button" onClick={this.removeSurveillance} value="Remove surveillance" />
              : <input type="button" onClick={this.addSurveillance} value="Surveil this zone" />
          }
        </p>
      </div>
    )
  },

  /* Custom Methods */
  apiGetZone: function() {
    helpers.getAPI('getZone/?zoneid='+this.props.zoneid)
      .then(this.onGetResponse)
      .catch(this.onFail)
  },
  onGetResponse: function(json) {
    if(json.error) {
      console.log(json)
      this.props.do("addMessage",{type: "error", content: json.errorString})
    } else {
      this.setState({loading: false, zone: json.zone})
    }
  },
  addSurveillance: function() {
    helpers.getAPI('addSurveillance/?type=2&zoneid='+this.props.zoneid)
      .then(this.onAddRemoveResponse)
      .catch(this.onFail)
  },
  removeSurveillance: function() {
    helpers.getAPI('removeSurveillance/?id='+this.state.zone.SurveillanceID)
      .then(this.onAddRemoveResponse)
      .catch(this.onFail)
  },
  onAddRemoveResponse: function(json) {
    if(json.error) {
      console.log(json)
      this.props.do("addMessage",{type: "error", content: json.errorString})
    } else {
      this.props.do("addMessage",{type: "success", content: "Action successful: "+json.success})
      this.apiGetZone()
    }
  },
  onFail: function(ex) {
    console.log('JSON parsing or handling failed', ex)
  },


});
