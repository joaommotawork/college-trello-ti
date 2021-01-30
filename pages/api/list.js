import db from '../../data/server.js'
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {
            query: { title }
        } = req
        console.log(title)
        var result = await db.addList(title)
        res.send(result)
    } else {
        var x = await db.getLists()
        res.status(200).json(JSON.stringify(x))
    }
}
