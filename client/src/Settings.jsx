import { useState } from "react";
import "./Settings.css"; // Import the CSS file for the form styles

const SettingsForm = ({ addNewApp }) => {
  const [formData, setFormData] = useState({
    name: "",
    path: "",
    parameter: "",
    iconUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addNewApp(formData);

    setFormData({
      name: "",
      path: "",
      parameter: "",
      iconUrl: "",
    });
  };

  return (
    <form className="app-form" onSubmit={handleSubmit}>
      <label className="form-label">
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label className="form-label">
        Path:
        <input
          type="text"
          name="path"
          value={formData.path}
          onChange={handleChange}
          required
        />
      </label>
      <label className="form-label">
        Parameter:
        <input
          type="text"
          name="parameter"
          value={formData.parameter}
          onChange={handleChange}
        />
      </label>
      <label className="form-label">
        Icon URL:
        <input
          type="text"
          name="iconUrl"
          value={formData.iconUrl}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit" className="form-button">
        Add App
      </button>
    </form>
  );
};

export default SettingsForm;
