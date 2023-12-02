const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const server = express();
dotenv.config();
const PORT = process.env.PORT || 2354;

// Connect to MongoDB
mongoose
  .connect(process.env.DB_LOCATION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

server.use(express.json());
server.use(cors());

// Import route files
const appsRoutes = require('./routes/apps');
const launchRoutes = require('./routes/launch');

// Use route files
server.use('/api/apps', appsRoutes);
server.use('/api/launch', launchRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
