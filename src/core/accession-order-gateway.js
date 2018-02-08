'use strict'

var path = require('path')
var _ = require('underscore')

var aoBuilder = require('ap-mysql').aoBuilder
var aoRetriever = require('ap-mysql').aoRetriever
var cmdSubmitter = require('ap-mysql').cmdSubmitter

var searchTypes = {
  getByMasterAccessionNo: getByMasterAccessionNo,
  getByAliquotOrderId: getByAliquotOrderId
}

module.exports = {
  getAccessionOrder: function (searchDefinition, callback) {    
    var handler = searchTypes[searchDefinition.searchName]
    handler(searchDefinition.params, function (err, ao) {
      if(err) return callback(err)
      callback(null, ao)
    })
  }
}

function retrieveAccessionOrder (masterAccessionNo, callback) {
  aoRetriever.retrieve(masterAccessionNo, function (err, ao) {
    if(err) return callback(err)
    callback(null, ao)
  })
}

function getByMasterAccessionNo(params, callback) {
  var masterAccessionNo = _.find(params, function (p) { return p.name == 'masterAccessionNo' }).value
  console.log('Received request for: ' + masterAccessionNo)
  retrieveAccessionOrder(masterAccessionNo, callback)
}

function getByAliquotOrderId(params, callback) {
  var aliquotOrderId = _.find(params, function (p) { return p.name == 'aliquotOrderId' }).value
  console.log('Received request for: ' + masterAccessionNo)
  var masterAccessionNo = aliquotOrderId.split('.')[0]
  retrieveAccessionOrder(masterAccessionNo, callback)
}
