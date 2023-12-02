import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:2354/api/apps')
      .then(response => setApps(response.data))
      .catch(error => console.error(error));
  }, []);

  const launchApp = async (path, parameter) => {
    setLoading(true);

    // Add a loading delay (e.g., 2 seconds) before launching the application
    await new Promise(resolve => setTimeout(resolve, 2000));

    axios.post('http://localhost:2354/api/launch', { path, parameter })
      .then(response => {
        console.log(response.data);
        setLoading(false);
        setSelectedApp(null);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
        setSelectedApp(null);
      });
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
    // Handle adding the selected application to the server
    // You might want to use FormData to send the file to the server
  };

  const handleRemoveApp = (appId) => {
    // Handle removing the application with the given appId from the server
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
        // Render your Settings page here, including file selection, add, and remove functionality
        // Don't forget to include a "Home" button to navigate back
        // You can use conditional rendering or create a separate component for the Settings page
        // Example: <Settings onAddApp={handleAddApp} onRemoveApp={handleRemoveApp} onHomeClick={handleHomeClick} />
        <div className="settings-page">
          {/* Your Settings page UI goes here */}
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

