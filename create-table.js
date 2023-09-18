import sql from './db.js'

await sql`
    CREATE TABLE IF NOT EXISTS videos (
        id UUID PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        duration INTEGER NOT NULL
    )
`.then(() => {
    console.log('Table created')
}).catch((error) => {
    console.log(error)
})