const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "Email already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 12);
        const user = new User({ name, email, password: hashPassword, role });
        await user.save();

        res.status(201).json({ success: true, message: "User Registered" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
});


router.post('/login', async(req,res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) return res.status(404).json({message:  "User not found"})

    const valid = await bcrypt.compare(password, user.password);
    if(!valid) return res.status(401).json({message: " Invalid Password"})

    const token = jwt.sign(
        {id: user._id, role: user.role},
        process.env.JWT_SECRET,
        {expiresIn : '1h'}
    );
    res.json({success: true, token});
});

module.exports = router;