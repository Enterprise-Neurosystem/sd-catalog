import { MongoClient } from 'mongodb'

let client, collection

async function init() {
  const url = `${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}`
  client = new MongoClient(url)
  await client.connect()
  console.log('db connected')
  const db = client.db(process.env.MONGO_DATABASE)
  collection = db.collection(process.env.MONGO_COLLECTION)
}

async function list() {
  const result = await collection.find({}).toArray()
  return result
}

async function create(asset) {
  await collection.insertOne(asset)
}

export default {
  init,
  list,
  create,
}
