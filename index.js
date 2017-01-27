'use strict';

const mailin = require('mailin');
const WebClient = require('@slack/client').WebClient;

const slack = new WebClient(process.env.SLACK_TOKEN);
const channel = `#${process.env.CHANNEL}`;

mailin.start({
  port: 25,
  disableWebhook: true
});

mailin.on('authorizeUser', () => {
  done(new Error('Unauthorized'), false)
});

mailin.on('message', (conn, msg) => {
  console.dir(msg, { depth: null });

  const postData = {
    username: 'Mailbot',
    icon_emoji: ':email:',
    attachments: [{
      title: `Subject: ${msg.subject}`,
      fallback: msg.subject,
      author_name: `To: ${msg.envelopeTo[0].address}`,
      text: msg.text,
      footer: `From: ${msg.from[0].address}`
    }]
  };

  slack.chat.postMessage(channel, '', postData, function(err, res) {
    if (err) {
        console.error('Error:', err);
    }
  });

});
