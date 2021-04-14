function messageOnTeamJoin({ slackUid }) {
  const text = `:wave: Welcome <@${slackUid}> to *Eco Hackathon*! Please choose below :point_down: how are you planning to participate. Or even choose both!`;

  return {
    text,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text,
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
              text: ":bulb: I have an idea",
              emoji: true,
            },
            action_id: "IdeaAuthorModalOpen",
            value: "click_me_123",
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: ":alien: I'm looking for team",
              emoji: true,
            },
            action_id: "SoloParticipantModalOpen",
            value: "click_me_123",
          },
        ],
      },
    ],
  };
}

module.exports = messageOnTeamJoin;
