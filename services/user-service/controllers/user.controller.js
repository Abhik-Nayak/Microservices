import userModel from '../models/user.model.js';
import refreshTokenModel from '../models/refreshToken.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const generateAccessToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
}

const generateRefreshToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

const setAuthCookies = (res, accessToken, refreshToken) => {
    // Access token: short-lived
    res.cookie('token', accessToken, { httpOnly: true, secure: true, maxAge: 15 * 60 * 1000 });
    // Refresh token: longer-lived
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
}

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({ name, email, password: hashedPassword  });
        // const accessToken = generateAccessToken(user._id);
        // const refreshToken = generateRefreshToken(user._id);
        // await refreshTokenModel.create({
        //     userId: user._id,
        //     token: refreshToken,
        //     expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        // });
        // setAuthCookies(res, accessToken, refreshToken);
        delete user._doc.password;
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);
        await refreshTokenModel.create({
            userId: user._id,
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });
        setAuthCookies(res, accessToken, refreshToken);
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const logout = async (req, res) => {
    try {
        const token = req.cookies.token;
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
            await refreshTokenModel.deleteOne({ token: refreshToken });
        }
        res.cookie('token', '', { httpOnly: true, secure: true, maxAge: 0 });
        res.cookie('refreshToken', '', { httpOnly: true, secure: true, maxAge: 0 });
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndUpdate(req.user.id, req.body, { new: true });
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const refresh = async (req, res) => {
    try {
        const tokenFromCookie = req.cookies.refreshToken;
        if (!tokenFromCookie) {
            return res.status(401).json({ message: 'Missing refresh token' });
        }
        const stored = await refreshTokenModel.findOne({ token: tokenFromCookie });
        if (!stored) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }
        let decoded;
        try {
            decoded = jwt.verify(tokenFromCookie, process.env.JWT_REFRESH_SECRET);
        } catch (e) {
            await refreshTokenModel.deleteOne({ token: tokenFromCookie });
            return res.status(401).json({ message: 'Expired or invalid refresh token' });
        }
        // Rotate refresh token: delete old and issue new
        await refreshTokenModel.deleteOne({ token: tokenFromCookie });
        const newAccessToken = generateAccessToken(decoded.id);
        const newRefreshToken = generateRefreshToken(decoded.id);
        await refreshTokenModel.create({
            userId: decoded.id,
            token: newRefreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });
        setAuthCookies(res, newAccessToken, newRefreshToken);
        res.status(200).json({ message: 'Token refreshed' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const devPurge = async (req, res) => {
    try {
        if (process.env.NODE_ENV === 'production') {
            return res.status(403).json({ message: 'Forbidden in production' });
        }
        const [usersRes, refreshRes] = await Promise.all([
            userModel.deleteMany({}),
            refreshTokenModel.deleteMany({})
        ]);
        res.status(200).json({
            message: 'All data purged',
            deleted: {
                users: usersRes?.deletedCount ?? undefined,
                refreshTokens: refreshRes?.deletedCount ?? undefined,
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
