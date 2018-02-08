'use strict'

const assert = require('chai').assert
var accessionOrderGateway = require('../src/core/accession-order-gateway')

describe('Service Test', function() {
  it('Service Test', function(done) {
    this.timeout(5000)

    var searchDefinition = {
      searchName: 'getByMasterAccessionNo',
      searchParams: [{ name: 'masterAccessionNo', value: '18-123' }]
    }

    accessionOrderGateway.getAccessionOrder(searchDefinition, function (err, result) {
      if(err) return console.log(err)
      console.log('Received: ' + result.accessionOrder.masterAccessionNo)
      done()
    })

  })
})
