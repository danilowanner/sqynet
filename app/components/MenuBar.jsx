var React = require('react');

var Navigation = require('./Navigation.jsx');
var Account = require('./Account.jsx');

module.exports = React.createClass({
  render: function () {
    return (
      <div className="MenuBar">
        <h1>sQynet<sup>beta</sup></h1>
        <Navigation
          addModule={this.props.addModule}
          removeModule={this.props.removeModule} />
        {
          //console.log(this.props.account)
        }
        <Account user={this.props.user} onSignIn={this.props.onSignIn} />
      </div>
    );
  }
});
