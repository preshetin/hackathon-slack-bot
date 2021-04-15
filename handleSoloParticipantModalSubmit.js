const soloParticipatsCreate = require("./solo-participants/create").main;
const sendMessageWithMatchingIdeas = require("./sendMessageWithMatchingIdeas");

async function handleSoloParticipantModalSubmit({ client, body, ack }) {
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
      experience: values.experience["plain_text_input-action"].value,
      phoneOrTelegramUsername:
        values.phoneOrTelegramUsername["plain_text_input-action"].value,
    };

    const res = await soloParticipatsCreate(slackUid, createData);
    console.log("response for soloParticipatsCreate create", res);

    await sendMessageWithMatchingIdeas({ client, slackUid, skills });

    // TODO: Post to some public channel that a new solo participant joined

    // TODO: if we have idea owners that need solo participant's skill, then send them a message proposing to contact participant

    // TODO: say() participant with ideas that look for his or her skills
  } catch (error) {
    console.error(error);
  }
}

module.exports = handleSoloParticipantModalSubmit;
