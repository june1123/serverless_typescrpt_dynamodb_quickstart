import * as child_process from 'child_process';
const spawn = child_process.spawn;

process.env.NODE_ENV = 'test';
process.env.IS_OFFLINE = 'offline';
process.env.STAGE = 'dev';

import * as AWS from 'aws-sdk';
const dynamodb = new AWS.DynamoDB({
  region: "localhost",
  endpoint: "http://localhost:8000"
});

async function waitResolver(resolver?: Function, timeoutMs?: number) {
  let intervalId = null;
  const startTime = Date.now();
  return new Promise((resolve, reject) => {
    intervalId = setInterval(async () => {
      const timeout = (timeoutMs && (Date.now() - startTime) > timeoutMs);
      let loadingDone = false;
      if (!timeout && resolver) {
        loadingDone = await resolver();
      }
      if (loadingDone || timeout) {
        clearInterval(intervalId);
        resolve();
      }
    }, 1000);
  });
}

async function waitPrepareDatabse() {
  const resolver = async () => {
    const tables = await dynamodb.listTables().promise();
    return tables.TableNames.length > 0;
  };

  await waitResolver(resolver, 20000);
}

let dynamoStartProcess;
let mochaProcess;
function cleareProcesses(cause) {
  if (dynamoStartProcess) {
    process.kill(-dynamoStartProcess.pid);
  }
  if (mochaProcess) {
    mochaProcess.kill();
  }
}

function setCleanupHandlerToProcess(childProcess, events: string[] | string) {
  events = (typeof (events) === 'string') ? [events] : events;
  for (const event of events) {
    childProcess.on(event, () => process.exit());
  }
}

async function doTest() {
  process.on('SIGINT', () => cleareProcesses('sigint'));
  process.on('SIGTERM', () => cleareProcesses('sigterm'));
  process.on('exit', () => cleareProcesses('exit'));

  const spawnOptions = { detached: true, stdio: 'inherit' };
  const args = 'dynamodb start --migrate --inMemory'.split(' ');
  dynamoStartProcess = spawn('sls', args, spawnOptions);
  setCleanupHandlerToProcess(dynamoStartProcess, 'exit');
  await waitPrepareDatabse();

  const argsMocha = '--timeout 5000 -r ts-node/register -r tsconfig-paths/register ./test/**/*.ts'.split(' ');
  mochaProcess = spawn('mocha', argsMocha, { stdio: 'inherit' });
  setCleanupHandlerToProcess(mochaProcess, ['SIGTERM', 'SIGINT', 'exit']);
}

doTest();
