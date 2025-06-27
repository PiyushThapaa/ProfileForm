import { useState } from "react";
import "../styles/updateform.css"
import { useNavigate } from "react-router-dom";

export const UpdateForm = () => {
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const Navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Username: ${username}\nCurrent: ${currentPassword}\nNew: ${newPassword}`);
  };

  const handleProfileClick = () => {
    alert("Redirecting to Profile Form..."); // You can replace this with navigation logic
  };

  return (
    <div className="form-container">
      <h2>Password Update Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label>
          Current Password:
          <input
            type="password"
            value={currentPassword}
            placeholder="Enter current password"
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </label>

        <label>
          New Password:
          <input
            type="password"
            value={newPassword}
            placeholder="Enter new password"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit">Update Password</button>
        <button type="button" className="secondary" onClick={()=>Navigate("/")}>
          Profile Form
        </button>
      </form>
    </div>
  );
}