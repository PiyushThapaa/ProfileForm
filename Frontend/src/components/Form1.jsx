import React, { useContext, useEffect, useState } from "react";
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
  const [show,setShow] = useState(false);
  const [message,setMessage] = useState("");
  const [color,setColor] = useState("red");
  const [passcolor,setPasscolor] = useState("red");
  const [passmessage,setPassmessage] = useState("");
  const [passshow,setPassshow] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const Navigate = useNavigate();

  function clickNext() {
    if (username.includes(" ")) return toast.error("Username should not have spaces")
    if (color=="red") return toast.error(message) 
    if (passcolor=="red") return toast.error(passmessage) 
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
    setValidDob(updatedDob.toLocaleDateString())
    setValidGender(selectedGender)
    Navigate("/next")
  }

  useEffect(()=>{
    fetch("http://localhost:3000/api/username", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
        (data.success) ? setColor("green") : setColor("red")
      });
       (!username) ? setShow(false) : setShow(true)
    },[username])

    useEffect(()=>{
      (!password) ? setPassshow(false) : setPassshow(true)
      if (password.length < 9) {
        setPassmessage("Password should have atleast 9 characters");
        return setPasscolor("red")
      }
      if (!/\d/.test(password)) {
      setPassmessage("Password should have atleast 1 number");
       return setPasscolor("red")
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        setPassmessage("Password should have contain atleast  one special character");
        return setPasscolor("red")
      }
      setPassmessage("Password is strong")
      setPasscolor("green")
    },[password])

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
          {show && <p style={{color:color,marginTop:-7}}>{message}</p>}
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
          {passshow && <p style={{color:passcolor,marginTop:-7}}>{passmessage}</p>}
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

