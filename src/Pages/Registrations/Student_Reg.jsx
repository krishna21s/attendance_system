import { useState } from "react";
import "./Student_Reg.css";

const Student_Reg = () => {
  const [formData, setFormData] = useState({
    name: "",
    jntu_no: "",
    mobile: "",
    branch: "",
    year: "",
    semester: "",
    section: "",
    password: "",
    profile_photo: null,
  });

  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, profile_photo: reader.result }); // Convert image to Base64
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Registering...");

    const response = await fetch("http://localhost:8000/store_face/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setMessage(data.message || "Registration failed!");
  };

  return (
    <div className="register-main">
      <div className="reg-nav">
        <center className="animate-text">REGISTRATIONS</center>
      </div>
      <div className="register-container">
        <div className="register-img">
          <img
            src="https://uploads-ssl.webflow.com/624ac40503a527cf47af4192/62fbc984af8f6670c9be15c0_facial-recognition.jpg"
            alt="Facial Recognition"
          />
        </div>
        <div className="register-form bg-secondary rounded-3 p-4">
          <form className="form-column" onSubmit={handleSubmit}>
            <div className="d-flex gap-2 my-2">
              <input type="text" className="form-control border rounded p-2" placeholder="Enter name" name="name" required onChange={handleInputChange} />
              <input type="text" className="form-control border rounded p-2" placeholder="Enter JNTU number" name="jntu_no" required onChange={handleInputChange} />
            </div>

            <input type="tel" className="form-control border rounded p-2 my-2" placeholder="Enter mobile number" name="mobile" required onChange={handleInputChange} />

            <div className="d-flex gap-2">
              <select className="form-control border rounded p-2 my-2" name="branch" required onChange={handleInputChange}>
                <option value="">--Branch--</option>
                <option value="CSE">CSE</option>
                <option value="AIML">AIML</option>
                <option value="AIDS">AIDS</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>
              </select>
              <select className="form-control border rounded p-2 my-2" name="year" required onChange={handleInputChange}>
                <option value="">--Year--</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            <div className="d-flex gap-2">
              <select className="form-control border rounded p-2 my-2" name="semester" required onChange={handleInputChange}>
                <option value="">--Semester--</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>

              <select className="form-control border rounded p-2 my-2" name="section" required onChange={handleInputChange}>
                <option value="">--Section--</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>

            <input type="password" className="form-control border rounded p-2 my-2" placeholder="Enter password" name="password" required onChange={handleInputChange} />

            <div className="file-upload text-light">
              <p>Upload Image</p>
              <input type="file" className="form-control border rounded p-2" required onChange={handleImageUpload} />
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-3">Register</button>
          </form>
          {message && <p className="mt-3 text-light">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Student_Reg;
