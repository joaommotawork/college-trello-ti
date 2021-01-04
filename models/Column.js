import mongoose from 'mongoose'
import Card from './Card'

const ColumnsSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectID,
        required: true
    },

    name: {
        type: 'string',
        required: true
    },

    cardList: [
        {
            type: Card
        }
    ]
})

export default mongoose.models.Column ||
    mongoose.models('Columns', ColumnsSchema)
