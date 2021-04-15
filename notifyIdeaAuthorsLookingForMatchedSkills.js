const scan = require("./db/scan").main;
const SKILLS = require("./utils").SKILLS;
const matchingParticipants = require("./utils").matchingParticipants;

async function notifyIdeaAuthorsLookingForMatchedSkills({
  client,
  newParticipant,
}) {
  const participantsScan = await scan();

  const participants = participantsScan.Items.map((item) => ({
    ...item,
    role: item.sk.split("__")[0],
    slackUid: item.sk.split("__")[1],
  }));

  const participantsToBeNotified = matchingParticipants({
    skills: newParticipant.skills,
    excludeSlackUid: newParticipant.slackUid,
    participants,
    lookingFor: "idea-author",
  });

  for (let participantToBeNotified of participantsToBeNotified) {
    const text = buildText({ participantToBeNotified, newParticipant });
    console.log("text to be sent", text);

    await client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: participantToBeNotified.slackUid,
      text,
    });
  }
}

const buildText = ({ participantToBeNotified, newParticipant }) => {
  const skillsList = participantToBeNotified.matchedSkills
    .map((skill) => SKILLS.find((s) => s.id === skill))
    .map((s) => "_" + s.title + "_")
    .join(", ");

  let result = `Hey! Someone :alien: with ${skillsList} skills that you're looking for has just joined. Here's more details: \`\`\`${newParticipant.experience}\`\`\`\n`;

  result += `That folk's username is <@${newParticipant.slackUid}> so if you feel this is a good fit send him or her a message!`;

  return result;
};

module.exports = notifyIdeaAuthorsLookingForMatchedSkills;
