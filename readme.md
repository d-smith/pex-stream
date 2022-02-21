# Pex-stream

Write pyth quotes to kinesis stream

## Set up

### Kinesis

aws kinesis create-stream --stream-name pyth --shard-count 1

### Quote stream

In the stream directory

* npm i
* npx tsc


node dist/pex.js




### Output Lambda 

Deploy the output function

*  sls deploy --region us-west-2

### KDA_SQL

## Clean Up

Output lambda:

sls remove --region us-west-2
