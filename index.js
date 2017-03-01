'use strict';

const mailin = require('mailin');
const WebClient = require('@slack/client').WebClient;
let email_suffixes;

const slack = new WebClient(process.env.SLACK_TOKEN);
const channel = `#${process.env.SLACK_CHANNEL}`;
if (process.env.EMAIL_SUFFIXES) {
  email_suffixes = process.env.EMAIL_SUFFIXES.split(/,\s*|\s+/)
}

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
  var approved = false;
  if (process.env.EMAIL_SUFFIXES) {
    if (email_suffixes.includes(msg.envelopeTo[0].address.split('@')[1])) {
      approved = true;
    } else {
      approved = false;
    }
  } else {
    approved = true;
  }

  if (approved) {
    slack.chat.postMessage(channel, '', postData, function(err, res) {
      if (err) {
          console.error('Error:', err);
      }
    });
  }

});
