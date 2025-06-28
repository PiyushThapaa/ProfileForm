import { useEffect, useState } from "react";
import "../styles/updateform.css"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const UpdateForm = () => {
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passcolor, setPasscolor] = useState("red");
  const [passmessage, setPassmessage] = useState("");
  const [passshow, setPassshow] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    (!newPassword) ? setPassshow(false) : setPassshow(true)
    if (newPassword.length < 9) {
      setPassmessage("Password should have atleast 9 characters");
      return setPasscolor("red")
    }
    if (!/\d/.test(newPassword)) {
      setPassmessage("Password should have atleast 1 number");
      return setPasscolor("red")
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      setPassmessage("Password should have contain atleast  one special character");
      return setPasscolor("red")
    }
    setPassmessage("Password is strong")
    setPasscolor("green")
  }, [newPassword])

  function updatepass() {
    if (passcolor=="red") return toast.error(passmessage)
    if (!username || !currentPassword) return toast.error("Fill the entire form")
    fetch("http://localhost:3000/api/updatepass", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        currentpass: currentPassword,
        newpass: newPassword
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        data.success ? toast.success(data.message) : toast.error(data.message)
        data.message == "Password is changed" ? Navigate("/") : null
      })
      .catch(err => toast.error(err.message))
  }

  return (
    <div className="form-container">
      <h2>Password Update Form</h2>
      <div className="container" >
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
        {passshow && <p style={{color:passcolor,marginTop:-7}}>{passmessage}</p>}
        <button type="submit" onClick={updatepass}>Update Password</button>
        <button type="button" className="secondary" onClick={() => Navigate("/")}>
          Profile Form
        </button>
      </div>
    </div>
  );
}