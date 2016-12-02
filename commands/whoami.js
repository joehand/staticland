
module.exports = function (client) {
  var config = client.config
  return {
    name: 'whoami',
    command: function whoami (args) {
      var login = config.get('currentLogin')
      console.log('Email:', login.email)
      console.log('Server:', login.server)
    }
  }
}
