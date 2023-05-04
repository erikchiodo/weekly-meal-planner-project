const router = require("express").Router();
const { Favorites } = require("../../models");

router.route("/")
  .post(async (req, res) => {
    try {
      const newFavorite = await Favorites.create(req.body);
      res.status(201).json(newFavorite);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  })
  .get(async (req, res) => {
    try {
      const getFavorites = await Favorites.findAll();
      res.json(getFavorites);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

router.route("/:id")
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const getFavorite = await Favorites.findByPk(id);
      if (getFavorite) {
        res.json(getFavorite);
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
      const [updateFavorite] = await Favorites.update(req.body, { where: { id } });
      if (updateFavorite === 1) {
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
      const deleteFavorite = await Favorites.destroy({ where: { id } });
      if (deleteFavorite === 1) {
        res.json({ message: "Record deleted successfully" });
      } else {
        res.status(404).json({ error: "Record not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

module.exports = router;