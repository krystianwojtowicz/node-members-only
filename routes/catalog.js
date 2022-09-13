var express = require("express");
var router = express.Router();
// const auth_controller = require("../controllers/authController");
// const index_controller = require("../controllers/indexController");
const message_controller = require("../controllers/messageController");
const user_controller = require("../controllers/userController");

// GET catalog home page.
router.get("/", user_controller.index);
/// ------------------------------ BECOME A MEMBER ------------------------------ ///
router.get("/member", user_controller.user_create_get);
router.post("/member", user_controller.user_create_post);

/// ------------------------------ CREATE A MESSAGE ------------------------------ ///
router.get("/create-message", message_controller.message_create_get);
router.post("/create-message", message_controller.message_create_post);

module.exports = router;
