'use strict'

var path = require('path')

var accessionOrderGateway = require(path.join(__dirname, 'core/accession-order-gateway'))

module.exports = {
  getAccessionOrder: accessionOrderGateway.getAccessionOrder
}
