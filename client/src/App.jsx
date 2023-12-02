import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:2354/api/apps');
        setApps(response.data);
      } catch (error) {
        console.error('Error fetching apps:', error);
      }
    };

    fetchData();
  }, []);

  const launchApp = async (path, parameter) => {
    setLoading(true);

    try {
      // Simulate a loading delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const response = await axios.post('http://localhost:2354/api/launch', { path, parameter });
      console.log(response.data);
    } catch (error) {
      console.error('Error launching app:', error);
    } finally {
      setLoading(false);
      setSelectedApp(null);
    }
  };

  const handleAppClick = async (app) => {
    setSelectedApp(app);
    await launchApp(app.path, app.parameter);
  };

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  const handleHomeClick = () => {
    setShowSettings(false);
  };

  const handleAddApp = (selectedFile) => {
    // Add logic for adding an app
  };

  const handleRemoveApp = (appId) => {
    // Add logic for removing an app
  };

  return (
    <div className="app-container">
      <h1>{loading ? 'Loading...' : ''}</h1>
      {loading ? (
        <div className="loading-screen">
          <p>Loading...</p>
          <button onClick={handleHomeClick}>Home</button>
        </div>
      ) : showSettings ? (
        <div className="settings-page">
          
          <button onClick={handleHomeClick}>Home</button>
        </div>
      ) : (
        <div className="app-list">
          <button onClick={handleSettingsClick}>Settings</button>
          {apps.map(app => (
            <div key={app._id} className="app-item" onClick={() => handleAppClick(app)}>
              <img src={app.iconUrl} alt={app.name} className="app-icon" />
              <p className="app-name">{app.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
