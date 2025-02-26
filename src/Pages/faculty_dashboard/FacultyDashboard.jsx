import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap for styling

const FacultyDashboard = () => {
  const [faculty, setFaculty] = useState(null);
  const [timetable, setTimetable] = useState([]);
  const [error, setError] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [extraClassTime, setExtraClassTime] = useState("");

  // Fetch faculty details & assigned timetable
  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        const response = await fetch("http://localhost/hackhub/faculty_timetable.php");
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        setFaculty(data.faculty);
        setTimetable(data.timetable);
      } catch (err) {
        setError("Failed to load faculty data.");
        console.error(err);
      }
    };

    fetchFacultyData();
  }, []);

  // Mark Attendance for a Selected Period
  const markAttendance = async (subjectId, sectionId) => {
    try {
      const response = await fetch("http://localhost/hackhub/mark_attendance.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject_id: subjectId, section_id: sectionId }),
      });

      const result = await response.json();
      if (result.success) {
        alert("Attendance marked successfully!");
      } else {
        alert("Failed to mark attendance.");
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };

  // Schedule Extra Class
  const scheduleExtraClass = async () => {
    if (!selectedSubject || !selectedSection || !extraClassTime) {
      alert("Please select a subject, section, and time.");
      return;
    }

    try {
      const response = await fetch("http://localhost/hackhub/schedule_extra_class.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          faculty_id: faculty.faculty_id,
          subject_id: selectedSubject,
          section_id: selectedSection,
          extra_time: extraClassTime,
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert("Extra class scheduled successfully!");
      } else {
        alert("Failed to schedule extra class.");
      }
    } catch (error) {
      console.error("Error scheduling extra class:", error);
    }
  };

  return (
    <div className="container mt-5" style={{ backgroundColor: "#F0F4FA", padding: "20px", borderRadius: "10px" }}>
      <h1 className="text-center text-primary">Faculty Dashboard</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Faculty Info */}
      {faculty && (
        <div className="card p-4 mb-4 shadow" style={{ backgroundColor: "#ADB4BF" }}>
          <h3 className="text-white">Welcome, {faculty.name}</h3>
          <p className="text-white">Department: {faculty.branch}</p>
        </div>
      )}

      {/* Timetable */}
      <div className="card p-4 shadow">
        <h2 className="text-dark">Your Timetable</h2>
        {timetable.length > 0 ? (
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Day</th>
                <th>Period</th>
                <th>Subject</th>
                <th>Section</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {timetable.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.day_of_week}</td>
                  <td>{entry.period_start} - {entry.period_end}</td>
                  <td>{entry.subject_name}</td>
                  <td>Section {entry.section_name}</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => markAttendance(entry.subject_id, entry.section_id)}
                    >
                      Mark Attendance
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

      {/* Schedule Extra Class */}
      <div className="card p-4 shadow mt-4">
        <h2 className="text-dark">Schedule Extra Class</h2>
        <div className="form-group">
          <label>Select Subject:</label>
          <select className="form-control" onChange={(e) => setSelectedSubject(e.target.value)}>
            <option value="">-- Select Subject --</option>
            {timetable.map((entry) => (
              <option key={entry.subject_id} value={entry.subject_id}>{entry.subject_name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Select Section:</label>
          <select className="form-control" onChange={(e) => setSelectedSection(e.target.value)}>
            <option value="">-- Select Section --</option>
            {timetable.map((entry) => (
              <option key={entry.section_id} value={entry.section_id}>Section {entry.section_name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Extra Class Time:</label>
          <input
            type="time"
            className="form-control"
            onChange={(e) => setExtraClassTime(e.target.value)}
          />
        </div>

        <button className="btn btn-primary mt-3" onClick={scheduleExtraClass}>
          Schedule Extra Class
        </button>
      </div>
    </div>
  );
};

export default FacultyDashboard;
