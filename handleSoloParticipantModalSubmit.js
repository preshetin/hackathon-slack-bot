const soloParticipatsCreate = require("./solo-participants/create").main;
const sendMessageWithMatchingIdeas = require("./sendMessageWithMatchingIdeas");
const notifyIdeaAuthorsLookingForMatchedSkills = require("./notifyIdeaAuthorsLookingForMatchedSkills");
const sendMessageToMatchingChannel = require("./sendMessageToMatchingChannel");

async function handleSoloParticipantModalSubmit({ client, body, ack }) {
  await ack();
  try {
    const slackUid = body.user.id;

    const values = body.view.state.values;
    const skills = values.skills["static_select-action"].selected_options.map(
      (el) => el.value
    );
    const createData = {
      skills,
      experience: values.experience["plain_text_input-action"].value,
    };

    await soloParticipatsCreate(slackUid, createData);

    await sendMessageWithMatchingIdeas({ client, slackUid, skills });

    const newParticipant = { ...createData, slackUid };
    await notifyIdeaAuthorsLookingForMatchedSkills({
      client,
      newParticipant,
    });

    await sendMessageToMatchingChannel({
      client,
      type: "solo-participant",
      newParticipant,
    });
  } catch (error) {
    console.error("ERROR: ", error);
  }
}

module.exports = handleSoloParticipantModalSubmit;
