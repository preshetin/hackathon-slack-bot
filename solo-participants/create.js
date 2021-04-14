const dynamoDbLib = require("../libs/dynamodb-lib");

const { success, failure } = require("../libs/response-lib");

async function main(sk, data = {}) {
  const params = {
    TableName: process.env.participantsTableName,
    Item: {
      ...data,
      userId: "someUserId",
      sk: "solo-participant__" + sk,
      createdAt: Date.now(),
    },
  };

  try {
    await dynamoDbLib.call("put", params);
    const item = {
      ...params.Item,
    };
    return success(item);
  } catch (e) {
    console.log("error", e);
    return failure({ status: false });
  }
}

module.exports = {
  main,
};
