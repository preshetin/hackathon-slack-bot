const { App, ExpressReceiver } = require("@slack/bolt");
const serverlessExpress = require("@vendia/serverless-express");
const handleIdeaAuthorModalSubmit = require("./handleIdeaAuthorModalSubmit");
const handleSoloParticipantModalSubmit = require("./handleSoloParticipantModalSubmit");
const ideaAuthorModal = require("./ideaAuthorModal");
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

app.event('team_join', async ({ event, client }) => {
  try {
    const slackUid = event.user;
    await client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: slackUid,
      ...messageOnTeamJoin({ slackUid }),
    });
  }
  catch (error) {
    console.error(error);
  }
});

app.command('/register', async ({ client, command, ack, body }) => {
  await ack();
  try {
    const slackUid = body.user_id;
    await client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: slackUid,
      ...messageOnTeamJoin({ slackUid }),
    });
  }
  catch (error) {
    console.error(error);
  }
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

app.action("SoloParticipantModalOpen", async ({ client, body, ack }) => {
  await ack();
  try {
    await client.views.open({
      trigger_id: body.trigger_id,
      view: soloParticipantModal(),
    });
  } catch (error) {
    console.error(error);
  }
});

app.view(
  "SoloParticipantModalSubmit",
  async ({ client, payload, body, ack }) => {
    await handleSoloParticipantModalSubmit({ client, payload, body, ack });
  }
);

app.action("IdeaAuthorModalOpen", async ({ client, body, ack }) => {
  await ack();
  try {
    await client.views.open({
      trigger_id: body.trigger_id,
      view: ideaAuthorModal(),
    });
  } catch (error) {
    console.error(error);
  }
});

app.view("IdeaAuthorModalSubmit", async ({ client, payload, body, ack }) => {
  await handleIdeaAuthorModalSubmit({ client, payload, body, ack });
});

// Handle the Lambda function event
module.exports.handler = serverlessExpress({
  app: expressReceiver.app,
});
