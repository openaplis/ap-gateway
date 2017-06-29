'use strict'

const path = require('path')
const grpc = require('grpc')
const service = require('../src/core/service')

const PROTO_PATH = path.join(__dirname, '../node_modules/ap-protobuf/src/core/gateway.proto')
const gateway_proto = grpc.load(PROTO_PATH).gateway
const accessionOrderGateway = new gateway_proto.AccessionOrderGateway(process.env.AP_GATEWAY_SERVICE_BINDING, grpc.credentials.createInsecure())
const providerGateway = new gateway_proto.ProviderGateway(process.env.AP_GATEWAY_SERVICE_BINDING, grpc.credentials.createInsecure())

describe('Service Test', function() {
  it('Service Test', function(done) {
    this.timeout(5000)
    accessionOrderGateway.getAccessionOrderByMasterAccessionNo( { masterAccessionNo: '17-16410' }, function (err, result) {
      if(err) return console.log(err)
      console.log(result)
      done()
    })
  })

  it('Client Test', function(done) {
    this.timeout(5000)
    providerGateway.getClientById( { clientId: '33' }, function (err, result) {
      if(err) return console.log(err)
      console.log(result)
      done()
    })
  })
})
