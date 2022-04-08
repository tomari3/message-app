var Message = require("../models/message");
const { body, validationResult } = require("express-validator");

exports.index = function (req, res, next) {
  Message.find({})
    .sort({ created: 1 })
    .exec(function (err, list_messages) {
      res.render("index", { title: "Message Board", messages: list_messages });
    });
};

exports.message_create_get = function (req, res, next) {
  res.render("form", {
    title: "New Message",
  });
};

exports.message_create_post = [
  body("user", "user must not be empty").trim().isLength({ min: 1 }).escape(),
  body("message", "message must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res, next) => {
    const errors = validationResult(res);

    var message = new Message({
      user: req.body.user,
      message: req.body.message,
    });

    if (!errors.isEmpty()) {
      res.render("form", {
        title: "New Message",
        user: results.user,
        message: results.message,
        errors: errors.array(),
      });
      return;
    } else {
      message.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
    }
  },
];
