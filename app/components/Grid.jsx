var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var AutoResponsive = require('autoresponsive-react');
var Module = require('./Module.jsx');


module.exports = React.createClass({

  getInitialState: function() {
    return {
      modules: this.getModules(this.props.modules),
      autoresponsiveProps: this.getAutoresponsiveProps(),
      gridHeight: 10
    };
  },
  componentWillReceiveProps(nextProps) {
    var modules = this.getModules(this.props.modules)
    this.setState({modules: modules})
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.onResize, false);
  },
  onResize: function() {
    this.setState({autoresponsiveProps: this.getAutoresponsiveProps()});
  },

  render: function () {
    return (
      <div className="Grid">
        <AutoResponsive {...this.state.autoresponsiveProps} >
          { this.renderModules() }
        </AutoResponsive>
      </div>
    )
  },
  renderModules: function() {
    return this.state.modules.map((module, i) => {
        // set width and height, limit width to containerWidth
        /*var moduleStyle = this.state.moduleStyles[module.key];*/
        var styles = {
              width: Math.min(module.width*this.state.autoresponsiveProps.gridWidth, this.state.autoresponsiveProps.containerWidth),
              height: module.height*this.state.gridHeight
            }
        return (
          <div className="grid-item" key={module.key} style={styles}>
            <div className="index">00.0{i}.00{module.key}</div>
            <div className="close" onClick={this.props.do.bind(null,"removeModule",module.key)}>x<div> close</div></div>
            <Module do={this.props.do} type={module.type} key={module.key} data={module.data} index={i} onHeightChange={this.onModuleHeightChange}/>
          </div>
        )
      })
  },

  /* Custom Methods */
  getAutoresponsiveProps: function() {
    var em = document.body.clientWidth > 659 ? 17 : 15 /* mobile breakpoint at 659px */
    return {
      containerWidth: document.body.clientWidth-1*em, /* 1em border-width */
      gridWidth: em, /* 1em grid-width */
      itemClassName: 'grid-item',
      itemMargin: 0,
      transitionDuration: '.4',
      transitionTimingFunction: 'ease'
    }
  },

  getModules(targetModules) {
    var results = [];
    var modules = (this.state && this.state.modules) ? this.state.modules : [];
    // Update internal state to match modules from props
    targetModules.forEach((targetModule,i) => {
      var module = this.findModuleByKey(targetModule.key)
      if(module) {
        // add existing module to results
        results.push(module);
      }
      else {
        // add new module to results
        results.push( this.createModule(targetModule) )
      }
    })
    // TODO: detect removed modules
    return results;
  },

  findModuleByKey(key) {
    var modules = (this.state && this.state.modules) ? this.state.modules : [];
    var result
    modules.some((module) => {
      if(module.key == key) {
        result = module
        return true
      }
    })
    if(result) return result
    return false
  },

  createModule(props) {
    props.width = props.type=="zones" ? 30 : 20
    props.height = 10
    return props;
  },

  onModuleHeightChange: function(index,height) {
    var modules = this.state.modules
    // update style of this module to match height of content, plus bottom margin (30px)
    modules[index].height = Math.ceil(height/this.state.gridHeight) + 3
    this.setState({modules: modules} )
  }

});
