require('whatwg-fetch');

module.exports.getAPI = function(path) {
  var config = {
    method: 'get',
    headers: {
      'Accept': 'application/json'
    },
    credentials: 'include'
  }

  return window .fetch('http://public-api.sqynet.ch/'+path,config)
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

  return window .fetch('http://public-api.sqynet.ch/'+path,config)
                .then(function(response) {
                  return response.json()
                })
}
