const router = require('express').Router();

//GET, POST, PUT, DELETE routes from user-routes
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');
//prefixes routes to be /users in URL
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;