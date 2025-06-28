import { Toaster } from "react-hot-toast"
import { Form1 } from "./components/Form1";
import { Form2 } from "./components/Form2";
import { Form3 } from "./components/Form3";
import { UpdateForm } from "./components/UpdatePass";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ReviewPage } from "./components/Review";
import { createContext, useState } from "react";

export const Context = createContext(null)

function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validDob, setValidDob] = useState("");
  const [photo, setPhoto] = useState(null);
  const [validGender, setValidGender] = useState("");
  const [profession, setProfession] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [plan, setPlan] = useState("Basic");
  const [newsletter, setNewsletter] = useState(true);

  return (
    <Context.Provider value={{ username, password, validDob, photo, validGender, profession, companyName, address, selectedCountry, selectedCity, selectedState, plan, newsletter,setAddress,setSelectedCity,setSelectedCountry,setSelectedState,setCompanyName,setNewsletter,setPassword,setPhoto,setUsername,setValidDob,setValidGender,setProfession,setPlan }}>
      <div>
        <Toaster />
        <center><h1>Profile Update Form</h1></center>
        <Router>
          <Routes>
            <Route path='/' element={<Form1 />} />
            <Route path='/next' element={<Form2 />} />
            <Route path='/final' element={<Form3 />} />
            <Route path='/review' element={<ReviewPage />} />
            <Route path='/updatepass' element={<UpdateForm />} />
          </Routes>
        </Router>
      </div>
    </Context.Provider>
  )
}

export default App
