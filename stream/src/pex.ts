import { Cluster, clusterApiUrl, Connection, PublicKey } from '@solana/web3.js'
import { PythConnection } from '@pythnetwork/client'
import {getPythProgramKeyForCluster} from '@pythnetwork/client'
import { PriceStatus }  from '@pythnetwork/client'

import kinesis from 'aws-sdk/clients/kinesis'
const kinesis_client = new kinesis();
import {v4 as uuidv4} from 'uuid';


const SOLANA_CLUSTER_NAME: Cluster = 'devnet'
const connection = new Connection(clusterApiUrl(SOLANA_CLUSTER_NAME))
const pythPublicKey = getPythProgramKeyForCluster(SOLANA_CLUSTER_NAME)

const pythConnection = new PythConnection(connection, pythPublicKey)
pythConnection.onPriceChange((product, price) => {
  if (price.price && price.confidence) {
    // tslint:disable-next-line:no-console
    console.log(`${product.symbol}: $${price.price} \xB1$${price.confidence}`)
    const params = {
      Data: Buffer.from(`${product.symbol},${price.price},${price.confidence}`),
      PartitionKey: uuidv4(),
      StreamName: 'pyth'
    }

    kinesis_client.putRecord(params,(err,data)=> {
      if(data) {
        console.log(data)
      } else {
        console.log(`error: ${err}`)
      }
    })
  } else {
    // tslint:disable-next-line:no-console
    console.log(`${product.symbol}: price currently unavailable. status is ${PriceStatus[price.status]}`)
  }
})

// tslint:disable-next-line:no-console
console.log('Reading from Pyth price feed...')
pythConnection.start()