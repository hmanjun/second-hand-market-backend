const {Schema, model, default: mongoose} = require('mongoose')

const listingSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            maxLength: 40
        },
        description: {
            type: String,
            maxLength: 500,
        },
        price: {
            type: Number,
            get: getPrice,
            set: setPrice
        },
        tags: [{
            type: String
        }],
        likes: {
            type: Number,
            default: 0
        },
        poster: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        photosUrl: [{
            type: String
        }],
        modelUrl: {
            type: String
        }
    }
)

const getPrice = (num) => {
    return (num/100).toFixed(2)
}

const setPrice = (num) => {
    return num*100
}

const Listing = model('listing', listingSchema)

module.exports = Listing