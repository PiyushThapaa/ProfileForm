import React, { useContext, useState } from "react";
import "../styles/form2.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../App";

export const Form2 = () => {
    const {profession, setProfession, companyName, setCompanyName, address, setAddress} = useContext(Context)

    const Navigate = useNavigate();

    function clickNext() {
        if (!profession || !address) {
            return toast.error("Please fill the entire form")
        }
        if (profession == "entrepreneur") {
            if (!companyName) {
                return toast.error("Please enter the Company name")
            }
        }
        Navigate("/final")
    }

    return (
        <div className="form-container">
            <h2>Professional Details</h2>
            <div className="container">
                <label>
                    Profession:
                    <select
                        value={profession}
                        onChange={(e) => setProfession(e.target.value)}
                        required
                    >
                        <option value="">Select Profession</option>
                        <option value="Student">Student</option>
                        <option value="Developer">Developer</option>
                        <option value="Entrepreneur">Entrepreneur</option>
                    </select>
                </label>

                {profession === "Entrepreneur" && (
                    <label>
                        Company Name:
                        <input
                            type="text"
                            value={companyName}
                            placeholder="Enter your company name"
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                        />
                    </label>
                )}

                <label>
                    Address Line 1:
                    <input
                        type="text"
                        value={address}
                        placeholder="Enter address"
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </label>

                <button type="submit" onClick={clickNext}>Next</button>
            </div>
        </div>
    );
}