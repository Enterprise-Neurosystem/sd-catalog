import { createHmac } from 'crypto'
import { subDays } from 'date-fns'
import fetch from 'node-fetch'

let posts = [
  {
    date: subDays(new Date(), 2),
    title: 'identified issue',
    content: 'the widget is broken',
  },
  {
    date: subDays(new Date(), 1),
    title: 'proposed a solution',
    content: 'I think this will work',
  },
  {
    date: new Date(),
    title: 'implemented fix',
    content: 'the widget works',
  },
]

export default async function routes(server) {
  server.get('/posts', async () => {
    return posts
  })

  server.post('/posts', async (req, res) => {
    // TODO validate data
    // TODO secure endpoint
    // TODO integrate mongodb
    posts = [...posts, JSON.parse(req.body)]

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
