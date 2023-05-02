// TODO: Create Auth for user
// TODO: Create redirect to login page

const router = require('express').Router();

router.get('/', async (req, res) => {
  res.render('homepage');
});

module.exports = router;