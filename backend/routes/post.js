const { getPostInfo, getAllPost, newPost, makeComment, likeUnlike, fetchPostsOfAll, getStoriesOfFollowing, saveUnsave, deletePost } = require('../controllers/postControllers');
const { isAuth } = require('../middlewares/auth');
const { uploads } = require('../middlewares/upload');

const express = require('express');
const router = express();

router.route('/detail/:id').post(getPostInfo);
router.route('/all').get(getAllPost);
router.route('/new').post(uploads.array('images', 10), isAuth, newPost);
router.route('/comment/:id').post(isAuth, makeComment);
router.route('/like/:id').put(isAuth, likeUnlike);
router.route('/save/:id').put(isAuth, saveUnsave);
router.route('/fetch').post(isAuth, fetchPostsOfAll);
router.route('/stories').post(isAuth, getStoriesOfFollowing);
router.route('/delete/:id').post(isAuth, deletePost);

module.exports = router;