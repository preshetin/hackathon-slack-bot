const scan = require("./db/scan").main;
const SKILLS = require("./utils").SKILLS;

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
    lookingFor: "idea-author",
  });

  console.log("matchingIdeaAuthorParticipants", matchingIdeaAuthorParticipants);

  const text = buildText({ matchingIdeaAuthorParticipants });

  console.log("text to be sent", text);

  await client.chat.postMessage({
    token: process.env.SLACK_BOT_TOKEN,
    channel: slackUid,
    text,
  });
}

// lookingFor: 'idea-author' | 'solo-participant'
const matchingParticipants = ({ skills, participants, lookingFor }) => {
  return participants
    .map((participant) => ({
      ...participant,
      matchedSkills: skills.filter((v) => participant.skills.includes(v)),
    }))
    .filter(
      (participant) =>
        participant.matchedSkills.length > 0 && participant.role === lookingFor
    );
};

const buildText = ({ matchingIdeaAuthorParticipants }) => {
  let result = `Got it! You are now registered as solo participant.`;

  if (matchingIdeaAuthorParticipants.length === 0) return result;

  result += " Check out ideas matching your skills:\n";

  for (let author of matchingIdeaAuthorParticipants) {
    const skillsList = author.matchedSkills
      .map((skill) => SKILLS.find((s) => s.id === skill))
      .map((s) => "_" + s.title + "_")
      .join(", ");

    result += ` ● At *${author.teamName}*, <@${author.slackUid}> is looking for folks with ${skillsList} skills. Here's more on that: \`\`\`${author.ideaDescription}\`\`\`\n`;
    result += ` ● At *${author.teamName}*, <@${author.slackUid}> is looking for folks with ${skillsList} skills. Here's more on that: \`\`\`${author.ideaDescription}\`\`\`\n`;
  }

  result +=
    "\nIf you like the idea feel free to contact idea authours! Good luck! :four_leaf_clover:";

  return result;
};

module.exports = sendMessageWithMatchingIdeas;
