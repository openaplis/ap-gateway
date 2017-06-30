'use strict'

const assert = require('chai').assert

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
