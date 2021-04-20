const ideaAuthorsCreate = require("./idea-authors/create").main;
const sendMessageWithMatchingSoloParticipants = require("./sendMessageWithMatchingSoloParticipants");
const notifySoloParticipantsLookingForMatchedSkills = require("./notifySoloParticipantsLookingForMatchedSkills");
const sendMessageToMatchingChannel = require("./sendMessageToMatchingChannel");

async function handleIdeaAuthorModalSubmit({ client, body, ack }) {
  await ack();
  try {
    const slackUid = body.user.id;

    const values = body.view.state.values;
    const skills = values.skills["static_select-action"].selected_options.map(
      (el) => el.value
    );
    const createData = {
      skills,
      teamName: values.teamName["plain_text_input-action"].value,
      ideaDescription: values.ideaDescription["plain_text_input-action"].value,
      postToMatchingChannel: getPostToMatchinChannelFromValues(values),
      allowPostingNewMatches: getNewMatchesFromValues(values),
    };

    const res = await ideaAuthorsCreate(slackUid, createData);

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

const getPostToMatchinChannelFromValues = (values) => {
  if (
    values &&
    values.notifications &&
    values.notifications.notificationCheckboxes &&
    values.notifications.notificationCheckboxes.selected_options &&
    values.notifications.notificationCheckboxes.selected_options.some(
      (el) => el.value === "postToMatchingChannel"
    )
  ) {
    return true;
  }
  return false;
};

const getNewMatchesFromValues = (values) => {
  if (
    values &&
    values.notifications &&
    values.notifications.notificationCheckboxes &&
    values.notifications.notificationCheckboxes.selected_options &&
    values.notifications.notificationCheckboxes.selected_options.some(
      (el) => el.value === "allowPostingNewMatches"
    )
  ) {
    return true;
  }
  return false;
};

module.exports = handleIdeaAuthorModalSubmit;
