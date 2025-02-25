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

        if (!textData.includes("Recognized Faces:")) {
          setRecognizedFaces([]);
          return;
        }

        const faceData = textData.replace("Recognized Faces: ", "").split(", ");
        
        const facesWithJNTUNo = faceData
          .map(entry => {
            if (entry.includes(" - ")) {
              const [jntu_no, name] = entry.split(" - ");
              return { jntu_no: jntu_no.trim(), name: name.trim() };
            }
            return null;
          })
          .filter(face => face !== null);

        setRecognizedFaces(facesWithJNTUNo);

        setPresentiesList((prevList) => {
          const updatedList = { ...prevList };
          facesWithJNTUNo.forEach(({ jntu_no, name }) => {
            if (!updatedList[jntu_no]) {
              updatedList[jntu_no] = { name, status: "Present" };
            }
          });
          return updatedList;
        });

        setError(null);
      } catch (err) {
        console.error("Error fetching recognized faces:", err);
        setError("Failed to load recognized faces. Please check the server.");
      }
    };

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
      <h1 className="mb-4 text-primary text-center fw-bold">Live Face Recognition Attendance</h1>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      <div className="row">
        {/* Recognized Faces Table */}
        <div className="col-lg-6 col-md-12 mb-4">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white">
              <h2 className="text-center">Recognized Faces</h2>
            </div>
            <div className="card-body">
              {recognizedFaces.length > 0 ? (
                <table className="table table-hover text-center">
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
                        <td className="text-info fw-bold">{jntu_no}</td>
                        <td className="text-success fw-bold">{name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-danger text-center">No Faces Detected</p>
              )}
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="col-lg-6 col-md-12">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-secondary text-white">
              <h2 className="text-center">Attendance</h2>
            </div>
            <div className="card-body">
              {Object.keys(presentiesList).length > 0 ? (
                <table className="table table-hover text-center">
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
                        <td className="text-info fw-bold">{jntu_no}</td>
                        <td className="fw-bold">{name}</td>
                        <td>
                          <span className={`badge ${status === "Present" ? "bg-success" : status === "Absent" ? "bg-danger" : "bg-warning"}`}>
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
                <p className="text-danger text-center">No Students Marked Present Yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Presenties;
