const Mocha = require('mocha')
const fs = require('fs')
const Reporter = require('node-mocha-reporter')
const SlackWebhook = require('slack-webhook')
const path = require('path')
let mocha = null
const run = ({ dir, isDevelopment = false, timeout = 6000, urlSlack }, callback) => {
  if (!fs.existsSync(dir)) return callback(new Error('Diretório de testes não existe.'))

  if (!isDevelopment) {
    mocha = new Mocha({ reporter: Reporter })
  } else {
    mocha = new Mocha({})
  }

  const files = fs.readdirSync(dir)
  for (const file of files) {
    console.log(file)
    mocha.addFile(path.join(dir, file))
  }

  mocha.run(report => {
    if (!isDevelopment) {
      const slack = new SlackWebhook(urlSlack, {
        defaults: {
          username: 'BotTest',
          channel: '#sped_squad_log',
          icon_emoji: ':robot_face:'
        }
      })
      slack.send(JSON.stringify(report, null, 1)).then(a => console.log('aff'))
    }
  })
}

run({
  dir: path.join(process.cwd(), 'tests'),
  urlSlack: ''
})
module.exports = {
  run
}
