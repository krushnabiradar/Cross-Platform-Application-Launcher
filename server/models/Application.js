// models/Application.js

const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  name: String,
  path: String,
  parameter: String,
  iconUrl: String,
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
