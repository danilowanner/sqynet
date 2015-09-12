var React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      startTime: new Date(),
      time: 0,
      maxTime: 5000,
      paused: false
    };
  },

  componentWillUnmount: function() {
    clearInterval(this.interval)
  },
  componentDidMount: function() {
    this.interval = setInterval(this.onTick, 50)
  },
  onTick: function() {
    if(this.state.paused) return
    var now = new Date()
    var difference = now - this.state.startTime;

    if(difference>this.state.maxTime) this.removeModule()
    else this.setState({time: difference})
  },
  onMouseEnter: function(e) {
    this.setState({paused: true})
  },
  onMouseLeave: function(e) {
    this.setState({paused: false, startTime: new Date(), maxTime: 3000})
  },

  render: function () {
    return (
      <div className={ "Message "+this.props.type } onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <div className="time">
          <div className="segment">0{ this.props.index }.0{ this.props.messageKey }</div>
          <div className="segment">0{ (this.state.maxTime-this.state.time)/1000 }</div>
        </div>
        { this.props.content }
      </div>
    );
  },

  /* Custom Methods */
  removeModule: function() {
    clearInterval(this.interval)
    this.props.do("removeMessage",this.props.index)
  }
});
