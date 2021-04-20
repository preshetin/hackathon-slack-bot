const Mixpanel = require("mixpanel");

const token = process.env.MIXPANEL_PROJECT_TOKEN
  ? process.env.MIXPANEL_PROJECT_TOKEN
  : "fake_token";

mixpanel = Mixpanel.init(token);

module.exports = mixpanel;
