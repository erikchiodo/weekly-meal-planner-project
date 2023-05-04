const router = require("express").Router();
const { Schedule } = require("../../models");

router
  .route("/")
  .post(async (req, res) => {
    try {
      const newSchedule = await Schedule.create(req.body);
      res.status(201).json(newSchedule);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  })
  .get(async (req, res) => {
    try {
      const getSchedules = await Schedule.findAll();
      res.json(getSchedules);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const getSchedule = await Schedule.findByPk(id);
      if (getSchedule) {
        res.json(getSchedule);
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
      const [updateSchedule] = await Schedule.update(req.body, {
        where: { id },
      });
      if (updateSchedule === 1) {
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
      const deleteSchedule = await Schedule.destroy({ where: { id } });
      if (deleteSchedule === 1) {
        res.json({ message: "Record deleted successfully" });
      } else {
        res.status(404).json({ error: "Record not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
module.exports = router;