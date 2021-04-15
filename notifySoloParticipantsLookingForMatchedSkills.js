const scan = require("./db/scan").main;
const SKILLS = require("./utils").SKILLS;
const matchingParticipants = require("./utils").matchingParticipants;

// TODO: This function is almost identical to notifyIdeaAuthorsLookingForMatchedSkills so it may be a good idea to unite them.
async function notifySoloParticipantsLookingForMatchedSkills({
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
    lookingFor: "solo-participant",
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

  let result = `Hey! :bulb: Idea named *${newParticipant.teamName}* was just posted with ${skillsList} skills that you have. Here's more details: \`\`\`${newParticipant.ideaDescription}\`\`\`\n`;

  result += `This idea was introduced by <@${newParticipant.slackUid}> so if you may contact to discuss it in more details.`;

  return result;
};

module.exports = notifySoloParticipantsLookingForMatchedSkills;
