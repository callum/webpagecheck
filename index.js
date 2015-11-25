var http = require('http')

module.exports = function webpagecheck (hostname, keywords, callback) {
  var req = http.request({ hostname: hostname }, function (res) {
    var body = ''

    res.setEncoding('utf8')

    res.on('data', function (chunk) {
      body += chunk
    })

    res.on('end', function () {
      var containsKeywords = keywords.some(function (keyword) {
        return body.search(new RegExp('\\b' + keyword + '\\b', 'i')) !== -1
      })

      callback(containsKeywords, null)
    })
  })

  req.on('error', function (err) {
    callback(undefined, err)
  })

  req.end()
}
