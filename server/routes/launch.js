// routes/launch.js
const express = require('express');
const router = express.Router();
const { exec } = require('child_process');

router.post('/', async (req, res) => {
  const { path, parameter } = req.body;
  const command = `"${path}" ${parameter}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error launching application: ${error.message}`);
      res.status(500).send('Internal Server Error');
      return;
    }

    console.log(`Application launched: ${stdout}`);
    res.send('Application launched successfully');
  });
});

module.exports = router;
