const express = require("express");
const router = express.Router();
const Application = require("../models/Application");

router.get("/", async (req, res) => {
  try {
    const apps = await Application.find();
    console.log("Applications:", apps);
    res.json(apps);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  const { name, path, parameter, iconUrl } = req.body;

  try {
    const newApp = new Application({ name, path, parameter, iconUrl });
    const savedApp = await newApp.save();

    res.json(savedApp);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Remove an application
router.delete("/:appId", async (req, res) => {
  const appId = req.params.appId;

  try {
    const removedApp = await Application.findOneAndDelete({ _id: appId });

    if (removedApp) {
      res.json(removedApp);
    } else {
      res.status(404).json({ error: "App not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
