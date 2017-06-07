# serverless_typescrpt_dynamodb_quickstart

# setup

1. Install serverless.

```
npm install -g serverless
```

2. Setup AWS credential

Please check and create/update aws credential profile to you want use. 

Here is command for create/update your aws credential of [devProfile].
```
aws configure --profile devProfile
```
OR 

You can modify credential profile in 'serverles.yml'.

```
provider:
  name: aws
  runtime: nodejs6.10
  profile: write-your-profile
  region: ap-northeast-2
```


3. Install packages.
```
npm install
```

4. Create tables in local dynamodb.
```
npm run migrate-db
```

# run on local
```
npm run dev
```

# run tests
Test runs with below environment variables.

```
env.NODE_ENV=test
env.IS_OFFLINE=offline
env.STAGE=dev
```
To run test, use following command.
```
npm test
```

# deploy
```
npm run deploy
```
