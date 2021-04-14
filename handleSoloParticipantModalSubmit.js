async function handleSoloParticipantModalSubmit({
  client,
  payload,
  body,
  ack,
}) {
  await ack();
  try {
    console.log("handling modal submit....");
    console.log("body", body, body.view.state.values);
    // console.log('payload', payload, '---', JSON.stringify(payload), '----', payload.blocks)

    // It works!
    await client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: body.user.id,
      text: `Got it! Thanks <@${body.user.id}>! :raised_hands:`,
      blocks: [],
    });

    // post to some public channel

    // save to participants table

    // if we have idea owners that need solo participant's skill, then send them a message proposing to contact participant

    // say() participant with ideas that look for his or her skills
  } catch (error) {
    console.error(error);
  }
}

module.exports = handleSoloParticipantModalSubmit;
