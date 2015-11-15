require('whatwg-fetch');

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

module.exports.parseDate = function(dateString) {
  var arr = dateString.split(/[- :]/)
  return new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5])
}

module.exports.niceNumber = function(x) {
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

module.exports.niceDuration = function(x) {
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
