const scan = require("./db/scan").main;
const SKILLS = require("./utils").SKILLS;
const matchingParticipants = require("./utils").matchingParticipants;

async function sendMessageWithMatchingSoloParticipants({
  client,
  slackUid,
  skills,
}) {
  const participantsScan = await scan();

  const participants = participantsScan.Items.map((item) => ({
    ...item,
    role: item.sk.split("__")[0],
    slackUid: item.sk.split("__")[1],
  }));

  const matchingSoloParticipants = matchingParticipants({
    skills,
    participants,
    excludeSlackUid: slackUid,
    lookingFor: "solo-participant",
  });

  console.log("matchingSoloParticipants", matchingSoloParticipants);

  const text = buildText({ matchingSoloParticipants, skills });

  console.log("text to be sent", text);

  await client.chat.postMessage({
    token: process.env.SLACK_BOT_TOKEN,
    channel: slackUid,
    text,
  });
}

const buildText = ({ matchingSoloParticipants, skills }) => {
  let result = `Got it!`;
  if (matchingSoloParticipants.length === 0) {
    const skillsList = skills
      .map((skill) => SKILLS.find((s) => s.id === skill))
      .map((s) => "_" + s.title + "_")
      .join(", ");
    result += ` I'll let you know when someone with ${skillsList} skills joins :raised_hands:`;
    return result;
  }

  result +=
    " Check out solo participants that have skills required for your project:\n\n";

  for (let soloParticipant of matchingSoloParticipants) {
    const skillsList = soloParticipant.matchedSkills
      .map((skill) => SKILLS.find((s) => s.id === skill))
      .map((s) => "_" + s.title + "_")
      .join(", ");
    result += ` :alien: A folk with ${skillsList} skills is looking for a team. It's <@${soloParticipant.slackUid}>, more details: \`\`\`${soloParticipant.experience}\`\`\`\n\n`;
  }

  result +=
    "\nIf you feel like there's a right person for your team don't keep them waiting and send a message. Good luck! :four_leaf_clover:";
  return result;
};

module.exports = sendMessageWithMatchingSoloParticipants;
