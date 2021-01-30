import db from '../../../data/server.js'

export default async function userHandler(req, res) {
    const {
        query: { id },
        method,
        body
    } = req
    console.log(body)
    var result = null
    switch (method) {
        case 'GET':
            console.log('teste')
            result = await db.getList(id)
            res.status(200).json(result)
            break

        case 'PUT':
            result = await db.updateList(id, body)
            res.status(200).json(result)
            break
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
