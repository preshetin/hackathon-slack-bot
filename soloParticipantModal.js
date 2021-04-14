const SKILLS = require("./utils").SKILLS;

function soloParticipantModal() {
  return {
    callback_id: "solo-participant-modal-submit",
    title: {
      type: "plain_text",
      text: "Solo Participant",
      emoji: true,
    },
    submit: {
      type: "plain_text",
      text: "Отправить",
      emoji: true,
    },
    type: "modal",
    close: {
      type: "plain_text",
      text: "Отмена",
      emoji: true,
    },
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "Если у вас нет идеи и команды, то зарегистрируйтесь на хакатон как соло-участник, мы поможем вам найти команду.",
        },
      },
      {
        type: "divider",
      },
      {
        type: "input",
        block_id: "description",
        element: {
          type: "plain_text_input",
          multiline: true,
          action_id: "plain_text_input-action",
        },
        label: {
          type: "plain_text",
          text: "Какая у вас экспертиза и опыт",
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
            text: "Choose your skills",
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
          text: "Your skills",
          emoji: true,
        },
      },
      {
        type: "input",
        block_id: "contacts",
        element: {
          type: "plain_text_input",
          action_id: "plain_text_input-action",
        },
        label: {
          type: "plain_text",
          text: "Телефон / телеграм",
          emoji: true,
        },
      },
    ],
  };
}

module.exports = soloParticipantModal;
