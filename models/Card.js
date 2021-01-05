import mongoose from 'mongoose'
import Task from './Task'
import Category from './Category'

const CardsSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectID,
        required: true
    },

    cardDescription: {
        type: 'string',
        required: true,
        maxLength: [60, 'O máximo de caracteres da descrição de um card é 60.']
    },

    categoryList: [
        {
            type: Category
        }
    ],

    taskList: [
        {
            type: Task
        }
    ]
})

export default mongoose.models.Card || mongoose.models('Card', CardsSchema)
