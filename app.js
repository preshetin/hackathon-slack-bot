const { App, ExpressReceiver } = require("@slack/bolt");
const serverlessExpress = require("@vendia/serverless-express");
const handleSoloParticipantModalSubmit = require("./handleSoloParticipantModalSubmit");
const messageOnTeamJoin = require("./messageOnTeamJoin");
const soloParticipantModal = require("./soloParticipantModal");

// Initialize your custom receiver
const expressReceiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  // The `processBeforeResponse` option is required for all FaaS environments.
  // It allows Bolt methods (e.g. `app.message`) to handle a Slack request
  // before the Bolt framework responds to the request (e.g. `ack()`). This is
  // important because FaaS immediately terminate handlers after the response.
  processBeforeResponse: true,
});

// Initializes your app with your bot token and the AWS Lambda ready receiver
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: expressReceiver,
});

// Listens to incoming messages that contain "hello"
app.message("hello", async ({ client, body }) => {
  console.log("body", body);
  const slackUid = body.event.user;
  try {
    await client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: slackUid,
      ...messageOnTeamJoin({ slackUid }),
    });
  } catch (err) {
    console.log(`ERROR: `, err);
  }
});

app.view(
  "solo-participant-modal-submit",
  async ({ client, payload, body, ack }) => {
    await handleSoloParticipantModalSubmit({ client, payload, body, ack });
  }
);

app.action(
  "solo-participant-modal-open",
  async ({ client, body, ack, say }) => {
    // await say(`<@${body.user.id}> clicked the button`);
    await ack();
    try {
      const result = await client.views.open({
        trigger_id: body.trigger_id,
        view: soloParticipantModal(),
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
);

// Listens to incoming messages that contain "goodbye"
app.message("goodbye", async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say(`See ya later, <@${message.user}> :wave:`);
});

// Handle the Lambda function event
module.exports.handler = serverlessExpress({
  app: expressReceiver.app,
});
