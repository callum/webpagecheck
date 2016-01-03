var http = require('http')
var streamGrep = require('stream-grep')

module.exports = function webpagecheck (hostname, keywords, callback) {
  var matchers = keywords.map(function (keyword) {
    return new RegExp('\\b' + keyword + '\\b', 'i')
  })

  var req = http.request({ hostname: hostname }, function (res) {
    res.setEncoding('utf8')

    streamGrep(res, matchers)
    .on('found', function () {
      callback(true, null)
    })
    .on('end', function (found) {
      if (!found) callback(false, null)
    })
  })

  req.on('error', function (err) {
    callback(undefined, err)
  })

  req.end()
}
