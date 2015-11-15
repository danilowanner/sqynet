require('whatwg-fetch');

console.log(process.env.NODE_ENV)
var apiURL = process.env.NODE_ENV=="development" ? 'http://public-api.dev.sqynet.ch/' : 'http://public-api.sqynet.ch/'

module.exports.getAPI = function(path) {
  var config = {
    method: 'get',
    headers: {
      'Accept': 'application/json'
    },
    credentials: 'include'
  }

  return window .fetch(apiURL+path,config)
                .then(function(response) {
                  return response.json()
                })
}

module.exports.postAPI = function(path, formData) {
  var config = {
    method: 'post',
    headers: {
      'Accept': 'application/json'
    },
    credentials: 'include',
    body: formData
  }

  return window .fetch(apiURL+path,config)
                .then(function(response) {
                  return response.json()
                })
}
