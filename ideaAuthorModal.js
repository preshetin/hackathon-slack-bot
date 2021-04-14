const SKILLS = require("./utils").SKILLS;

function ideaAuthorModal() {
  return {
    callback_id: "IdeaAuthorModalSubmit",
    title: {
      type: "plain_text",
      text: "Idea Registration",
      emoji: true,
    },
    submit: {
      type: "plain_text",
      text: "Submit",
      emoji: true,
    },
    type: "modal",
    close: {
      type: "plain_text",
      text: "Cancel",
      emoji: true,
    },
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "Если у вас есть идея и команда или есть идея но нет команды, то зарегистрируйте на хакатон себя, (свою команду) и идею для участия.",
        },
      },
      {
        type: "divider",
      },

      {
        type: "input",
        block_id: "teamName",
        element: {
          type: "plain_text_input",
          action_id: "plain_text_input-action",
        },
        label: {
          type: "plain_text",
          text: "Название команды",
          emoji: true,
        },
      },

      {
        type: "input",
        block_id: "ideaDescription",
        element: {
          type: "plain_text_input",
          multiline: true,
          action_id: "plain_text_input-action",
        },
        label: {
          type: "plain_text",
          text: "Describe your idea",
          emoji: true,
        },
      },

      {
        type: "input",
        block_id: "skills",
        element: {
          type: "multi_static_select",
          placeholder: {
            type: "plain_text",
            text: "Select skills you are looking for",
            emoji: true,
          },
          options: SKILLS.map((skill) => ({
            text: {
              type: "plain_text",
              text: skill.title,
              emoji: true,
            },
            value: skill.id,
          })),
          action_id: "static_select-action",
        },
        label: {
          type: "plain_text",
          text: "Skills you are looking for",
          emoji: true,
        },
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
          text: "Phone or Telegram Username",
          emoji: true,
        },
      },
    ],
  };
}

module.exports = ideaAuthorModal;
