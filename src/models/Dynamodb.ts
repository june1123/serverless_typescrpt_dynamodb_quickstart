import * as Promise from 'bluebird';
import * as AWS from 'aws-sdk';

const dynamo_offline_options = {
  region: "localhost",
  endpoint: "http://localhost:8000"
};

function createDocClient() {
  if (process.env.IS_OFFLINE) {
    return new AWS.DynamoDB.DocumentClient(dynamo_offline_options);
  } else {
    return new AWS.DynamoDB.DocumentClient();
  }
}

const documentClient = createDocClient();
function getTableName(name) {
  return process.env.STAGE + '-' + name;
}
export { documentClient, getTableName };
