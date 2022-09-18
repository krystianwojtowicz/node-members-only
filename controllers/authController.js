const { body, validationResult } = require("express-validator");
const User = require("../models/user");
// Display joining the club form on GET.
// exports.club_joining_get = (req, res, next) => {
//   res.render("club_form", { title: "Joining to the club" });
// };

exports.club_joining_get = (req, res, next) => {
  if (!res.locals.currentUser) {
    // User cannot access the members form unless logged in
    return res.redirect("/catalog/login");
  }
  return res.render("club_form", {
    title: "Become a Member - Members Only",
    user: res.locals.currentUser,
  });
};

// Handle joining the club form on POST.
exports.club_joining_post = [
  body("code", "code required")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Passcode must be specified.")
    .custom((value, { req }) => {
      if (value !== "members") {
        throw new Error("Passcode is wrong");
      }
      return true;
    }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("club_form", {
        title: "Joining to the club",
        errors: errors.array(),
      });
    } else {
      const user = new User(res.locals.currentUser);
      user.member = true;
      await User.findByIdAndUpdate(
        res.locals.currentUser._id,
        user,
        {},
        (err) => {
          if (err) return next(err);
          return res.redirect("/");
        }
      );
    }
  },
];

exports.admin_get = (req, res, next) => {
  if (!res.locals.currentUser) {
    // User cannot access the members form unless logged in
    return res.redirect("/catalog/login");
  }
  return res.render("admin_form", {
    title: "Become an Admin - Members Only",
    user: res.locals.currentUser,
  });
};

// Handle joining the club form on POST.
exports.admin_post = [
  body("code", "code required")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Passcode must be specified.")
    .custom((value, { req }) => {
      if (value !== "admins") {
        throw new Error("Passcode is wrong");
      }
      return true;
    }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("admin_form", {
        title: "Become an admin",
        errors: errors.array(),
      });
    } else {
      const user = new User(res.locals.currentUser);
      user.admin = true;
      await User.findByIdAndUpdate(
        res.locals.currentUser._id,
        user,
        {},
        (err) => {
          if (err) return next(err);
          return res.redirect("/");
        }
      );
    }
  },
];
