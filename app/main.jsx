var React = require('react');
var SqynetApp = require('./components/SqynetApp.jsx');

var normalizecss = require('normalize.css');
var css = require('./main.css');

React.render(<SqynetApp/>, document.body);

console.log('Loaded the sqynet app component and rendered it into document body');
console.log('Running with NODE_ENV "'+process.env.NODE_ENV+'"');
