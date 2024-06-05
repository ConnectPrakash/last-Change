const express = require('express');
const User = require('../model/index');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const verifyToken = require('../middleware/index');
const router = express.Router();
const cors = require('cors');

router.use(cors());

router.get('/test', (req, res) => {
    res.json({ message: "Api Testing Successful" });
});

// Route for user registration
router.post('/user', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ email, password: hashedPassword });
            await newUser.save();
            console.log(email, password);
            return res.status(201).json({ message: "User Created" });
        }
        res.status(404).json({ message: "User already Exists" });
    } catch (error) {
        console.error('User registration error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route for user authentication
router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect Password" });
        }
        const generateToken = (await import('crypto-random-string')).default;
        const token = generateToken({ length: 16, type: 'url-safe' });
        res.json({ token });
    } catch (error) {
        console.error('User authentication error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/data', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userData = {
            email: user.email
        };
        res.json({ message: `Welcome, ${userData.email}! This is protected data`, userData });
    } catch (error) {
        console.error('Dashboard data error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/reset-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const generateToken = (await import('crypto-random-string')).default;
        const token = generateToken({ length: 16, type: 'url-safe' });
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "pp3662504@gmail.com",
                pass: "kmdp phzd wwgy eapa",
            },
        });
        const mailOptions = {
            from: "pp3662504@gmail.com",
            to: user.email,
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            http://${req.headers.host}/reset/${token}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Password reset email sent" });
    } catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/reset/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
        }
        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        res.status(200).json({ message: 'Password has been reset' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
