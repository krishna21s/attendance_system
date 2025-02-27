import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentAttendance = () => {
  const { subjectId, sectionId } = useParams();
  const [students, setStudents] = useState([]);
  const [subjectInfo, setSubjectInfo] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          `http://localhost/hackhub/get_students_attendance.php?subject_id=${subjectId}&section_id=${sectionId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json(); // ✅ Read JSON only once
        console.log("API Response:", data); // ✅ Log after parsing

        if (data.error) {
          throw new Error(data.error);
        }

        setSubjectInfo({
          subjectName: data.subject_name,
          semester: data.semester,
          branch: data.branch_name,
          section: data.section_name,
        });
        setStudents(data.students);
      } catch (err) {
        setError(`Failed to load student data: ${err.message}`);
      }
    };

    fetchStudents();
  }, [subjectId, sectionId]);

  return (
    <div className="container mt-3">
      {/* ✅ Top Navigation Bar */}
      <nav className="navbar navbar-light bg-primary text-white p-3">
        <span className="navbar-brand text-white">GMRIT</span>
        {subjectInfo && (
          <span className="navbar-text">
            {subjectInfo.subjectName} - {subjectInfo.branch}, Sem {subjectInfo.semester}, Section {subjectInfo.section}
          </span>
        )}
        <button className="btn btn-light">Mark Attendance</button>
      </nav>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {/* ✅ Student List */}
      <div className="card p-4 mt-3">
        <h2 className="text-dark">Students</h2>
        {students.length > 0 ? (
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Profile</th>
                <th>Name</th>
                <th>JNTU No</th>
                <th>Attendance %</th>
                <th>Action</th> {/* ✅ Edit Button for Next Step */}
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={student.profile_photo}
                      alt="Profile"
                      className="rounded-circle"
                      width="40"
                      height="40"
                    />
                  </td>
                  <td>{student.name}</td>
                  <td>{student.jntu_no}</td>
                  <td>{student.attendance_percentage}%</td>
                  <td>
                    <button className="btn btn-warning btn-sm">Edit</button> {/* ✅ Next Step */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-danger">No students found for this subject.</p>
        )}
      </div>
    </div>
  );
};

export default StudentAttendance;