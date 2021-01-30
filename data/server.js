const { MongoClient } = require('mongodb')
const { v4: uuidv4 } = require('uuid')
const uri =
    'mongodb+srv://db:database@trello-ti-db.b9kqe.mongodb.net/trello-ti-db?retryWrites=true&w=majority'

const connect = async () => {}

const getListFromId = async (objectId) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true })
    try {
        console.log('Connecting to database')
        await client.connect()
        const res = await client
            .db('trello-ti')
            .collection('trello-ti')
            .findOne({ id: objectId })
        return res
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
}

const addNewList = async (title) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true })
    try {
        await client.connect()
        var id = uuidv4()
        const res = await client
            .db('trello-ti')
            .collection('trello-ti')
            .insertOne({
                id: id,
                name: title,
                cardList: []
            })
            .then(() => {
                return id
            })
            .catch((err) => {
                return err.message
            })
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
}

const getAllLists = async () => {
    const client = new MongoClient(uri, { useUnifiedTopology: true })
    try {
        var lists = []
        await client.connect()
        await client
            .db('trello-ti')
            .collection('trello-ti')
            .find()
            .forEach((x) => {
                var list = {
                    name: x.name,
                    card: x.card,
                    id: x.id
                }

                console.log(list)
                lists.push(list)
            })

        return lists
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
}

const updateList = async (id, newInfo) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true })
    try {
        await client.connect()
        var info = JSON.parse(newInfo)
        var document = await client
            .db('trello-ti')
            .collection('trello-ti')
            .findOne({ id: id })
        document.cardList = info
        console.log(JSON.stringify(document))
        var res = await client
            .db('trello-ti')
            .collection('trello-ti')
            .findOneAndReplace({ id: id }, document)
        return res
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
}

module.exports = {
    getList: getListFromId,
    addList: addNewList,
    getLists: getAllLists,
    updateList: updateList
}
