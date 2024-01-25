const { loginWithKakao, getUserDetail, checkUsername, updateUser, followUnfollow, getInfoWithToken, searchUser, getUserDetailById } = require('../controllers/userControllers');
const { isAuth } = require('../middlewares/auth');

const express = require('express');
const router = express();

router.route('/login/kakao').post(loginWithKakao);
router.route('/detail/:username').get(getUserDetail);
router.route('/detail/id/:userid').get(getUserDetailById);
router.route('/check/:username').get(checkUsername);
router.route('/update').put(isAuth, updateUser);
router.route('/follow/:id').post(isAuth, followUnfollow);
router.route('/token').post(isAuth, getInfoWithToken);
router.route('/search').get(searchUser);

module.exports = router;