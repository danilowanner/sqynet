var React = require('react')

var SvgText = require('./SvgText.jsx')

function niceNumber(x) {
  if(x>999999) {
    return Math.round(x/100000)/10 + " Mio"
  }
  else if (x>999) {
    return Math.round(x/100)/10 + " k"
  }
  else {
    return Math.round(x)
  }
}

function niceDuration(x) {
  if(x>=1000*60*60*24*365) {
    return Math.round(x/(1000*60*60*24*365)*10)/10 + " Years"
  }
  else if(x>=1000*60*60*24*30) {
    return Math.round(x/(1000*60*60*24*30)*10)/10 + " Months"
  }
  else if(x>=1000*60*60*24*7) {
    return Math.round(x/(1000*60*60*24*7)*10)/10 + " Weeks"
  }
  else if (x>=1000*60*60*24) {
    return Math.round(x/(1000*60*60*24)*10)/10 + " Days"
  }
  else {
    return Math.round(x)
  }
}

module.exports = React.createClass({

  render: function () {

    var graph = []
    if(this.props.counts) {
      var startTime = new Date(this.props.counts[this.props.counts.length-1].Time)
      var endTime = new Date(this.props.counts[0].Time)

      var duration = endTime.getTime() - startTime.getTime()
      var maxValue = 100

      for (var i = 0; i < this.props.counts.length; i++) {
        var count = this.props.counts[i]
        maxValue = Math.max(count.SwarmCount, count.LegionCount, count.FacelessCount, maxValue)
      }

      var lineSwarm = "", lineFaceless = "", lineLegion = ""
      if (this.props.counts.length>1) {
        this.props.counts.map((count,i) => {

          var time = new Date(count.Time)
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

        lineFaceless += "0,"+ (140-values.faceless) +" 400,"+ (140-values.faceless)
        lineLegion += "0,"+ (140-values.legion) +" 400,"+ (140-values.legion)
        lineSwarm += "0,"+ (140-values.swarm) +" 400,"+ (140-values.swarm)
      }


      graph.push(<polyline points={lineFaceless} style={styles.lineFaceless} />)
      graph.push(<polyline points={lineLegion} style={styles.lineLegion} />)
      graph.push(<polyline points={lineSwarm} style={styles.lineSwarm} />)

    }

    return (
      <div className="SvgTimeline">
        <svg ref="svg" version="1.1" viewBox="-20 -40 440 220" width="420" height="220">
          { graph }
          <g className="grid-system">
            <SvgText x={0} y={-8}>{ niceNumber(maxValue) }</SvgText>
            <line x1={0} y1={-2} x2={400} y2={-2} style={styles.lineSystem} />
            <SvgText x={0} y={64}>{ niceNumber(maxValue/2) }</SvgText>
            <line x1={0} y1={70} x2={400} y2={70} style={styles.lineSystemDashed} />
            <SvgText x={0} y={136}>0</SvgText>
            <line x1={0} y1={142} x2={400} y2={142} style={styles.lineSystem} />
            <SvgText x={200} y={162} textAnchor="middle">{ niceDuration(duration) }</SvgText>
          </g>
        </svg>
      </div>
    );
  },

});

var styles = {
  lineSwarm: {stroke: "rgba(0,240,80,1)", fill: "none", strokeLinecap: "round", strokeWidth: 3},
  lineFaceless: {stroke: "rgba(180,10,120,1)", fill: "none", strokeLinecap: "round", strokeWidth: 3},
  lineLegion: {stroke: "rgba(230,60,50,1)", fill: "none", strokeLinecap: "round", strokeWidth: 3},
  lineSystem: {stroke: "#FFF", strokeWidth: 1, strokeLinecap: "round"},
  lineSystemDashed: {stroke: "#FFF", strokeWidth: 1, strokeLinecap: "round", strokeDasharray: "10,10"},
}
