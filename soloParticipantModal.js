function soloParticipantModal() {
  return {
    callback_id: "solo-participant-modal-submit",
    title: {
      type: "plain_text",
      text: "Анкета соло-участника",
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
        element: {
          type: "multi_static_select",
          placeholder: {
            type: "plain_text",
            text: "Выберите ваушу роль",
            emoji: true,
          },
          options: [
            {
              text: {
                type: "plain_text",
                text: "программист",
                emoji: true,
              },
              value: "value-0",
            },
            {
              text: {
                type: "plain_text",
                text: "дизайнер",
                emoji: true,
              },
              value: "value-1",
            },
            {
              text: {
                type: "plain_text",
                text: "маркетолог",
                emoji: true,
              },
              value: "value-2",
            },
          ],
          action_id: "static_select-action",
        },
        label: {
          type: "plain_text",
          text: "Роль на хакатоне",
          emoji: true,
        },
      },
      {
        type: "input",
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
