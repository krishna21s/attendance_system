import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Presenties = () => {
  const { subjectId, sectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const subjectInfo = location.state?.subjectInfo || {};

  const [recognizedStudents, setRecognizedStudents] = useState([]); // 🔹 Live attendance (left table)
  const [attendanceRecords, setAttendanceRecords] = useState({}); // 🔹 Marked attendance (right table)
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecognizedFaces = async () => {
      try {
        const response = await fetch("http://localhost/hackhub/get_live_attendance.php");
        if (!response.ok) throw new Error("Failed to recognize faces.");

        const data = await response.json();
        console.log("Live Attendance:", data);

        if (data.faces) {
          setRecognizedStudents(data.faces); // 🔹 Live data (without storing)

          // ✅ Auto-mark Present (only once per student)
          setAttendanceRecords(prevRecords => {
            const updatedRecords = { ...prevRecords };
            data.faces.forEach(student => {
              if (!(student.jntu_no in updatedRecords)) {
                updatedRecords[student.jntu_no] = "Present"; // Auto mark as Present
              }
            });
            return updatedRecords;
          });
        }
      } catch (err) {
        setError(err.message);
      }
    };

    const interval = setInterval(fetchRecognizedFaces, 5000); // 🔄 Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // ✅ Manually edit attendance
  const handleStatusChange = (jntu_no, newStatus) => {
    setAttendanceRecords(prevRecords => ({
      ...prevRecords,
      [jntu_no]: newStatus
    }));
  };

  // ✅ Finish & send attendance data to StudentAttendance.jsx
  const finishAttendance = () => {
    console.log("Final Attendance:", attendanceRecords);
    navigate(`/attendance/${subjectId}/${sectionId}`, { state: { attendanceRecords } });
  };

  return (
    <div className="container mt-3">
      <nav className="navbar navbar-light bg-primary text-white p-3">
        <span className="navbar-brand text-white">GMRIT</span>
        <span className="navbar-text text-light">
          {subjectInfo.subjectName} - {subjectInfo.branch}, Sem {subjectInfo.semester}, Section {subjectInfo.section}
        </span>
      </nav>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      <div className="row mt-3">
        {/* ✅ Left: Live Recognized Faces (Does NOT store) */}
        <div className="col-md-6">
          <div className="card p-4">
            <h2 className="text-dark">Live Attendance</h2>
            {recognizedStudents.length > 0 ? (
              <table className="table table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th>JNTU No</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {recognizedStudents.map((student, index) => (
                    <tr key={index}>
                      <td>{student.jntu_no}</td>
                      <td>{student.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-danger">No students detected.</p>
            )}
          </div>
        </div>

        {/* ✅ Right: Marked Attendance (Stores Only Marked) */}
        <div className="col-md-6">
          <div className="card p-4">
            <h2 className="text-dark">Mark Attendance</h2>
            {Object.keys(attendanceRecords).length > 0 ? (
              <table className="table table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th>JNTU No</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(attendanceRecords).map(([jntu_no, status], index) => (
                    <tr key={index}>
                      <td>{jntu_no}</td>
                      <td>
                        <select
                          className="form-control"
                          value={status}
                          onChange={(e) => handleStatusChange(jntu_no, e.target.value)}
                        >
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                          <option value="Pending">Pending</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-danger">No attendance records yet.</p>
            )}
          </div>
        </div>
      </div>

      <button className="btn btn-success mt-3" onClick={finishAttendance}>
        Finish Attendance
      </button>
    </div>
  );
};

export default Presenties;
