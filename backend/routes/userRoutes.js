const express = require("express");
const User = require("../models/User");

const router = express.Router();


// =========================
// SIGNUP
// =========================

router.post("/signup", async (req, res) => {

  try {

    const { name, email, password } = req.body;


    if (!name || !email || !password) {

      return res.status(400).json({
        message: "Please fill all fields"
      });

    }


    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists"
      });

    }


    const newUser = new User({
      name,
      email,
      password
    });


    await newUser.save();


    res.status(201).json({
      message: "Signup successful"
    });

  } catch (error) {

    res.status(500).json({
      message: "Signup failed",
      error: error.message
    });

  }

});


// =========================
// LOGIN
// =========================

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;


    const user = await User.findOne({
      email,
      password
    });


    if (!user) {

      return res.status(401).json({
        message: "Invalid email or password"
      });

    }


    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {

    res.status(500).json({
      message: "Login failed",
      error: error.message
    });

  }

});


module.exports = router;