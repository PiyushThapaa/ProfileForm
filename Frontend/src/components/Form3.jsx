import React, {useContext, useEffect, useState } from "react";
import "../styles/form3.css";
import toast from "react-hot-toast";
import { Context } from "../App";
import { useNavigate } from "react-router-dom";

export const Form3 = () => {
    const Navigate = useNavigate()
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
  
    const {selectedCountry, setSelectedCountry, selectedState, setSelectedState, selectedCity, setSelectedCity, plan, setPlan, newsletter, setNewsletter } = useContext(Context)

    function checkReview(){
        if (!selectedCountry || !selectedState || !selectedCity) {
            return toast.error("Please fill the entire form")
        }
        Navigate("/review")
    }
  
    // Fetch countries
    useEffect(() => {
      fetch("https://countriesnow.space/api/v0.1/countries/positions")
        .then((res) => res.json())
        .then((data) => setCountries(data.data.map(item => item.name)));
    }, []);
  
    // Fetch states based on selected country
    useEffect(() => {
      if (selectedCountry) {
        fetch("https://countriesnow.space/api/v0.1/countries/states", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: selectedCountry }),
        })
          .then((res) => res.json())
          .then((data) => setStates(data.data.states.map((s) => s.name)));
      } else {
        setStates([]);
      }
      setSelectedState("");
      setCities([]);
    }, [selectedCountry]);
  
    // Fetch cities based on selected state
    useEffect(() => {
      if (selectedCountry && selectedState) {
        fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: selectedCountry, state: selectedState }),
        })
          .then((res) => res.json())
          .then((data) => setCities(data.data));
      } else {
        setCities([]);
      }
      setSelectedCity("");
    }, [selectedState]);
  
    return (
      <div className="form-container">
        <h2>Preference Details</h2>
        <div className="container">
          <label>
            Country:
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              required
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country}>{country}</option>
              ))}
            </select>
          </label>
  
          <label>
            State:
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              required
              disabled={!states.length}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state}>{state}</option>
              ))}
            </select>
          </label>
  
          <label>
            City:
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              required
              disabled={!cities.length}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city}>{city}</option>
              ))}
            </select>
          </label>
  
          <fieldset className="radio-group">
            <legend>Subscription Plan:</legend>
            <label>
              <input
                type="radio"
                value="Basic"
                checked={plan === "Basic"}
                onChange={(e) => setPlan(e.target.value)}
              />
              Basic
            </label>
            <label>
              <input
                type="radio"
                value="Pro"
                checked={plan === "Pro"}
                onChange={(e) => setPlan(e.target.value)}
              />
              Pro
            </label>
            <label>
              <input
                type="radio"
                value="Enterprise"
                checked={plan === "Enterprise"}
                onChange={(e) => setPlan(e.target.value)}
              />
              Enterprise
            </label>
          </fieldset>
  
          <label className="checkbox-group">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={() => setNewsletter(!newsletter)}
            />
            Subscribe to newsletter
          </label>
  
          <button type="submit" onClick={checkReview}>Review</button>
        </div>
      </div>
    );
  }