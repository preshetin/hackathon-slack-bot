const scan = require("./db/scan").main;
const SKILLS = require("./utils").SKILLS;
const matchingParticipants = require("./utils").matchingParticipants;

async function sendMessageWithMatchingIdeas({ client, slackUid, skills }) {
  const participantsScan = await scan();

  console.log("participantsScan", participantsScan);

  const participants = participantsScan.Items.map((item) => ({
    ...item,
    role: item.sk.split("__")[0],
    slackUid: item.sk.split("__")[1],
  }));

  console.log("scan result", participants, JSON.stringify(participants));

  const matchingIdeaAuthorParticipants = matchingParticipants({
    skills,
    participants,
    excludeSlackUid: slackUid,
    lookingFor: "idea-author",
  });

  console.log("matchingIdeaAuthorParticipants", matchingIdeaAuthorParticipants);

  const text = buildText({ matchingIdeaAuthorParticipants, skills });

  console.log("text to be sent", text);

  await client.chat.postMessage({
    token: process.env.SLACK_BOT_TOKEN,
    channel: slackUid,
    text,
  });
}

const buildText = ({ matchingIdeaAuthorParticipants, skills }) => {
  let result = `Got it!`;

  if (matchingIdeaAuthorParticipants.length === 0) {
    const skillsList = skills
      .map((skill) => SKILLS.find((s) => s.id === skill))
      .map((s) => "_" + s.title + "_")
      .join(", ");
    result += ` I'll let you know when someone would post a project where your ${skillsList} skills would be useful :raised_hands:`;
    return result;
  }

  result += " Check out projects matching your skills:\n\n";

  for (let author of matchingIdeaAuthorParticipants) {
    const skillsList = author.matchedSkills
      .map((skill) => SKILLS.find((s) => s.id === skill))
      .map((s) => "_" + s.title + "_")
      .join(", ");

    result += ` :bulb: *${author.teamName}* project created by <@${author.slackUid}> is looking for folks with ${skillsList} skills. Here's more on that: \`\`\`${author.ideaDescription}\`\`\`\n\n`;
  }

  result +=
    "\nIf you like the idea feel free to contact idea authours! Good luck! :four_leaf_clover:";

  return result;
};

module.exports = sendMessageWithMatchingIdeas;
