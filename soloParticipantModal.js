const SKILLS = require("./utils").SKILLS;

function soloParticipantModal() {
  return {
    callback_id: "SoloParticipantModalSubmit",
    title: {
      type: "plain_text",
      text: "Solo Participant",
    },
    submit: {
      type: "plain_text",
      text: "Register",
    },
    type: "modal",
    close: {
      type: "plain_text",
      text: "Cancel",
    },
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "Register as solo participant to receive ideas matching your skills",
        },
      },
      {
        type: "divider",
      },
      {
        type: "input",
        block_id: "experience",
        element: {
          type: "plain_text_input",
          multiline: true,
          action_id: "plain_text_input-action",
          placeholder: {
            type: "plain_text",
            text:
              "Be specific about skills you have, share what you've done and what you're looking for",
          },
        },
        label: {
          type: "plain_text",
          text: "Your experience and expertise",
        },
      },
      {
        type: "input",
        block_id: "skills",
        element: {
          type: "multi_static_select",
          placeholder: {
            type: "plain_text",
            text: "Choose your skills",
          },
          options: SKILLS.map((skill) => ({
            text: {
              type: "plain_text",
              text: skill.title,
            },
            value: skill.id,
          })),
          action_id: "static_select-action",
        },
        label: {
          type: "plain_text",
          text: "Your skills",
        },
      },
      {
        type: "context",
        elements: [
          {
            type: "plain_text",
            text: "We'll be posting you idea proposals matching your skills",
          },
        ],
      },
      {
        type: "input",
        block_id: "phoneOrTelegramUsername",
        element: {
          type: "plain_text_input",
          action_id: "plain_text_input-action",
        },
        label: {
          type: "plain_text",
          text: "Phone or Telegram",
        },
      },
    ],
  };
}

module.exports = soloParticipantModal;
