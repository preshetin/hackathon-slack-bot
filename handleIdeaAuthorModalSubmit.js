const ideaAuthorsCreate = require("./idea-authors/create").main;
const sendMessageWithMatchingSoloParticipants = require("./sendMessageWithMatchingSoloParticipants");
const notifySoloParticipantsLookingForMatchedSkills = require("./notifySoloParticipantsLookingForMatchedSkills");
const sendMessageToMatchingChannel = require("./sendMessageToMatchingChannel");

async function handleIdeaAuthorModalSubmit({ client, body, ack }) {
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
      teamName: values.teamName["plain_text_input-action"].value,
      ideaDescription: values.ideaDescription["plain_text_input-action"].value,
    };

    const res = await ideaAuthorsCreate(slackUid, createData);
    console.log("response for ideaAuthorsCreate", res);

    await sendMessageWithMatchingSoloParticipants({ client, slackUid, skills });

    const newParticipant = { ...createData, slackUid };
    await notifySoloParticipantsLookingForMatchedSkills({
      client,
      newParticipant,
    });

    await sendMessageToMatchingChannel({
      client,
      type: "idea-author",
      newParticipant,
    });
  } catch (error) {
    console.error("ERROR:", error);
  }
}

module.exports = handleIdeaAuthorModalSubmit;
