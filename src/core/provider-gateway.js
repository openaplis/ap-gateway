'use strict'

module.exports = {
  getClientById: function(call, callback) {
    var sql = ['Select * from tblClient ',
      'where ClientId = \'' + call.request.clientId + '\';'].join('\n')
    cmdSubmitter.submit(sql, function(err, client) {
      if(err) return callback(err)
      callback(null, { client: client } )
    })
  }
}
