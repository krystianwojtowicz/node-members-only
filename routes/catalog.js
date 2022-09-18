var express = require("express");
var router = express.Router();
// const auth_controller = require("../controllers/authController");
// const index_controller = require("../controllers/indexController");
const message_controller = require("../controllers/messageController");
const user_controller = require("../controllers/userController");
const auth_controller = require("../controllers/authController");

// GET catalog home page.
router.get("/", user_controller.index);
/// ------------------------------ BECOME A MEMBER ------------------------------ ///
router.get("/user/create", user_controller.user_create_get);
router.post("/user/create", user_controller.user_create_post);
router.get("/joining", auth_controller.club_joining_get);
router.post("/joining", auth_controller.club_joining_post);
router.get("/login", user_controller.user_login_get);
router.post("/login", user_controller.login_post);

/// ------------------------------ BECOME AN ADMIN ------------------------------ ///
router.get("/admin", auth_controller.admin_get);
router.post("/admin", auth_controller.admin_post);

/// ------------------------------ CREATE A MESSAGE ------------------------------ ///
router.get("/message/create", message_controller.message_create_get);
router.post("/message/create", message_controller.message_create_post);

module.exports = router;
