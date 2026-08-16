import React from "react";

const Settings = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Settings</h2>
      </div>

      <div className="card">
        <h3>Application Settings</h3>

        <div className="settings-section">
          <div className="setting-item">
            <label>
              Gym Name
            </label>
            <input
              type="text"
              placeholder="Enter gym name"
            />
          </div>

          <div className="setting-item">
            <label>
              WhatsApp Reminder
            </label>

            <select>
              <option value="enabled">
                Enabled
              </option>
              <option value="disabled">
                Disabled
              </option>
            </select>
          </div>

          <div className="setting-item">
            <label>
              Membership Expiry Alert (Days Before)
            </label>

            <input
              type="number"
              placeholder="7"
            />
          </div>

          <div className="setting-item">
            <label>
              Notifications
            </label>

            <select>
              <option value="enabled">
                Enabled
              </option>
              <option value="disabled">
                Disabled
              </option>
            </select>
          </div>
        </div>

        <button className="btn-primary">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;