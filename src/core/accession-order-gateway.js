'use strict'

var path = require('path')

var aoBuilder = require('ap-mysql').aoBuilder
var aoRetriever = require('ap-mysql').aoRetriever

module.exports = {
  getAccessionOrderByMasterAccessionNo: function (masterAccessionNo, callback) {
    aoRetriever.retrieve(masterAccessionNo, function (err, ao) {
      if(err) return callback(err)
      callback(null, { masterAccessionNo: masterAccessionNo, json: JSON.stringify(ao) })
    })
  }
}
