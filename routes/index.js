const router = require('express').Router();

//import js files from api folder
const apiRoutes = require('./api');

//prefixes routes to be /api/users in URL
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;