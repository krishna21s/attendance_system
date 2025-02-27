import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const FacultyRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [branchId, setBranchId] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchSubjects();
    fetchSections();
  }, []);

  // Fetch Subjects
  const fetchSubjects = async () => {
    try {
      const response = await fetch("http://localhost/hackhub/get_subjects.php");
      console.log(response)
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setSubjects(data.subjects);
    } catch (err) {
      console.error(err);
      setError("Failed to load subjects.");
    }
  };

  // Fetch Sections
  const fetchSections = async () => {
    try {
      const response = await fetch("http://localhost/hackhub/get_sections.php");
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setSections(data.sections);
    } catch (err) {
      console.error(err);
      setError("Failed to load sections.");
    }
  };

  // Handle Faculty Registration
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !branchId || selectedSubjects.length === 0 || !selectedSection) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost/hackhub/register_faculty.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, branchId, selectedSubjects, selectedSection }),
      });

      const result = await response.json();
      if (result.success) {
        setSuccess("Faculty registered successfully!");
        setError(null);
        setName("");
        setEmail("");
        setPassword("");
        setBranchId("");
        setSelectedSubjects([]);
        setSelectedSection("");
      } else {
        setError(result.error || "Failed to register.");
      }
    } catch (error) {
      console.error("Error registering faculty:", error);
      setError("Failed to register.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-center text-primary">Faculty Registration</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleRegister} className="card p-4 shadow">
        <div className="form-group">
          <label>Name:</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="form-group mt-3">
          <label>Email:</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="form-group mt-3">
          <label>Password:</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <div className="form-group mt-3">
          <label>Branch:</label>
          <select className="form-control" value={branchId} onChange={(e) => setBranchId(e.target.value)} required>
            <option value="">Select Branch</option>
            <option value="1">CSE</option>
            <option value="2">IT</option>
          </select>
        </div>

        <div className="form-group mt-3">
          <label>Subjects:</label>
          <select multiple className="form-control" value={selectedSubjects} onChange={(e) => setSelectedSubjects([...e.target.selectedOptions].map(option => option.value))} required>
            {subjects.map((subject) => (
              <option key={subject.subject_id} value={subject.subject_id}>{subject.subject_name}</option>
            ))}
          </select>
        </div>

        <div className="form-group mt-3">
          <label>Section:</label>
          <select className="form-control" value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} required>
            <option value="">Select Section</option>
            {sections.map((section) => (
              <option key={section.section_id} value={section.section_id}>{section.section_name}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary mt-4 w-100">Register Faculty</button>
      </form>
    </div>
  );
};

export default FacultyRegister;
