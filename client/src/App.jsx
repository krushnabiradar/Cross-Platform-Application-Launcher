import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import SettingsForm from "./Settings";

const App = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:2354/api/apps");
        setApps(response.data);
      } catch (error) {
        console.error("Error fetching apps:", error);
      }
    };

    fetchData();
  }, []);

  const launchApp = async (path, parameter) => {
    setLoading(true);

    try {
      // Simulate a loading delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await axios.post("http://localhost:2354/api/launch", {
        path,
        parameter,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error launching app:", error);
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


  const handleAddNewApp = async (newAppData) => {
    try {
      const response = await axios.post(
        "http://localhost:2354/api/apps",
        newAppData
      );
      setApps((prevApps) => [...prevApps, response.data]);
      setShowSettings(false); // Hide the form after adding a new app
    } catch (error) {
      console.error("Error adding new app:", error);
    }
  };


  const handleRemoveApp = async (event, appId) => {
    event.stopPropagation(); // Prevent the click event from propagating

    try {
      await axios.delete(`http://localhost:2354/api/apps/${appId}`);

      // Update the apps state by removing the deleted app
      setApps((prevApps) => prevApps.filter((app) => app._id !== appId));
    } catch (error) {
      console.error("Error removing app:", error);
    }
  };

  return (
    <div className="app-container">
      {/* ... (existing code) */}
      <div className="app-list">
        {showSettings && (
          <div className="settings-page">
            <h2>Add New App</h2>
            <SettingsForm addNewApp={handleAddNewApp} />
            <button className="settings-button" onClick={handleHomeClick}>
              Home
            </button>
          </div>
        )}
        {!showSettings && (
          <>
            <button className="settings-button" onClick={handleSettingsClick}>
              Settings
            </button>
            {apps.map((app) => (
              <div
                key={app._id}
                className="app-item"
                onClick={() => handleAppClick(app)}
              >
                <img src={app.iconUrl} alt={app.name} className="app-icon" />
                <p className="app-name">{app.name}</p>
                <button onClick={(event) => handleRemoveApp(event, app._id)}>
                  Remove
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
export default App;
