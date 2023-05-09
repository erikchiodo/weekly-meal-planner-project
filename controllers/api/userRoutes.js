const router = require("express").Router();
const { User } = require("../../models");

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    

    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/weekly", async (req, res) => {
  res.render("weekly");
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


// User Routes
router
  .route("/")
  .post(async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  })
  .get(async (req, res) => {
    try {
      const getUser = await User.findAll();
      res.json(getUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const getUser = await User.findByPk(id);
      if (getUser) {
        res.json(getUser);
      } else {
        res.status(404).json({ error: "Record not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  })
  .put(async (req, res) => {
    try {
      const { id } = req.params;
      const [updateUser] = await User.update(req.body, {
        where: { id },
      });
      if (updateUser === 1) {
        res.json({ message: "Record updated successfully" });
      } else {
        res.status(404).json({ error: "Record not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      const deleteUser = await User.destroy({ where: { id } });
      if (deleteUser === 1) {
        res.json({ message: "Record deleted successfully" });
      } else {
        res.status(404).json({ error: "Record not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


module.exports = router;