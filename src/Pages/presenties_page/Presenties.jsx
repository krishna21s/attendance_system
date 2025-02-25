import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

function Presenties() {
  const [recognizedFaces, setRecognizedFaces] = useState([]); // Stores recognized faces
  const [presentiesList, setPresentiesList] = useState({}); // Stores attendance
  const [error, setError] = useState(null); // Error handling

  useEffect(() => {
    const fetchFaces = async () => {
      try {
        const response = await fetch("http://localhost/hackhub/face_recognition.php");
        const textData = await response.text();

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        // Parse PHP response (Expected format: "Recognized Faces: jntu_no1 - Name1, jntu_no2 - Name2")
        if (textData.includes("Recognized Faces:")) {
          const faceData = textData.replace("Recognized Faces: ", "").split(", ");
          const facesWithJNTUNo = faceData.map(entry => {
            const [jntu_no, name] = entry.split(" - "); // Expected format "jntu_no - Name"
            return { jntu_no: jntu_no, name: name };
          });

          setRecognizedFaces(facesWithJNTUNo);

          // Add new recognized faces to presentiesList (if not already marked)
          setPresentiesList((prevList) => {
            const updatedList = { ...prevList };
            facesWithJNTUNo.forEach(({ jntu_no, name }) => {
              if (!updatedList[jntu_no]) {
                updatedList[jntu_no] = { name, status: "Present" }; // Default status when recognized
              }
            });
            return updatedList;
          });

          setError(null); // Clear any previous error
        } else {
          setRecognizedFaces([]); // No faces recognized
        }
      } catch (err) {
        console.error("Error fetching recognized faces:", err);
        setError("Failed to load recognized faces. Please check the server.");
      }
    };

    // Auto-fetch every 2 seconds
    const interval = setInterval(fetchFaces, 2000);
    return () => clearInterval(interval);
  }, []);

  // Handle Manual Attendance Change
  const updateAttendance = (jntu_no, status) => {
    setPresentiesList((prevList) => ({
      ...prevList,
      [jntu_no]: { ...prevList[jntu_no], status },
    }));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-primary text-center">Live Face Recognition Attendance</h1>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      <div className="row">
        {/* Recognized Faces Table */}
        <div className="col-md-6">
          <div className="card shadow p-4 mb-4">
            <h2 className="mb-3 text-secondary">Recognized Faces</h2>
            {recognizedFaces.length > 0 ? (
              <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th>#</th>
                    <th>JNTU No</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {recognizedFaces.map(({ jntu_no, name }, index) => (
                    <tr key={jntu_no}>
                      <td>{index + 1}</td>
                      <td className="text-info font-weight-bold">{jntu_no}</td>
                      <td className="text-success font-weight-bold">{name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-danger">No Faces Detected</p>
            )}
          </div>
        </div>

        {/* Presenties Table */}
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="mb-3 text-secondary">Attendance</h2>
            {Object.keys(presentiesList).length > 0 ? (
              <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th>#</th>
                    <th>JNTU No</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(presentiesList).map(([jntu_no, { name, status }], index) => (
                    <tr key={jntu_no}>
                      <td>{index + 1}</td>
                      <td className="text-info font-weight-bold">{jntu_no}</td>
                      <td className="font-weight-bold">{name}</td>
                      <td>
                        <span className={`badge badge-${status === "Present" ? "success" : status === "Absent" ? "danger" : "warning"}`}>
                          {status}
                        </span>
                      </td>
                      <td>
                        <select
                          className="form-control"
                          value={status}
                          onChange={(e) => updateAttendance(jntu_no, e.target.value)}
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
              <p className="text-danger">No Students Marked Present Yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Presenties;
