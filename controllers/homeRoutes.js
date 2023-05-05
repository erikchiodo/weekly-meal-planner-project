const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");

// router.get("/", async (req, res) => {
//   res.render("login");
// });

router.get("/register", async (req, res) => {
  res.render("registration");
});

router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render("login", {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// If there's active session, redirect to / route (see above)
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
