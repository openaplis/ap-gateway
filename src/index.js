'use strict'

var path = require('path')

var accessionOrderGateway = require(path.join(__dirname, 'core/accession-order-gateway'))
var providerGateway = require(path.join(__dirname, 'core/provider-gateway'))

module.exports = {
  getAccessionOrder: accessionOrderGateway.getAccessionOrder,
  getClient: providerGateway.getClient
}
