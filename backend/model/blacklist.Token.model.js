const mongoose=require('mongoose')

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400  // TTL: 24 hours (86400 seconds)
    }
})

const blacklistTokenModel = mongoose.model('BlacklistToken', blacklistTokenSchema)

module.exports = blacklistTokenModel