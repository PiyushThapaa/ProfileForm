import React, { useContext, useState } from "react";
import "../styles/form1.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Context } from "../App";

export const Form1 = () => {
  const {username,password,setUsername,setValidDob,setValidGender,setPhoto,setPassword} = useContext(Context)
  const [preview, setPreview] = useState(null);
  const [otherGender, setOtherGender] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const Navigate = useNavigate();

  function clickNext() {
    let selectedGender = (gender == "other") ? otherGender : gender
    if (!username || !password || !dob || !selectedGender) {
      return toast.error("Please fill the entire form")
    }
    const updatedDob = new Date(dob);
    const today = new Date();
    // remove time part from today's date
    today.setHours(0, 0, 0, 0);

    if (updatedDob > today) {
      return toast.error("Please enter a valid DOB")
    }

    setValidDob(updatedDob)
    setValidGender(selectedGender)
    Navigate("/next")
  }

  return (
      <div className="form-container">
        <h2>Personal Details</h2>
        <div className="container">
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
            Date of Birth:
            <input
              type="date"
              value={dob}
              placeholder="Enter your DOB"
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              value={password}
              placeholder="Enter current password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <label>
            Gender:
            <div className="gender-options">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={gender === "other"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Other
              </label>
            </div>
          </label>

          {gender === "other" && (
            <label>
              Please specify:
              <input
                type="text"
                value={otherGender}
                placeholder="Enter your gender"
                onChange={(e) => setOtherGender(e.target.value)}
                required
              />
            </label>
          )}
          <label>
          Upload Photo:
          <input type="file" accept="image/jpg ,image/png" onChange={handlePhotoChange} />
        </label>

        {preview && (
          <div className="preview">
            <p>Live Preview:</p>
            <img src={preview} alt="Preview" />
          </div>
        )}
          <button type="button" onClick={clickNext}>Next</button>
          <button type="button" className="secondary-button" onClick={() => Navigate("/updatepass")}>Update Password</button>
        </div>
      </div>
  );
}

