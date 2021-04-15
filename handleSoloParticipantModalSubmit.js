const soloParticipatsCreate = require("./solo-participants/create").main;
const sendMessageWithMatchingIdeas = require("./sendMessageWithMatchingIdeas");
const notifyIdeaAuthorsLookingForMatchedSkills = require('./notifyIdeaAuthorsLookingForMatchedSkills')

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
      phoneOrTelegramUsername:
        values.phoneOrTelegramUsername["plain_text_input-action"].value,
    };

    await soloParticipatsCreate(slackUid, createData);

    await sendMessageWithMatchingIdeas({ client, slackUid, skills });

    const newSoloParticipant = { ...createData, slackUid }
    await notifyIdeaAuthorsLookingForMatchedSkills({client, newSoloParticipant });

    // TODO: Post to some public channel that a new solo participant joined
  } catch (error) {
    console.error(error);
  }
}

module.exports = handleSoloParticipantModalSubmit;
