import React, { useContext } from "react";
import "../styles/review.css";

export const ReviewPage = ({ username, password, validDob, photo, validGender, profession, companyName, address, selectedCountry, selectedCity, selectedState, plan, newsletter }) => {
  return (
    <div className="review-container">
      <h2>Review Your Profile</h2>
      <div className="review-card">

        {photo && (
          <div className="image-preview">
            <img src={userData.photo} alt="Profile" />
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
      </div>
    </div>
  );
}
