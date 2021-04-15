const scan = require("./db/scan").main;
const SKILLS = require("./utils").SKILLS;
const matchingParticipants = require("./utils").matchingParticipants;

async function notifyIdeaAuthorsLookingForMatchedSkills({
  client,
  newSoloParticipant,
}) {
  const participantsScan = await scan();

  const participants = participantsScan.Items.map((item) => ({
    ...item,
    role: item.sk.split("__")[0],
    slackUid: item.sk.split("__")[1],
  }));

  const matchingIdeaAuthorParticipants = matchingParticipants({
    skills: newSoloParticipant.skills,
    participants,
    lookingFor: "idea-author",
  });

  for (let matchingIdeaAuthor of matchingIdeaAuthorParticipants) {
    const text = buildText({ matchingIdeaAuthor, newSoloParticipant });
    console.log("text to be sent", text);

    await client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: matchingIdeaAuthor.slackUid,
      text,
    });
  }
}

const buildText = ({ matchingIdeaAuthor, newSoloParticipant }) => {
  const skillsList = matchingIdeaAuthor.matchedSkills
    .map((skill) => SKILLS.find((s) => s.id === skill))
    .map((s) => "_" + s.title + "_")
    .join(", ");

  let result = `Hey! Someone :alien: with ${skillsList} skills that you're looking for has just joined. Here's more details: \`\`\`${newSoloParticipant.experience}\`\`\`\n`;

  result += `That folk's username is <@${newSoloParticipant.slackUid}> so if you feel this is a good fit send him or her a message!`;

  return result;
};

module.exports = notifyIdeaAuthorsLookingForMatchedSkills;
