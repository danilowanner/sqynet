var React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return {
    };
  },

  render: function () {
    return (
      <ul onClick={this.toggleOpen}>
        <li>List</li>
      </ul>
    );
  }
});
