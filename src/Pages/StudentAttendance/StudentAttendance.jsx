import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentAttendance = () => {
  const { subjectId, sectionId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [subjectInfo, setSubjectInfo] = useState(null);
  const [error, setError] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [newAttendance, setNewAttendance] = useState({});

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          `http://localhost/hackhub/get_students_attendance.php?subject_id=${subjectId}&section_id=${sectionId}`
        );
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const data = await response.json();
        console.log("API Response:", data);

        if (data.error) throw new Error(data.error);

        setSubjectInfo({
          subjectName: data.subject_name,
          semester: data.semester,
          branch: data.branch_name,
          section: data.section_name,
        });

        let updatedStudents = data.students;

        // ✅ Update attendance if markedPresent is received from Presenties
        if (location.state?.attendanceRecords) {
          updatedStudents = updatedStudents.map((student) => {
            if (location.state.attendanceRecords[student.jntu_no] === "Present") {
              return { ...student, attendance_percentage: Math.min(student.attendance_percentage + 10, 100) };
            }
            return student;
          });
        }

        setStudents(updatedStudents);
      } catch (err) {
        setError(`Failed to load student data: ${err.message}`);
      }
    };

    fetchStudents();
  }, [subjectId, sectionId, location.state]);

  // ✅ Handle Edit Click
  const handleEditClick = (student) => {
    setEditingStudent(student.jntu_no);
    setNewAttendance({ ...newAttendance, [student.jntu_no]: student.attendance_percentage });
  };

  // ✅ Handle Attendance Input Change
  const handleAttendanceChange = (jntu_no, value) => {
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setNewAttendance({ ...newAttendance, [jntu_no]: value });
    }
  };

  // ✅ Save Updated Attendance
  const saveAttendance = (jntu_no) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.jntu_no === jntu_no ? { ...student, attendance_percentage: newAttendance[jntu_no] } : student
      )
    );
    setEditingStudent(null);
  };

  return (
    <div className="container mt-3">
      {/* ✅ Navigation Bar */}
      <nav className="navbar navbar-light bg-primary text-white p-3">
        <span className="navbar-brand text-white">GMRIT</span>
        {subjectInfo && (
          <span className="navbar-text text-light">
            {subjectInfo.subjectName} - {subjectInfo.branch}, Sem {subjectInfo.semester}, Section {subjectInfo.section}
          </span>
        )}
        {/* ✅ Mark Attendance Button */}
        <button
          className="btn btn-light"
          onClick={() => navigate(`/presenties/${subjectId}/${sectionId}`, { state: { subjectInfo } })}
        >
          Mark Attendance
        </button>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td>
                    <img src={student.profile_photo} alt="Profile" className="rounded-circle" width="40" height="40" />
                  </td>
                  <td>{student.name}</td>
                  <td>{student.jntu_no}</td>
                  <td>
                    {editingStudent === student.jntu_no ? (
                      <input
                        type="number"
                        className="form-control"
                        value={newAttendance[student.jntu_no]}
                        onChange={(e) => handleAttendanceChange(student.jntu_no, parseInt(e.target.value))}
                      />
                    ) : (
                      `${student.attendance_percentage}%`
                    )}
                  </td>
                  <td>
                    {editingStudent === student.jntu_no ? (
                      <button className="btn btn-success btn-sm" onClick={() => saveAttendance(student.jntu_no)}>
                        Save
                      </button>
                    ) : (
                      <button className="btn btn-warning btn-sm" onClick={() => handleEditClick(student)}>
                        Edit
                      </button>
                    )}
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
