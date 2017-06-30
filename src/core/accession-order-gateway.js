'use strict'

var path = require('path')

var aoBuilder = require('ap-mysql').aoBuilder
var aoRetriever = require('ap-mysql').aoRetriever

var searchTypes = {
  getByMasterAccessionNo: getByMasterAccessionNo,
  getByAliquotOrderId: getByAliquotOrderId
}

module.exports = {
  getAccessionOrder: function (searchName, params, callback) {
    var handler = searchTypes[searchName]
    handler(params, function (err, ao) {
      if(err) return callback(err)
      callback(null, ao)
    })
  }
}

function getByMasterAccessionNo(params, callback) {

  aoRetriever.retrieve(call.request.masterAccessionNo, function (err, ao) {
    if(err) return callback(err)
    callback(null, { masterAccessionNo: call.request.masterAccessionNo, json: JSON.stringify(ao) })
  })
}

function getByAliquotOrderId(params, callback) {

}

/*
getAccessionOrderByMasterAccessionNo: function (call, callback) {
  console.log('Retrieving: ' + call.request.masterAccessionNo)
  aoRetriever.retrieve(call.request.masterAccessionNo, function (err, ao) {
    if(err) return callback(err)
    callback(null, { masterAccessionNo: call.request.masterAccessionNo, json: JSON.stringify(ao) })
  })
},

getAccessionOrderByAliquotOrderId: function (call, callback) {
  console.log('Retrieving: ' + call.request.masterAccessionNo)
  aoRetriever.retrieve(call.request.masterAccessionNo, function (err, ao) {
    if(err) return callback(err)
    callback(null, { masterAccessionNo: call.request.masterAccessionNo, json: JSON.stringify(ao) })
  })
}
*/
