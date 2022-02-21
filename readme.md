# Pex-stream

Write pyth quotes to kinesis stream

The project is structured as follows:

* kda-sql - Jupyter notebook that creates and manages a KDA-SQL application
* output-lambda - Writes the output of the KDA-SQL to cloudwatch logs. This lambda is referenced in the kda-sql notebook asthe lambda bound to the SQL Stream output
* stream - reads Pyth quotes and writes symbols with available pricing data to a kinesis stream




2022-02-21T10:54:58.567-08:00	2022-02-21T18:54:58.567Z a8b25e72-e6b3-4686-9f03-527b2a2e7c71 INFO {"symbol":"Crypto.BNB/USD","price":

## Set up

### Kinesis

aws kinesis create-stream --stream-name pyth --shard-count 1

### Quote stream

In the stream directory, build it using

* npm i
* npx tsc


Run it via `node dist/pex.js`

### Output Lambda 

Deploy the output function. Note you must do this before executing the Jupyter notebook.

*  sls deploy --region us-west-2

Sample log output:

```
2022-02-21T10:54:58.567-08:00	2022-02-21T18:54:58.567Z a8b25e72-e6b3-4686-9f03-527b2a2e7c71 INFO {"symbol":"Crypto.FIDA/USD","price":1.9368,"confidence":0.0016}

2022-02-21T10:54:58.567-08:00	2022-02-21T18:54:58.567Z a8b25e72-e6b3-4686-9f03-527b2a2e7c71 INFO {"symbol":"Crypto.STEP/USD","price":0.14875000000000002,"confidence":3.5000000000000005E-4}

2022-02-21T10:54:58.567-08:00	2022-02-21T18:54:58.567Z a8b25e72-e6b3-4686-9f03-527b2a2e7c71 INFO {"symbol":"Crypto.MNGO/USD","price":0.16311225000000001,"confidence":4.085E-5}

2022-02-21T10:54:58.567-08:00	2022-02-21T18:54:58.567Z a8b25e72-e6b3-4686-9f03-527b2a2e7c71 INFO {"symbol":"Metal.XAU/USD","price":1903.8700000000001,"confidence":0.23}

2022-02-21T10:54:58.567-08:00	2022-02-21T18:54:58.567Z a8b25e72-e6b3-4686-9f03-527b2a2e7c71 INFO {"symbol":"Crypto.AVAX/USD","price":75.615,"confidence":0.019}

2022-02-21T10:54:58.567-08:00	2022-02-21T18:54:58.567Z a8b25e72-e6b3-4686-9f03-527b2a2e7c71 INFO {"symbol":"Crypto.RAY/USD","price":2.8035,"confidence":0.0012}

2022-02-21T10:54:58.567-08:00	2022-02-21T18:54:58.567Z a8b25e72-e6b3-4686-9f03-527b2a2e7c71 INFO {"symbol":"Crypto.HXRO/USD","price":0.36722499999999997,"confidence":4.35E-4}

2022-02-21T10:54:58.567-08:00	2022-02-21T18:54:58.567Z a8b25e72-e6b3-4686-9f03-527b2a2e7c71 INFO {"symbol":"Crypto.SNY/USD","price":1.0281,"confidence":0.001}
```

### KDA_SQL

This can be set up and torn down using using the cells in the Jupyter notebook. The notebook assumes the account number for the AWS account is available as the PA_ACCOUNT_NO environment variable. Also note that while AWS_DEFAULT_PROFILE and AWS_DEFAULT_REGION must be set prior to running Jupyter notebook, us-west-2 is hardcode in a few places... the notebook also assumes an input Kinesis stream named pyth.

## Clean Up

KDA-SQL: use the clean up cells in the notebook

Output lambda:

`sls remove --region us-west-2`

Kinesis stream

`aws kinesis delete-stream --stream-name pyth`
