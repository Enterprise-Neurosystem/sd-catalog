import { createHmac } from 'crypto'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('invalid request method')
  }
  const body = await getRawBody(req)
  if (!body) {
    res.status(400).send('invalid request (unable to parse body)')
    return
  }
  const secret = process.env.REVALIDATE_SECRET
  if (secret.length === 0) {
    return res.status(500).send('invalid secret')
  }

  const signature = req.headers['x-sd-signature-256']
  const computedSignature = 'sha256=' + createHmac('sha256', secret).update(body).digest('hex')

  if (computedSignature !== signature) {
    return res.status(401).send('invalid signature')
  }

  try {
    await res.unstable_revalidate('/')
    return res.send('success')
  } catch (err) {
    return res.status(500).send('error revalidating')
  }
}

function getRawBody(req) {
  return new Promise((resolve) => {
    let bodyChunks = []
    req.on('end', () => {
      const rawBody = Buffer.concat(bodyChunks).toString('utf8')
      resolve(rawBody)
    })
    req.on('data', (chunk) => bodyChunks.push(chunk))
  })
}

export const config = {
  api: {
    bodyParser: false,
  },
}
