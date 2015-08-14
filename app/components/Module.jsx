var React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      title: this.props.title
    };
  },

  render: function () {
    return (
      <div className="Module">
        <h1>{this.state.title}</h1>
        <p>
          Welcome to sQynet!
          <br/><a onClick={this.props.getZoneTest}>Get Zone Test</a>
          <br/><a onClick={this.props.getAccountTest}>Get Account Test</a>
        </p>
      </div>
    );
  }
});
