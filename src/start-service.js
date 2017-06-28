var path = require('path')

var service = require(path.join(__dirname, './core/service'))

service.start(function (err, message) {
  if(err) return console.log(err)
  console.log(message)
})
