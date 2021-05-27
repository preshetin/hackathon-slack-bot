const axios = require('axios');

/*
 * This code gets data for online hackathons stats that is used in
 * Beee dashboard. Run it with `node stat.js` and then used the data in
 * the console output in tools like Google Spreadsheet for further analysis.
 */
(async () => {
  let result = [];
  for (let i = 1; i < 200; i++) {

    let url = `https://devpost.com/api/hackathons?challenge_type[]=online&order_by=deadline&page=${i}&status[]=ended`

    const res = await axios.get(url);
    let newHackathons = res.data.hackathons;
    console.log('i', i, newHackathons.length);
    result = result.concat(newHackathons);
    console.log('=======');
  }

  for (let obj of result) {
    const dateStrArr = obj.submission_period_dates.split(' ')
    const word = `${dateStrArr[0]} ${dateStrArr[dateStrArr.length - 1]}`
    console.log(word)
    // console.log(obj.submission_period_dates)
  }
  console.log(result.length)
})();

