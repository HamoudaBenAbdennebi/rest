const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/find", function (req, res) {
  User.find()
    .then((users) => {
      console.log(users);
      res.send(users);
    })
    .catch((err) => res.json(err));
});

router.post("/add", function (req, res) {
  const newUser = new User(req.body);
  newUser
    .save()
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

router.patch("/edit/:id", async (req, res) => {
  const { id } = req.params;
  var email = req.body.email;
  console.log(email);
  try {
    const person = await User.findOne({ _id: id });
    await person.updateOne({ email: email });
    await person.save();
    res.send(person);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/delete/:id", function (req, res, next) {
  const { id } = req.params;

  User.findByIdAndRemove({ _id: id }, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

module.exports = router;
