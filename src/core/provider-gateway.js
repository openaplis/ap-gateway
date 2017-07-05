'use strict'

var _ = require('underscore')
var cmdSubmitter = require('ap-mysql').cmdSubmitter

var searchTypes = {
  byClientId: byClientId
}

module.exports = {
  getClient: function(searchName, params, callback) {
    var handler = searchTypes[searchName]
    handler(params, function (err, result) {
      if(err) return callback(err)
      callback(null, result)
    })
  }
}

function byClientId(params, callback) {
  var clientId = _.find(params, function (p) { return p.name == 'clientId' }).value
  var sql = 'Select * from tblClient where ClientId = \'' + clientId + '\';'
  cmdSubmitter.submit(sql, function(err, result) {
    if(err) return callback(err)
    console.log(result[0])
    var clnt = camelCase.toLower(result[0])
    console.log(clnt)
    callback(null, clnt)
  })
}
