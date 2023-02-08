const {Schema, model, default: mongoose} = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must be an email address!']
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        phoneNumber: {
            type: Number,
            required: true,
            unique: true
        },
        zipCode: {
            type: Number,
            required: true
        },
        listings: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'listing'
        },
        savedListings: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'listing'
        }
    }
)

userSchema.pre('save', async function(next) {
    if(this.isNew || this.isModified(password)){
        const saltRounds = 10
        this.password = await bcrypt.hash(this.password, saltRounds)
    }

    next()
})

userSchema.methods.isCorrectPassword = async function(password){
    return bcrypt.compare(password, this.password)
}

const User = model('user', userSchema)

module.exports = User