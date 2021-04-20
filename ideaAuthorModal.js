const SKILLS = require("./utils").SKILLS;

function ideaAuthorModal() {
  return {
    callback_id: "IdeaAuthorModalSubmit",
    title: {
      type: "plain_text",
      text: "Idea Registration",
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
            "Register your idea so that you can receive matching candidates matching skills you are looking for",
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
          text: "Idea / team name",
        },
      },

      {
        type: "input",
        block_id: "ideaDescription",
        element: {
          type: "plain_text_input",
          multiline: true,
          action_id: "plain_text_input-action",
          placeholder: {
            type: "plain_text",
            text: "What problem are you solving?",
          },
        },
        label: {
          type: "plain_text",
          text: "Describe your idea",
        },
      },

      {
        type: "input",
        block_id: "skills",
        element: {
          type: "multi_static_select",
          placeholder: {
            type: "plain_text",
            text: "Developer, designer, javascript, etc.",
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
          text: "Skills you are looking for",
        },
      },
      {
        type: "context",
        elements: [
          {
            type: "plain_text",
            text:
              "We'll we posting you solo participants profiles with matching skills",
          },
        ],
      },
      {
        type: "divider",
      },
      {
        type: "section",
        block_id: "notifications",
        text: {
          type: "mrkdwn",
          text: "Configure notifications:",
        },
        accessory: {
          type: "checkboxes",
          initial_options: notificationCheckboxes(),
          options: notificationCheckboxes(),
          action_id: "notificationCheckboxes",
        },
      },
    ],
  };
}

const notificationCheckboxes = () => {
  return [
    {
      text: {
        type: "mrkdwn",
        text: "Post announcement about my idea to *#matching* channel",
      },
      value: "postToMatchingChannel",
    },
    {
      text: {
        type: "mrkdwn",
        text: "Notify me about new solo participants with skills I'm looking",
      },
      value: "allowPostingNewMatches",
    },
  ];
};

module.exports = ideaAuthorModal;
