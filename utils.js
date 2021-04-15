// Maximum number of options is 100.
// Source: https://api.slack.com/reference/block-kit/block-elements#multi_select
const SKILLS = [
  {
    title: "Programmer",
    id: "programmer",
  },
  {
    title: "Designer",
    id: "designer",
  },
  {
    title: "Marketing Specialist",
    id: "marketing-specialist",
  },
  {
    title: "React.js",
    id: "react-js",
  },
  {
    title: "Vue.js",
    id: "vue-js",
  },
  {
    title: "Backend Developer",
    id: "backend-developer",
  },
  {
    title: "Frontend Developer",
    id: "frontend-developer",
  },
  {
    title: "ML",
    id: "ml",
  },
  {
    title: "Data Scientist",
    id: "data-scientist",
  },
  // {
  //   title: '',
  //   id: '',
  // },
];

// lookingFor: 'idea-author' | 'solo-participant'
const matchingParticipants = ({
  skills,
  participants,
  excludeSlackUid,
  lookingFor,
}) => {
  return participants
    .map((participant) => ({
      ...participant,
      matchedSkills: skills.filter((v) => participant.skills.includes(v)),
    }))
    .filter(
      (participant) =>
        participant.matchedSkills.length > 0 &&
        participant.role === lookingFor &&
        excludeSlackUid !== participant.slackUid
    );
};

module.exports = {
  SKILLS,
  matchingParticipants,
};
