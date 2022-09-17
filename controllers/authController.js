const { body, validationResult } = require("express-validator");
// Display joining the club form on GET.
exports.club_joining_get = (req, res, next) => {
  res.render("club_form", { title: "Joining to the club" });
};

// Handle joining the club form on POST.
exports.club_joining_post = [
  body("code", "code required")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Passcode must be specified.")
    .custom((value, { req }) => {
      if (value !== "members") {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("club_form", {
        title: "Joining to the club",
        errors: errors.array(),
      });
    } else {
      res.redirect("/");
    }
  },
];

// const { body, validationResult } = require("express-validator");
// const User = require("../models/user");
// // Display joining the club form on GET.
// exports.club_joining_get = (req, res, next) => {
//   res.render("club_form", { title: "Joining to the club" });
// };

// // Handle joining the club form on POST.
// exports.club_joining_post = [
//   body("code", "code required")
//     .trim()
//     .isLength({ min: 1 })
//     .withMessage("Passcode must be specified.")
//     .custom((value, { req }) => {
//       if (value !== "members") {
//         throw new Error("Password confirmation does not match password");
//       }
//       return true;
//     }),
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.render("club_form", {
//         title: "Joining to the club",
//         errors: errors.array(),
//       });
//     } else {
//       User.findOne({ username: "Krystian" }).exec((err, found_user) => {
//         if (err) {
//           return next(err);
//         }

//         if (found_user) {
//           // // User exists, redirect to its detail page.
//           // res.redirect(found_genre.url);
//           found_user.member = true;
//         }
//       });
//       res.redirect("/");
//     }
//   },
// ];
