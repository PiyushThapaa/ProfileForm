import React, { useContext } from "react";
import "../styles/review.css";
import { Context } from "../App";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const ReviewPage = () => {
  const { username, password, validDob, photo, validGender, profession, companyName, address, selectedCountry, selectedCity, selectedState, plan, newsletter } = useContext(Context)

  const Navigate = useNavigate()

  function submit() {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("dob", validDob);
    formData.append("photo", photo); 
    formData.append("gender", validGender);
    formData.append("profession", profession);
    formData.append("companyname", companyName);
    formData.append("address", address);
    formData.append("city", selectedCity);
    formData.append("state", selectedState);
    formData.append("country", selectedCountry);
    formData.append("subscription", plan);
    formData.append("newsletter", newsletter);
  
    fetch("http://localhost:3000/api/profile", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        data.success ? toast.success(data.message) : toast.error(data.message);
        data.message == "Profile created" ? Navigate("/") : null
        window.location.reload()
      })
      .catch((err) => toast.error(err.message));

  }
  

  const imageUrl = photo ? URL.createObjectURL(photo) : null;
  return (
    <div className="review-container">
      <h2>Review Your Profile</h2>
      <div className="review-card">

        {photo && (
          <div className="image-preview">
            <img src={imageUrl} alt="Profile" />
          </div>
        )}

        <div className="review-field"><strong>Username:</strong> {username}</div>
        <div className="review-field"><strong>Password:</strong> {password}</div>
        <div className="review-field"><strong>Gender:</strong> {validGender}</div>
        <div className="review-field"><strong>Date of Birth:</strong> {validDob}</div>
        <div className="review-field"><strong>Profession:</strong> {profession}</div>

        {profession === "Entrepreneur" && (
          <div className="review-field"><strong>Company Name:</strong> {companyName}</div>
        )}

        <div className="review-field"><strong>Address Line 1:</strong> {address}</div>
        <div className="review-field"><strong>Country:</strong> {selectedCountry}</div>
        <div className="review-field"><strong>State:</strong> {selectedState}</div>
        <div className="review-field"><strong>City:</strong> {selectedCity}</div>
        <div className="review-field"><strong>Subscription Plan:</strong> {plan}</div>
        <div className="review-field">
          <strong>Newsletter:</strong> {newsletter ? "Yes" : "No"}
        </div>
        <button type="button" onClick={submit}>Submit</button>
      </div>
    </div>
  );
}
