import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [newAppName, setNewAppName] = useState("");
  const [configFile, setConfigFile] = useState(null);

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

  const handleAddApp = async () => {
    try {
      if (!configFile) {
        // Display an error message or prevent the submission
        console.error("Please select a config file.");
        return;
      }

      const formData = new FormData();
      formData.append("name", newAppName);
      formData.append("configFile", configFile);

      const response = await axios.post(
        "http://localhost:2354/api/apps",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update the apps state with the new app
      setApps((prevApps) => [...prevApps, response.data]);

      // Clear the form inputs
      setNewAppName("");
      setConfigFile(null);

      // Go back to home screen after adding an app
      setShowSettings(false);
    } catch (error) {
      console.error("Error adding app:", error);
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

  const handleFileChange = (event) => {
    // Handle file input change
    const file = event.target.files[0];
    setConfigFile(file);
  };

  return (
    <div className="app-container">
      <h1>{loading ? "Loading..." : ""}</h1>
      {loading ? (
        <div className="loading-screen">
          <p>Loading...</p>
          <button onClick={handleHomeClick}>Home</button>
        </div>
      ) : showSettings ? (
        <div className="settings-page">
          <h2>Add New App</h2>
          <form>
            <label>
              Application Name:
              <input
                type="text"
                value={newAppName}
                onChange={(e) => setNewAppName(e.target.value)}
              />
            </label>
            <label>
              Config File:
              <input type="file" onChange={handleFileChange} />
            </label>
            <button type="button" onClick={handleAddApp}>
              Add App
            </button>
          </form>
          <button onClick={handleHomeClick}>Home</button>
        </div>
      ) : (
        <div className="app-list">
          <button onClick={handleSettingsClick}>Settings</button>
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
        </div>
      )}
    </div>
  );
};

export default App;