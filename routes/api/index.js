const router = require('express').Router();

//GET, POST, PUT, DELETE routes from user-routes
const userRoutes = require('./user-routes.js');

//prefixes routes to be /users in URL
router.use('/users', userRoutes);

module.exports = router;