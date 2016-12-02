var req = require('request')

module.exports = function staticlandAPIClient (config) {
  var client = {}
  client.server = config.server || 'https://api.static.land'

  client.deploy = function (tarstream, headers, callback) {
    var opts = { url: client.server + '/sites', headers: headers, method: 'POST' }
    var stream = request(opts, function (err, res, body) {
      if (err) return callback(err)
      if (res.statusCode >= 400) return callback(body)
      callback(null, res, body)
    })
    tarstream.pipe(stream)
  }

  client.owner = function (opts, callback) {
    if (!opts.domain) return callback(new Error('domain option is required'))
    if (!opts.email) return callback(new Error('domain email is required'))
    var headers = { authorization: `Bearer ${opts.token}` }

    return request({
      method: 'POST',
      url: client.server + '/sites/' + opts.domain + '/owner',
      headers: headers,
      json: {
        token: opts.token,
        owner: opts.email,
        domain: opts.domain
      }
    }, callback)
  }

  function request (opts, callback) {
    return req(opts, function (err, res, body) {
      if (err) return callback(err)
      if (res.statusCode >= 400) return callback(body)
      return callback(null, res, body)
    })
  }

  return client
}
