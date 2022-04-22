import { createHmac } from 'crypto'
import fetch from 'node-fetch'
import db from './db.mjs'

//TODO fix authentication
await db.init()

const baseRoute = `/${process.env.MONGO_COLLECTION}`

export default async function routes(server) {
  server.get(baseRoute, async () => await db.list())

  server.post(baseRoute, async (req, res) => {
    // TODO validate data
    // TODO secure endpoint
    const asset = JSON.parse(req.body)
    await db.create(asset)

    const computedSignature =
      'sha256=' + createHmac('sha256', process.env.REVALIDATE_SECRET).update(req.body).digest('hex')
    const webhookRoute = `${process.env.FE_HOST}/api/webhook`
    let response
    try {
      const content = {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
          'x-sd-signature-256': computedSignature,
        },
        body: req.body,
      }
      response = await fetch(webhookRoute, content)
    } catch (err) {
      console.error(err)
      return res.code(500).send(`error calling webhook ${webhookRoute}`)
    }

    return 'success'
  })
}
