#! /usr/bin/env node

var subcommand = require('subcommand')
var Township = require('township-client')
var client = Township({
  server: 'https://api.static.land' // set default server here
})
var config = client.config

var match = subcommand({
  root: require('./commands/root'),
  defaults: require('./commands/defaults')(config.read()),
  none: require('./commands/deploy-shorthand'),
  commands: [
    require('./commands/help'),  // done
    require('./commands/config')(client), // done
    require('./commands/deploy')(client), // done
    require('./commands/domain'), // done
    require('./commands/login')(client), // done
    require('./commands/logout')(client), // done
    require('./commands/owner')(client), // done
    require('./commands/register')(client), // done
    require('./commands/server')(client), // done
    require('./commands/whoami')(client) // done
  ]
})

match(process.argv.slice(2))
