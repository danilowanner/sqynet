var React = require('react');
require('whatwg-fetch');

/*window.fetch('http://public-api.sqynet.ch')
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    console.log('parsed json', json)
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })*/

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Hello world!</h1>
        Welcome to sQynet!
      </div>
    );
  }
});
