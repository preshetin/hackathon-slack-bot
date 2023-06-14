# Slack bot for hackathons

![slack-app-hackathon-bot](https://user-images.githubusercontent.com/4620130/223089785-34598149-a9c5-45bc-99ab-8bf64ec54893.gif)


# How to install an this Slack app

1. Deploy this app with any ENV vars by running command like `sls deploy --stage prod-hackathon-id -v`
2. Create and app, copy app manifest, then instert Slack URL.
3. Add logo.
4. Install the app.
5. Decide which channel are you planning to use as #matching channel. Copy that channel ID.
6. Now you have all Env vars for Deploy script. Fill them and re-deploy the app.

Built with [Bolt.js](https://github.com/slackapi/bolt-js-getting-started-app).
