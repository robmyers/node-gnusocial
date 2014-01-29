//
//  GNU social Twitter-compatible API Wrapper
//
var Auth = require('./auth')
  , OARequest = require('./oarequest')

//  Endpoints
var OA_REQ        = 'oauth/request_token'
  , OA_ACCESS     = 'oauth/access_token'

//
//  GNUsocial
//
var GNUsocial = function (config) {
  var credentials = {
      oauth_request_url   : config.api_url+OA_REQ
    , oauth_access_url    : config.api_url+OA_ACCESS
    , consumer_key        : config.consumer_key
    , consumer_secret     : config.consumer_secret
    , access_token        : config.access_token
    , access_token_secret : config.access_token_secret
  }

  this.config = config;
  this.config.oauth_request_url = config.api_url+OA_REQ;
  this.config.oauth_access_url = config.api_url+OA_ACCESS;

  //authenticate our oauth client
  this.auth = new Auth(credentials)
}

GNUsocial.prototype = {
  get: function (path, params, callback) {
    this.request('GET', this.config.api_url + path, params, callback)
  },
  post: function (path, params, callback) {
    this.request('POST', this.config.api_url + path, params, callback)
  },
  request: function (method, path, params, callback) {
    if (typeof params === 'function') {
      callback = params
      params = {}
    }

    // regex to extract :params from `path`
    var rgxParam = /\/:(\w+)/g
    // clone `params` object so we can modify it without modifying the user's reference
    var paramsClone = JSON.parse(JSON.stringify(params))

    var missingParamErr = null

    var finalPath = path.replace(rgxParam, function (hit) {
      var paramName = hit.slice(2)
      var userVal = paramsClone[paramName]

      if (!userVal) {
        missingParamErr = new Error('GNUsocial: Params object is missing a required parameter for this request: `'
                                   +paramName+'`')
        return
      }

      // clone this param value, and delete from `paramsClone` so we don't pass it in the querystring or body
      var paramVal = JSON.parse(JSON.stringify(userVal))
      delete paramsClone[paramName]

      return '/' + paramVal
    })

    if (missingParamErr) {
      return callback(missingParamErr)
    }

    // convert any arrays in `paramsClone` to comma-seperated strings
    var finalParams = this.normalizeParams(paramsClone)

    return new OARequest(this.auth, method, finalPath + '.json', finalParams).end(callback)
  },
  normalizeParams: function (params) {
    var normalized = params
    if (params && typeof params === 'object') {
      Object.keys(params).forEach(function (key) {
        var value = params[key]
        // replace any arrays in `params` with comma-separated string
        if (Array.isArray(value))
          normalized[key] = value.join(',')
      })
    }
    return normalized
  },
  setAuth: function (auth) {
    var self = this
    var authKeys = [ 'consumer_key', 'consumer_secret', 'access_token', 'access_token_secret' ];

    // update config
    authKeys.forEach(function (authKey) {
      if (auth[authKey]) {
        self.config[authKey] = auth[authKey]
      }
    })

    // create a new auth object
    this.auth = new Auth(this.config)
  },
  getAuth: function () {
    return this.config
  }
}

module.exports = GNUsocial
