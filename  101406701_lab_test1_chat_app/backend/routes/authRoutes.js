const express = require("express");
const User = require("../models/User.js");

const router = express.Router();


router.post("/signup", async (req, res) => {
    try {
        const { username, firstname, lastname, password } = req.body;

        
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        
        const newUser = new User({ username, firstname, lastname, password });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});


router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

       
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        
        res.status(200).json({ message: "Login successful", username: user.username });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;
