'use strict'

var path = require('path')

var aoBuilder = require('ap-mysql').aoBuilder
var aoRetriever = require('ap-mysql').aoRetriever

module.exports = {
  getAccessionOrderByMasterAccessionNo: function (call, callback) {
    console.log('Retrieving: ' + call.request.masterAccessionNo)
    aoRetriever.retrieve(call.request.masterAccessionNo, function (err, ao) {
      if(err) return callback(err)
      callback(null, { masterAccessionNo: call.request.masterAccessionNo, json: JSON.stringify(ao) })
    })
  }
}
