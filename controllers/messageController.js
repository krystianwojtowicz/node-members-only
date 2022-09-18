const Message = require("../models/message");
const { body, validationResult } = require("express-validator");
const { DateTime } = require("luxon");

// Display Message create form on GET.
exports.message_create_get = (req, res, next) => {
  res.render("message_form", {
    title: "Create a Message",
    user: res.locals.currentUser,
  });
};

// Handle Message create on POST.
// exports.message_create_post = (req, res) => {
//   res.send("NOT IMPLEMENTED: Message create POST");
// };
exports.message_create_post = [
  body("messageTitle")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Title must not be empty"),
  body("messageText")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Text must not be empty"),

  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("message_form", {
        title: "Create a Message",
        errors: errors.array(),
      });
    }

    const message = new Message({
      user: req.user._id,
      username: req.user.username,
      title: req.body.messageTitle,
      text: req.body.messageText,
      timestamp: Date.now(),
    });

    await message.save((err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  },
];

// Handle Message delete on POST.
exports.message_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Message delete POST");
};
