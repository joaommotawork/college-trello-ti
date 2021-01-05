import mongoose from 'mongoose'

const CategoriesSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectID,
        required: true
    },

    name: {
        type: 'string',
        required: true
    },

    color: {
        type: 'string',
        required: true
    }
})

export default mongoose.models.Category ||
    mongoose.model('Category', CategoriesSchema)
