var React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      value: this.props.value,
      type: this.props.type ? this.props.type : "text"
    };
  },

  onChange: function(e) {
    this.setState({value: e.target.value});
  },

  render: function () {
    return (
      <p className="FormField">
        <label htmlFor="{this.props.name}">{this.props.label}</label>
        <input onChange={this.onChange} type={this.state.type} name={this.props.name} value={this.state.value} />
      </p>
    );
  }
});
