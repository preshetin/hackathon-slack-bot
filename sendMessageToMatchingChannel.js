const SKILLS = require("./utils").SKILLS;

async function sendMessageToMatchingChannel({ client, type, newParticipant }) {
  const matchingChannelId = process.env.MATCHING_CHANNEL_ID;

  let text = "hey";
  switch (type) {
    case "solo-participant":
      text = buildNewSoloText({ newParticipant });
      break;
    case "idea-author":
      text = buildNewIdeaText({ newParticipant });
      break;
    default:
      throw "Unknown participant type";
  }

  await client.chat.postMessage({
    channel: matchingChannelId,
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
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text:
              "If you want your idea or solo participant info posted like this then type `/register` message, this would run that command.",
          },
        ],
      },
    ],
  });
}

const buildNewSoloText = ({ newParticipant }) => {
  const skillsList = newParticipant.skills
    .map((skill) => SKILLS.find((s) => s.id === skill))
    .map((s) => "`" + s.title + "`")
    .join(", ");
  let result = `Hey, idea authors! New solo participant :alien: <@${newParticipant.slackUid}> is looking for a team / idea. That folk's got following skills: ${skillsList}. Here's more details: \`\`\`${newParticipant.experience}\`\`\`\n`;
  result += `In case you're interested feel free to reach out to <@${newParticipant.slackUid}>`;
  return result;
};

const buildNewIdeaText = ({ newParticipant }) => {
  const skillsList = newParticipant.skills
    .map((skill) => SKILLS.find((s) => s.id === skill))
    .map((s) => "`" + s.title + "`")
    .join(", ");
  let result = `Hey, solo participants! New idea :bulb: named *${newParticipant.teamName}* was just posted by <@${newParticipant.slackUid}>. To make this idea come true, the author is looking for the following skills: ${skillsList}. Here's more details: \`\`\`${newParticipant.ideaDescription}\`\`\`\n`;
  result += `In case you're interested feel free to reach out to <@${newParticipant.slackUid}>`;
  return result;
};

module.exports = sendMessageToMatchingChannel;
