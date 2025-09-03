import mongoose from 'mongoose';

const blacklisttokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600 // 1 hour in seconds
    }
}, {
    timestamps: true
})

const blacklisttokenModel = mongoose.model('blacklisttoken', blacklisttokenSchema);

export default blacklisttokenModel;