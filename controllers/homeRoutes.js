const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/register", async (req, res) => {
  res.render("registration");
});

// Post request to register user
const registerUser = async (event) => {
  event.preventDefault();
router.post("/register", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  // Validate inputs
  if (!first_name || !last_name || !email || !password) {
    res.status(400).send("All fields are required");
    return;
  }

  try {
    // Register new user
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password,
    });
    res.status(201).send(`User created with ID: ${newUser.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering user");
  }
});
};


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

document
  .querySelector("#register")
  .addEventListener("submit", registerUser);

module.exports = router;
