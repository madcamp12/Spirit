const express = require('express');
const { newMessage, getMessages } = require('../controllers/messageControllers');
const { isAuth } = require('../middlewares/auth');

const router = express();

router.route("/newMessage").post(isAuth, newMessage);
router.route("/:chatId").post(isAuth, getMessages);

module.exports = router;