import mongoose from 'mongoose';

const refreshTokenSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'captain', required: true, index: true },
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true, index: true },
    createdAt: { type: Date, default: Date.now }
});

const refreshTokenModel = mongoose.model('refreshToken', refreshTokenSchema);

export default refreshTokenModel;


