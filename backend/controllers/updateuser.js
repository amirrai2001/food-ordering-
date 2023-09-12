const User = require("../models/User");
const { verifyToken } = require("../middlewares/verifyToken");
const bcrypt = require("bcrypt");

const updateUser = require("express").Router();

updateUser.post("/updatedUser/:userId", verifyToken, async (req, res) => {
  console.log("hit")
  console.log(req.body.password)
  if (req.params.userId.toString() === req.user.id.toString()) {
    try {
      const updates = {};

      // Check if the request body contains the new username
      if (req.body.username) {
        updates.username = req.body.username;
      }

      // Check if the request body contains the new password
      if (req.body.password) {
        updates.password = await bcrypt.hash(req.body.password, 10);
      }

      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: "error" });
      }
       console.log(updates)
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        { $set: updates },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    return res
      .status(403)
      .json({ msg: "You can only update your own profile" });
  }
});

module.exports = updateUser;
