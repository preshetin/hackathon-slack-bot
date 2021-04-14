const participatsCreate = require("./participants/create").main;

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

    const slackUid = body.user.id;

    const values = body.view.state.values;
    const skills = values.skills["static_select-action"].selected_options.map(
      (el) => el.value
    );
    const createData = {
      skills,
      description: values.description["plain_text_input-action"].value,
      contacts: values.contacts["plain_text_input-action"].value,
    };

    // console.log('createData', createData)
    // console.log('selected options', createData.skills)
    // console.log('payload', payload, '---', JSON.stringify(payload), '----', payload.blocks)

    // It works!
    await client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: body.user.id,
      text: `Got it! Thanks <@${body.user.id}>! :raised_hands:`,
      blocks: [],
    });

    // TODO: Post to some public channel that a new solo participant joined

    // save to participants table
    const res = await participatsCreate(slackUid, createData);
    console.log("response for participant create", res);

    // TODO: if we have idea owners that need solo participant's skill, then send them a message proposing to contact participant

    // TODO: say() participant with ideas that look for his or her skills
  } catch (error) {
    console.error(error);
  }
}

module.exports = handleSoloParticipantModalSubmit;
