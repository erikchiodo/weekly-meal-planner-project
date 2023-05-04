// TODO: Create Auth for user
// TODO: Create redirect to login page

const router = require('express').Router();

router.get('/', async (req, res) => {
  res.render('login');
});
router.get('/register', async (req, res) => {
  res.render('registration');
});
module.exports = router;