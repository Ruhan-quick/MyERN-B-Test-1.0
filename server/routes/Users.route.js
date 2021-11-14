const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { userName, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      userName: userName,
      password: hash,
    });
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  const user = await Users.findOne({ where: { userName: userName } });

  if (!user) res.json({ error: "User Doesn't Exist" });
  else {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match)
        res.json({ error: "Wrong Username and Password Combination" });

      res.json("You Logged In");
    });
  }
});
router.get("/", async (req, res) => {
  console.log("hello");
  res.json("Hello Ruhan");
});
module.exports = router;
