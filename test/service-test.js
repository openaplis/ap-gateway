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

    var searchDefinition = {
      searchName: 'getByMasterAccessionNo',
      searchParams: [{ name: 'masterAccessionNo', value: '17-16410' }]
    }

    accessionOrderGateway.getAccessionOrder(searchDefinition, function (err, result) {
      if(err) return console.log(err)
      var ao = JSON.parse(result.json)
      console.log('Received: ' + ao.accessionOrder.masterAccessionNo)
      done()
    })
  })


  it('Client Test', function(done) {
    this.timeout(5000)
    
    var searchDefinition = {
      searchName: 'byClientId',
      searchParams: [{ name: 'clientId', value: '33' }]
    }

    providerGateway.getClientById(searchDefinition, function (err, result) {
      if(err) return console.log(err)
      console.log(result)
      done()
    })
  })
})
