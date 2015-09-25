var React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return {
    };
  },

  render: function () {


    return (
      (this.props.user.ID!=null) ?
        <div>
          <p>
            Welcome {this.props.user.Username}!
          </p>
          <p>
            Now you should set up surveillance for zones or entire areas (around geograpic coordinates).
          </p>
          <p>
            Notifications will be sent to {this.props.user.Email} when sQynet detects attacks on those zones.
          </p>
          <ol>
            <li><a onClick={this.onClickZones}>Find Zones</a></li>
            <li><a onClick={this.onClickSurveillance}>Add Surveillance</a></li>
          </ol>
        </div>
        :
        <div>
          <p>
            Here are your first steps:
          </p>
          <ol>
            <li><a onClick={this.onClickRegister}>Register</a></li>
            <li><a onClick={this.onClickLogin}>Log in</a></li>
            <li><a onClick={this.onClickZones}>Find Zones</a> / <a onClick={this.onClickSurveillance}>Add Surveillance</a></li>
          </ol>
        </div>
    )
  },

  /* Custom Methods */
  onClickRegister: function() {
    this.props.do('addModule',{type: "registration"})
  },
  onClickLogin: function() {
    this.props.do('focusLogin')
  },
  onClickSurveillance: function() {
    this.props.do('addModule',{type: "areas"})
  },
  onClickZones: function() {
    this.props.do('addModule',{type: "zones"})
  }

});
