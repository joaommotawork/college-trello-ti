import mongoose from 'mongoose'

const TasksSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectID,
        required: true
    },

    title: {
        type: 'string',
        required: ['true', 'Dê um nome à Tarefa']
    },

    done: {
        type: 'boolean',
        default: false
    }
})

export default mongoose.models.Task || mongoose.model('Task', TasksSchema)
