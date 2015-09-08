var React = require('react');

var Navigation = require('./Navigation.jsx');
var Account = require('./Account.jsx');

module.exports = React.createClass({
  render: function () {
    return (
      <div className="MenuBar">
        <h1>sQynet<sup>beta</sup></h1>
        <Navigation
          addModule={this.props.do.bind(null,"addModule")}
          removeModule={this.props.do.bind(null,"removeModule")} />
        {
          //console.log(this.props.account)
        }
        <Account user={this.props.user} do={this.props.do} />
      </div>
    );
  }
});
