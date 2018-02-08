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
