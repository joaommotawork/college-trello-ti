import mongoose from 'mongoose'
import Columns from './Column'
const ProjectSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectID,
        required: true
    },

    columns: [
        {
            type: Columns
        }
    ]
})

export default mongoose.models.Project ||
    mongoose.model('Project', ProjectSchema)
