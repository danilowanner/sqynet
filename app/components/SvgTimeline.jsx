var React = require('react')

var SvgText = require('./SvgText.jsx')
var helpers = require('../helpers.js')

module.exports = React.createClass({

  render: function () {

    var graph = []
    if(this.props.counts) {
      var startTime = helpers.parseDate(this.props.counts[this.props.counts.length-1].Time)
      var endTime = helpers.parseDate(this.props.counts[0].Time)

      var duration = endTime.getTime() - startTime.getTime()
      var maxValue = 100

      for (var i = 0; i < this.props.counts.length; i++) {
        var count = this.props.counts[i]
        maxValue = Math.max(count.SwarmCount, count.LegionCount, count.FacelessCount, maxValue)
      }

      var lineSwarm = "", lineFaceless = "", lineLegion = ""
      if (this.props.counts.length>1) {
        this.props.counts.map((count,i) => {

          var time = helpers.parseDate(count.Time)
          var timeFromStart = time.getTime() - startTime.getTime()
          var position = timeFromStart/duration * 400

          var values = {
            swarm: count.SwarmCount/maxValue * 140,
            legion: count.LegionCount/maxValue * 140,
            faceless: count.FacelessCount/maxValue * 140
          }

          lineFaceless += (position) +","+ (140-values.faceless) +" "
          lineLegion += (position) +","+ (140-values.legion) +" "
          lineSwarm += (position) +","+ (140-values.swarm) +" "
        })
      }
      else {
        var count = this.props.counts[0]

        var values = {
          swarm: count.SwarmCount/maxValue * 140,
          legion: count.LegionCount/maxValue * 140,
          faceless: count.FacelessCount/maxValue * 140
        }

        lineFaceless += "400,"+ (140-values.faceless) +" 0,"+ (140-values.faceless)
        lineLegion += "400,"+ (140-values.legion) +" 0,"+ (140-values.legion)
        lineSwarm += "400,"+ (140-values.swarm) +" 0,"+ (140-values.swarm)
      }

      var areaFaceless = lineFaceless + " 0,140 400,140 ",
          areaLegion = lineLegion + " 0,140 400,140 " ,
          areaSwarm = lineSwarm + " 0,140 400,140 "

      graph.push(<polygon points={areaFaceless} style={styles.areaFaceless} />)
      graph.push(<polygon points={areaLegion} style={styles.areaLegion} />)
      graph.push(<polygon points={areaSwarm} style={styles.areaSwarm} />)

      graph.push(<polyline points={lineFaceless} style={styles.lineFaceless} />)
      graph.push(<polyline points={lineLegion} style={styles.lineLegion} />)
      graph.push(<polyline points={lineSwarm} style={styles.lineSwarm} />)

    }

    return (
      <div className="SvgTimeline">
        <svg ref="svg" version="1.1" viewBox="-20 -40 440 220" width="420" height="220">
          { graph }
          <g className="grid-system">
            <SvgText x={0} y={-8}>{ helpers.niceNumber(maxValue) }</SvgText>
            <line x1={0} y1={-2} x2={400} y2={-2} style={styles.lineSystem} />
            <SvgText x={0} y={64}>{ helpers.niceNumber(maxValue/2) }</SvgText>
            <line x1={0} y1={70} x2={400} y2={70} style={styles.lineSystemDashed} />
            <SvgText x={0} y={136}>0</SvgText>
            <line x1={0} y1={142} x2={400} y2={142} style={styles.lineSystem} />
            <SvgText x={200} y={162} textAnchor="middle">{ helpers.niceDuration(duration) }</SvgText>
          </g>
        </svg>
      </div>
    );
  },

});

var styles = {
  lineSwarm: {stroke: "rgba(14,174,22,1)", fill: "none", strokeLinecap: "round", strokeWidth: 3},
  lineFaceless: {stroke: "rgba(116,17,168,1)", fill: "none", strokeLinecap: "round", strokeWidth: 3},
  lineLegion: {stroke: "rgba(175,12,12,1)", fill: "none", strokeLinecap: "round", strokeWidth: 3},
  areaSwarm: {fill: "rgba(14,174,22,0.3)", stroke: "none"},
  areaFaceless: {fill: "rgba(116,17,168,0.3)", stroke: "none"},
  areaLegion: {fill: "rgba(175,12,12,0.3)", stroke: "none"},
  lineSystem: {stroke: "#FFF", strokeWidth: 1, strokeLinecap: "round"},
  lineSystemDashed: {stroke: "#FFF", strokeWidth: 1, strokeLinecap: "round", strokeDasharray: "8,10"},
}
