import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [userType, setUserType] = useState("student");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost/hackhub/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userType, identifier, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const text = await response.text();
      console.log("API Response:", text);

      const data = JSON.parse(text);
      if (data.error) {
        throw new Error(data.error);
      }

      // ✅ Navigate and Pass Data as State
      if (userType === "student") {
        navigate("/student-dashboard", { state: { jntu_no: data.identifier, userType } });
      } else {
        navigate("/faculty-dashboard", { state: { faculty_id: data.identifier, userType } });
      }
    } catch (err) {
      console.error("Login Error:", err.message);
      setError(err.message);
    }
  };

  return (
    <div
      className="login-main d-flex flex-column flex-md-row align-items-center justify-content-center vh-100"
      style={{
        backgroundImage: "url(https://gmrit.edu.in/images/blocks/Landing.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "darken",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      }}
    >
      <div className="d-none d-md-block w-50 text-center text-light p-4">
        <h1 className="fw-bold text-shadow-lg">Welcome to GMRIT</h1>
        <h3 className="fw-light text-shadow-lg">Face Recognition Attendance System</h3>
      </div>
      <div className="w-100 w-md-50 d-flex justify-content-center">
        <div className="login-box bg-light p-4 rounded shadow" style={{ maxWidth: "400px", width: "100%" }}>
          <div>
            <img src="https://image3.mouthshut.com/images/imagesp/925718446s.png" alt="" style={{ width: "130px", marginBottom: "10px" }} />
          </div>
          <div className="d-flex justify-content-between gap-3 w-100 py-3">
            <div
              className={`w-100 text-center rounded p-2 text-light ${userType === "student" ? "bg-dark" : "bg-secondary"}`}
              style={{ fontSize: "1rem", cursor: "pointer" }}
              onClick={() => setUserType("student")}
            >
              STUDENT
            </div>
            <div
              className={`w-100 text-center rounded p-2 text-light ${userType === "faculty" ? "bg-dark" : "bg-secondary"}`}
              style={{ fontSize: "1rem", cursor: "pointer" }}
              onClick={() => setUserType("faculty")}
            >
              FACULTY
            </div>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <form className="d-flex flex-column" onSubmit={handleLogin}>
            <input
              type="text"
              name="identifier"
              placeholder={userType === "student" ? "Enter JNTU Number" : "Enter Faculty ID"}
              className="w-100 login-inputs mb-2 p-2 rounded border"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="w-100 login-inputs mb-2 p-2 rounded border"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="w-100 btn btn-primary" style={{ fontSize: "1rem" }}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
