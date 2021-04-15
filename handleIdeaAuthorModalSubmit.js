const ideaAuthorsCreate = require("./idea-authors/create").main;

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
      phoneOrTelegramUsername:
        values.phoneOrTelegramUsername["plain_text_input-action"].value,
    };

    const res = await ideaAuthorsCreate(slackUid, createData);
    console.log("response for ideaAuthorsCreate", res);

    // TODO: Post to some public channel that a new solo participant joined

    // TODO: if we have idea owners that need solo participant's skill, then send them a message proposing to contact participant
  } catch (error) {
    console.error("ERROR:", error);
  }
}

module.exports = handleIdeaAuthorModalSubmit;
