import fastify from 'fastify'
import './env.mjs'
import routes from './mock-api-routes.mjs'

const server = fastify({ logger: process.env.NODE_ENV === 'production' ? false : true })
server.register(routes)

const start = async () => {
  try {
    await server.listen(process.env.MOCK_API_PORT)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()
