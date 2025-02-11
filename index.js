const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtPassword = "123456";

mongoose.connect(
  "mongodb+srv://admin:7H7MTHzQhqXvG7mxz@cluster0.3tawb.mongodb.net/",
);

const User = mongoose.model("User", {
  name: String,
  username: String,
  password: String,
});

const app = express();
app.use(express.json());

async function userExists(username, password) {
  // should check in the database
  const user = await User.findOne({ username, password });
  return user !== null;
}

app.post("/signin", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }
  const token = jwt.sign({ username }, jwtPassword);
  res.json({ token }); // ✅ Missing closing bracket was added
})