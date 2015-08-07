var React = require('react');
var SqynetApp = require('./components/SqynetApp.jsx');

var css = require('../build/main.css');

React.render(<SqynetApp/>, document.body);
console.log('Loaded the sqynet app component and rendered it into document body');
