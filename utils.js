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
    title: "UI/UX",
    id: "ui-ux",
  },
  {
    title: "Marketing Specialist",
    id: "marketing-specialist",
  },
  {
    title: "Entepreneur",
    id: "entepreneur",
  },
  {
    title: "Product Owner",
    id: "product-owner",
  },
  {
    title: "Architector",
    id: "acthitector",
  },
  {
    title: "Other",
    id: "other",
  },
  {
    title: "Python",
    id: "python",
  },
  {
    title: "PHP",
    id: "php",
  },
  {
    title: "Presentation Skills",
    id: "presentation-skills",
  },
  {
    title: "React.js",
    id: "react-js",
  },
  {
    title: "Business Analyst",
    id: "business-analyst",
  },
  {
    title: "JavaScript",
    id: "javascript",
  },
  {
    title: "Node.js",
    id: "node-js",
  },
  {
    title: "Java",
    id: "java",
  },
  {
    title: "IOS Developer",
    id: "ios-developer",
  },
  {
    title: "Android Developer",
    id: "android-developer",
  },
  {
    title: "Mobile Developer",
    id: "mobile-developer",
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
    title: "Machine Learning",
    id: "machine-learning",
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

const getPostToMatchinChannelFromValues = (values) => {
  if (
    values &&
    values.notifications &&
    values.notifications.notificationCheckboxes &&
    values.notifications.notificationCheckboxes.selected_options &&
    values.notifications.notificationCheckboxes.selected_options.some(
      (el) => el.value === "postToMatchingChannel"
    )
  ) {
    return true;
  }
  return false;
};

const getNewMatchesFromValues = (values) => {
  if (
    values &&
    values.notifications &&
    values.notifications.notificationCheckboxes &&
    values.notifications.notificationCheckboxes.selected_options &&
    values.notifications.notificationCheckboxes.selected_options.some(
      (el) => el.value === "allowPostingNewMatches"
    )
  ) {
    return true;
  }
  return false;
};

module.exports = {
  SKILLS,
  matchingParticipants,
  getPostToMatchinChannelFromValues,
  getNewMatchesFromValues
};
