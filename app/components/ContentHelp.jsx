var React = require('react');

const ContentHelp = React.createClass({

  /* Custom Methods */
  _onClickReset: function() {
    this.props.do('addModule',{type: "resetpassword"})
  },

  render: function () {

    return (
      <div>
        <p>
          If you forgot your password you can <a onClick={this._onClickReset}>reset it here</a>.
        </p>
        <p>
          If you have a question regarding sQynet feel free to send an in-game message to Lithagon or ElphCrimLester.
        </p>
      </div>
    )
  },

});

module.exports = ContentHelp;
