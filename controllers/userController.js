const User = require("../models/user");
const Message = require("../models/message");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// exports.index = (req, res) => {
//   res.send("NOT IMPLEMENTED: Site Home Page");
// };
// from inv

const async = require("async");

exports.index = (req, res) => {
  async.parallel(
    {
      user_count(callback) {
        User.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
      },
      message_count(callback) {
        Message.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
      },
    },
    (err, results) => {
      res.render("index", {
        title: "Members only",
        error: err,
        data: results,
      });
    }
  );
};

// from inv

// // Display User create form on GET.
// exports.user_create_get = (req, res) => {
//   res.send("NOT IMPLEMENTED: User create GET");
// };
// Display User create form on GET.
exports.user_create_get = (req, res, next) => {
  res.render("user_form", { title: "Create User" });
};

// // Handle User create on POST.
// exports.user_create_post = (req, res) => {
//   res.send("NOT IMPLEMENTED: User create POST");
// };
// Handle User create on POST.
exports.user_create_post = [
  // Validate and sanitize the name field.
  body("username", "Username required").trim().isLength({ min: 1 }).escape(),
  body("password", "Password required").isLength({ min: 1 }).escape(),
  body("confirmPassword", "confirmPassword required").custom(
    (value, { req }) => {
      if (value !== req.body.username) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }
  ),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    const hash = bcrypt.hashSync(req.body.password, 10);

    // Create a user object with escaped and trimmed data.
    const user = new User({
      username: req.body.username,
      password: hash,
      confirmPassword: req.body.confirmPassword,
      member: req.body.member,
      admin: req.body.admin,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("user_form", {
        title: "Create User",
        user,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if User with same name already exists.
      User.findOne({ username: req.body.username }).exec((err, found_user) => {
        if (err) {
          return next(err);
        }

        if (found_user) {
          // // User exists, redirect to its detail page.
          // res.redirect(found_genre.url);
          res.redirect("/catalog/user/create");
        } else {
          user.save((err) => {
            if (err) {
              return next(err);
            }
            // User saved. Redirect to genre detail page.
            res.redirect("/");
          });
        }
      });
    }
  },
];
