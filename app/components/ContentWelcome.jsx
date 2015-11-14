var React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return {
    };
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
  },

  render: function () {

    var loggedOut =
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
    var loggedIn =
      <div>
        <p>
          Welcome {this.props.user.Username}!
        </p>
        <p>
          Now you need to verify your faction. You do this by sending an in-game message to Lithagon containing your account e-mail ({this.props.user.Email}).
        </p>
      </div>
    var loggedInSwarm =
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
    var loggedInNotSwarm =
      <div>
        <p>
          Welcome {this.props.user.Username}!
        </p>
        <ol>
          <li><a onClick={this.onClickZones}>Find Zones</a></li>
        </ol>
      </div>

    var content
    if(this.props.user.ID==null) {
      content = loggedOut
    }
    else {
      if(this.props.user.FactionID==2) {
        content = loggedInSwarm
      }
      else if(this.props.user.FactionID==undefined) {
        content = loggedIn
      }
      else {
        content = loggedInNotSwarm
      }
    }

    return content
  },

});
