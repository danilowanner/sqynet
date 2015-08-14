var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div className="Module">
        <h1>Hello world!</h1>
        Welcome to sQynet!
        <br/><a onClick={this.props.getZoneTest}>Get Zone Test</a>
        <br/><a onClick={this.props.getAccountTest}>Get Account Test</a>
      </div>
    );
  }
});
