var test = require('tape')
var http = require('http')
var webpagecheck = require('./')

test('found', function (t) {
  t.plan(2)
  check(t, ['foo'], true)
  check(t, ['barbaz', 'foo'], true)
})

test('not found', function (t) {
  t.plan(1)
  check(t, ['quux'], false)
})

test('word boundary', function (t) {
  t.plan(1)
  check(t, ['fizz', 'buzz'], false)
})

test('case insensitivity', function (t) {
  t.plan(1)
  check(t, ['FIZZbuzz'], true)
})

function check (t, keywords, expected) {
  var server = http.createServer(function (req, res) {
    res.end('foo bar baz fizzbuzz')
  })
  server.listen(0, function () {
    webpagecheck({ port: server.address().port }, keywords, function (found) {
      t.equal(found, expected)
    })
  })
  t.on('end', server.close.bind(server))
}
