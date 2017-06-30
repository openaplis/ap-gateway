'use strict'

var _ = require('underscore')
var cmdSubmitter = require('ap-mysql').cmdSubmitter

var searchTypes = {
  byClientId: byClientId
}

module.exports = {
  getClient: function(searchName, params, callback) {
    var handler = searchTypes[searchName]
    handler(params, function (err, client) {
      if(err) return callback(err)
      callback(null, client)
    })
  }
}

function byClientId(params, callback) {
  var clientId = _.find(params, function (p) { return p.searchName == 'clientId' }).value
  var sql = ['Select * from tblClient ',
    'where ClientId = \'' + clientId + '\';'].join('\n')
    console.log(sql)
  cmdSubmitter.submit(sql, function(err, client) {
    if(err) return callback(err)
    callback(null, client )
  })
}
