import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap for styling

const FacultyDashboard = () => {
  const [faculty, setFaculty] = useState(null);
  const [timetable, setTimetable] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [error, setError] = useState(null);

  // Fetch faculty details & assigned timetable
  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        const response = await fetch("http://localhost/hackhub/faculty_timetable.php?faculty_id=2");
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

  // Fetch Attendance Records for Selected Subject
  const fetchAttendance = async (subjectId, sectionId) => {
    try {
      const response = await fetch(`http://localhost/hackhub/fetch_attendance.php?subject_id=${subjectId}&section_id=${sectionId}`);
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setAttendanceRecords(data.attendance);
    } catch (err) {
      console.error(err);
      setError("Failed to load attendance records.");
    }
  };

  // Mark Attendance for a Selected Period
  const markAttendance = async (subjectId, sectionId) => {
    try {
      const response = await fetch("http://localhost/hackhub/mark_attendance.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ faculty_id: faculty.faculty_id, subject_id: subjectId, section_id: sectionId }),
      });

      const result = await response.json();
      if (result.success) {
        alert("Attendance marked successfully!");
        fetchAttendance(subjectId, sectionId);
      } else {
        alert("Failed to mark attendance.");
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };

  // Update Attendance Manually
  const updateAttendance = async (attendanceId, status) => {
    try {
      const response = await fetch("http://localhost/hackhub/update_attendance.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attendance_id: attendanceId, status }),
      });

      const result = await response.json();
      if (result.success) {
        alert("Attendance updated!");
        fetchAttendance(selectedSubject, selectedSection);
      } else {
        alert("Failed to update attendance.");
      }
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  return (
    <div className="container mt-5" style={{ backgroundColor: "#F0F4FA", padding: "20px", borderRadius: "10px" }}>
      <h1 className="text-center text-primary">Faculty Dashboard</h1>

      {error && <div className="alert alert-danger">{error}</div>}

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
                    <button className="btn btn-success btn-sm" onClick={() => markAttendance(entry.subject_id, entry.section_id)}>
                      Mark Attendance
                    </button>
                    <button className="btn btn-info btn-sm ml-2" onClick={() => fetchAttendance(entry.subject_id, entry.section_id)}>
                      View Attendance
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

      {/* Attendance Records */}
      {attendanceRecords.length > 0 && (
        <div className="card p-4 shadow mt-4">
          <h2 className="text-dark">Attendance Records</h2>
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>JNTU No</th>
                <th>Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record) => (
                <tr key={record.attendance_id}>
                  <td>{record.jntu_no}</td>
                  <td>{record.name}</td>
                  <td>{record.status}</td>
                  <td>
                    <button className="btn btn-warning btn-sm" onClick={() => updateAttendance(record.attendance_id, "Present")}>
                      Mark Present
                    </button>
                    <button className="btn btn-danger btn-sm ml-2" onClick={() => updateAttendance(record.attendance_id, "Absent")}>
                      Mark Absent
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FacultyDashboard;
