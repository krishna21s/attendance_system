import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const FacultyDashboard = () => {
  const [faculty, setFaculty] = useState(null);
  const [timetable, setTimetable] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ✅ Retrieve faculty_id from localStorage
  const facultyId = localStorage.getItem("faculty_id");

  useEffect(() => {
    if (!facultyId) {
      navigate("/login");
      return;
    }

    const fetchFacultyData = async () => {
      try {
        const response = await fetch(`http://localhost/hackhub/faculty_timetable.php?faculty_id=${facultyId}`);

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const text = await response.text();
        console.log(text);

        try {
          const data = JSON.parse(text);
          if (data.error) {
            throw new Error(data.error);
          }

          // ✅ Ensure faculty details are set correctly
          setFaculty({
            name: data.faculty_name || "Unknown",
            branch: data.faculty_branch || "N/A",
          });

          setTimetable(data.timetable);
        } catch (jsonError) {
          throw new Error("Invalid JSON response from server");
        }
      } catch (err) {
        setError(`Failed to load faculty data: ${err.message}`);
      }
    };

    fetchFacultyData();
  }, [facultyId, navigate]);

  return (
    <div className="container mt-5" style={{ backgroundColor: "#F0F4FA", padding: "20px", borderRadius: "10px" }}>
      <h1 className="text-center text-primary">Faculty Dashboard</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      {faculty ? (
        <div className="card p-4 mb-4 shadow" style={{ backgroundColor: "#ADB4BF" }}>
          <h3 className="text-white">Welcome, {faculty.name}</h3>
          <p className="text-white">Department: {faculty.branch}</p>
        </div>
      ) : (
        <p className="text-danger">Loading faculty details...</p>
      )}

      {/* ✅ Timetable */}
      <div className="card p-4 shadow">
        <h2 className="text-dark">Your Timetable (Across Branches & Semesters)</h2>
        {timetable.length > 0 ? (
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Day</th>
                <th>Period</th>
                <th>Subject</th>
                <th>Semester</th>
                <th>Section</th>
                <th>Branch</th>
                <th>Action</th> {/* ✅ Open Button */}
              </tr>
            </thead>
            <tbody>
              {timetable.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.day_of_week}</td>
                  <td>{entry.period_start} - {entry.period_end}</td>
                  <td>{entry.subject_name}</td>
                  <td>{entry.semester}</td>
                  <td>Section {entry.section_name}</td>
                  <td>{entry.branch_name}</td>
                  <td>
                    {/* ✅ Open Button - Navigate to StudentAttendance */}
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => navigate(`/attendance/${entry.subject_id}/${entry.section_id}`)}
                    >
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-danger">No timetable assigned yet.</p>
        )}
      </div>
    </div>
  );
};

export default FacultyDashboard;
