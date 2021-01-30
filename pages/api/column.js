// Fake users data
const column = [
    { id: 1, name: 'fds' },
    { id: 2, name: 'fds' },
    { id: 3, name: 'fds' }
]

export default function handler(req, res) {
    // Get data from your database
    res.status(200).json(column)
}
