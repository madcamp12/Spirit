const express = require('express');
const { newChat, getChats } = require('../controllers/chatControllers');
const { isAuth } = require('../middlewares/auth');

const router = express();

router.route("/newChat").post(isAuth, newChat);
router.route("/get").post(isAuth, getChats);

module.exports = router;