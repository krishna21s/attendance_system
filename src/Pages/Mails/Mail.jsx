import { useState } from "react";
import './Mail.css'
const SendMail = () => {
  const [emailType, setEmailType] = useState("all");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState(null);

  const students = [
    "Abdul Yunus",
    "Rahul Sharma",
    "Priya Patel",
    "Amit Kumar",
    "Sneha Reddy",
  ]; // Example student list

  const handleSendEmail = () => {
    console.log({
      emailType,
      selectedStudents,
      subject,
      body,
      file,
    });
    alert("Email sent successfully!");
  };

  return (
    <div className="container mt-4">
        <div className="p-3 mail-nav text-light my-4">
            GMRIT 
        </div>
      <div className="card p-4 shadow-lg">
        <h2 className="mb-3">Send Email</h2>

        {/* Email Type Selection */}
        <div className="mb-3">
          <label className="form-label">Email To:</label>
          <select
            className="form-select"
            value={emailType}
            onChange={(e) => setEmailType(e.target.value)}
          >
            <option value="all">All Students</option>
            <option value="specific">Specific Students</option>
          </select>
        </div>

        {/* Specific Students Selection */}
        {emailType === "specific" && (
          <div className="mb-3">
            <label className="form-label">Select Students:</label>
            <select
              className="form-select"
              multiple
              value={selectedStudents}
              onChange={(e) =>
                setSelectedStudents(
                  [...e.target.selectedOptions].map((opt) => opt.value)
                )
              }
            >
              {students.map((student, index) => (
                <option key={index} value={student}>
                  {student}
                </option>
              ))}
            </select>
            <small className="text-muted">Hold Ctrl to select multiple</small>
          </div>
        )}

        {/* Subject Field */}
        <div className="mb-3">
          <label className="form-label">Subject:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        {/* Body Field */}
        <div className="mb-3">
          <label className="form-label">Message:</label>
          <textarea
            className="form-control"
            placeholder="Enter your message"
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>

        {/* File Attachment */}
        <div className="mb-3">
          <label className="form-label">Attach File:</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        {/* Send Button */}
        <button className="btn btn-primary w-25" onClick={handleSendEmail}>
          Send Email
        </button>
      </div>
    </div>
  );
};

export default SendMail;
