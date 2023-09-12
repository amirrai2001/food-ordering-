const authController = require('express').Router()
const User = require('../models/User')
const bcrypt = require("bcrypt")
const { Router, json } = require('express')
const jwt = require('jsonwebtoken')
const passport = require("passport")


authController.post('/register', async(req, res) => {
    try {
      const isExisting = await User.findOne({email: req.body.email})  
      if(isExisting){
        throw new Error("Already such an account with this email. Try a new one!")
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10)

      const newUser = await User.create({...req.body, password: hashedPassword})
      const {password, ...others} = newUser._doc
      const token = jwt.sign({id: newUser._id, isAdmin: newUser.isAdmin}, process.env.JWT_SECRET, {expiresIn: '5h'})

      return res.status(201).json({others, token})
    } catch (error) {
        return res.status(500).json(error.message)
    }
})


authController.post('/login', async(req, res) => {
    try {
       const user = await User.findOne({email: req.body.email})
       if(!user){
          throw new Error("User credentials are wrong!")
       }


       const comparePass = await bcrypt.compare(req.body.password, user.password)
       if(!comparePass){
        throw new Error("User credentials are wrong!")
       }

       const {password, ...others} = user._doc
       const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET, {expiresIn: '5h'})

       return res.status(200).json({others, token})
    } catch (error) {
        return res.status(500).json(error.message) 
    }
})
 

let toKen;
authController.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
    session: false,
  }),
  (req, res) => {
    const REQ = req.user;
    const payload = { id: REQ._id };
    toKen = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' });
    res.redirect(`http://localhost:3000/auth/${toKen}`);
  }
);

authController.post("/token/:token", (req, res) => {
  const token = req.params.token;

  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      return res.status(401).json({ error: 'Token is invalid or expired' });
    }

    const userData = data;

    try {
      // Find the user by ID
      const user = await User.findById(userData.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Extract user properties
      const others  = user._doc;
         console.log(others)
      // Prepare the response data

      return res.status(200).json({others,token });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});

authController.get(
  '/google',
  passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email'],
    accessType: 'offline',
    approvalPrompt: 'force'
  })
);

module.exports = authController