import { fastify } from 'fastify'
// import { DatabaseMemory } from './database-memory.js'
import { Database } from './database-postgres.js'
const server = fastify()

server.listen({
    port: process.env.PORT ?? 3333,
})

const database = new Database()

server.post('/videos', async (request, reply) => {

    const video = request.body

    await database.create(video)

    return reply.status(200).send()
})

server.get('/videos', async (request) => {
    const search = request.query.search
    const videos = database.list(search)
    console.log(videos)
    return videos;
})

server.put('/videos/:id', async (request, reply) => {
    const id = request.params.id

    const {
        title,
        description,
        duration
    } = request.body

    database.update(id, 
    {
        title,
        description,
        duration
    })
    
    return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
    const id = request.params.id

    database.delete(id)

    return reply.status(204).send()
})