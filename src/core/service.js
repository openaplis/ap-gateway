'use static'

var grpc = require('grpc')
var path = require('path')

var cmdSubmitter = require('ap-mysql').cmdSubmitter

var PROTO_PATH = path.join(__dirname, '../../node_modules/ap-protobuf/src/core/gateway.proto')
var protobuf = grpc.load(PROTO_PATH).gateway
var server = {};

module.exports = {

  start: function (callback) {
    server = new grpc.Server()

    server.addService(protobuf.MySQLGateway.service, {
      submitCmd: function (call, callback) {
        cmdSubmitter.submit(call.request.sql, function (err, rows) {
          if(err) return callback(err)
          //console.log(rows)
          callback(null, { json: JSON.stringify(rows) })
        })
      }
    })

    /*
    server.addService(protobuf.TaskGateway.service,
      {
        getUnacknowledgedTrackingNumbers: taskGateway.getUnacknowledgedTrackingNumbers,
        acknowledgeTaskOrder: taskGateway.acknowledgeTaskOrder
      })

    server.addService(protobuf.AccessionOrderGateway.service, {
      getAccessionOrder: function (call, callback) {
        accessionOrderGateway.getAccessionOrder(call.request.searchName, call.request.searchParams, function (err, ao) {
          callback(null, { masterAccessionNo: call.request.masterAccessionNo, json: JSON.stringify(ao) })
        })
      }
    })

    server.addService(protobuf.ProviderGateway.service, {
      getClient : function(call, callback) {
        providerGateway.getClient(call.request.searchName, call.request.searchParams, function(err, client) {
          callback(null, { json: JSON.stringify(client) })
        })
      }
    })
    */

    server.bind(process.env.AP_GATEWAY_SERVICE_BINDING, grpc.ServerCredentials.createInsecure())
    server.start()

    callback(null, {
      message: 'The Gateway service has started.',
      serviceBinding: process.env.AP_GATEWAY_SERVICE_BINDING
    })
  },

  shutdown: function (callback) {
    server.tryShutdown(function () {
      callback(null, { message: 'The Gateway service has been stopped.'} )
    })
  }

}
