var SlackWebhook = require('slack-webhook')
var slack = new SlackWebhook(
  'https://hooks.slack.com/services/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',
  {
    defaults: {
      username: 'BotTest',
      channel: '#sped_squad_log',
      icon_emoji: ':robot_face:'
    }
  }
)
slack
  .send('olar')
  .then(function(res) {
    console.log('oksdk')
  })
  .catch(function(err) {
    // handle request error
  })
