function messageOnTeamJoin(message) {
  return {
    text: `:wave: Welcome <@${message.user}> to Hachaton! Please choose how are you planning to participate`,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            ":wave: Welcome to Hachaton! Please choose how are you planning to participate",
        },
      },
      {
        type: "divider",
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Idea author",
              emoji: true,
            },
            action_id: "idead-author-modal-open",
            value: "click_me_123",
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Solo-participant",
              emoji: true,
            },
            action_id: "solo-participant-modal-open",
            value: "click_me_123",
          },
        ],
      },
    ],
  };
}

module.exports = messageOnTeamJoin;
