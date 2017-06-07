import * as Promise from 'bluebird';
import * as dynogels from 'dynogels-promisified';
import * as Joi from 'joi';
import * as _ from 'lodash';
import * as AWS from 'aws-sdk';
import * as logger from 'winston';

logger.level = 'warn';
// enabled WARN log level on all tables
dynogels.log = logger;

const dynamo_offline_options = {
  region: "localhost",
  endpoint: "http://localhost:8000"
};

function getTableName(name) {
  return process.env.STAGE + '-' + name;
}

if (process.env.IS_OFFLINE) {
  dynogels.AWS.config.update(dynamo_offline_options);
}

function define(name, schema) {
  const model = dynogels.define(getTableName(name), schema);
  return model;
}

const types = dynogels.types;
// merge types.
_.assign(types, Joi);

export { define, types };
