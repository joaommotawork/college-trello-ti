const { MongoClient } = require('mongodb')
const uri =
    'mongodb+srv://db:database@trello-ti-db.b9kqe.mongodb.net/trello-ti-db?retryWrites=true&w=majority'

const client = new MongoClient(uri, { useUnifiedTopology: true })

export default function userHandler(req, res) {
    const {
        query: { id, name },
        method
    } = req

    connectToDb()
    switch (method) {
        case 'GET':
            // Get data from your database
            res.status(200).json({ id, name: `User ${id}` })
            break
        case 'PUT':
            // Update or create data in your database
            res.status(200).json({ id, name: name || `User ${id}` })
            break
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}

const connectToDb = async () => {
    try {
        await client.connect()

        // await client
        //     .db('trello-ti')
        //     .collection('trello-ti')
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
}
