import Navbar from "../components/Navbar";
import API from "../api/api";
import { useState } from "react";

function Dashboard() {
  const [complaint, setComplaint] = useState({});
  const [complaints, setComplaints] = useState([]);
  const [number, setNumber] = useState("");

  // REGISTER COMPLAINT
  const register = async () => {
    try {
      const res = await API.post("/complaints", complaint);
      alert(res.data.message);
      setComplaint({});
    } catch (err) {
      console.error(err);
      alert("Error registering complaint");
    }
  };

  // VIEW ALL COMPLAINTS
  const viewAll = async () => {
    try {
      const res = await API.get("/viewComplaints");
      setComplaints(res.data.complaints);
    } catch (err) {
      console.error(err);
      alert("Error fetching complaints");
    }
  };

  // VIEW BY NUMBER
  const viewByNumber = async () => {
    try {
      const res = await API.get(
        "/viewComplaints?complaintNumber=" + number.trim()
      );

      if (res.data.complaints && res.data.complaints.length > 0) {
        setComplaints(res.data.complaints);
      } else if (res.data.complaint) {
        setComplaints([res.data.complaint]);
      } else {
        setComplaints([]);
        alert("Complaint not found");
      }
    } catch (err) {
      console.error(err);
      alert("Error searching complaint");
    }
  };

  return (
    <div style={dashStyles.page}>
      <Navbar />

      <div style={dashStyles.card}>
        {/* REGISTER SECTION */}
        <h3 style={dashStyles.heading}>Register Complaint</h3>
        <input
          placeholder="District"
          onChange={(e) =>
            setComplaint({ ...complaint, districtName: e.target.value })
          }
          style={dashStyles.input}
        />
        <input
          placeholder="Type"
          onChange={(e) =>
            setComplaint({ ...complaint, complaintType: e.target.value })
          }
          style={dashStyles.input}
        />
        <input
          placeholder="Complaint Text"
          onChange={(e) =>
            setComplaint({ ...complaint, complaintText: e.target.value })
          }
          style={dashStyles.input}
        />
        <button onClick={register} style={dashStyles.button}>
          Submit
        </button>

        {/* SEARCH SECTION */}
        <h3 style={{ ...dashStyles.heading, marginTop: "40px" }}>
          Search Complaint
        </h3>
        <input
          placeholder="Complaint Number"
          onChange={(e) => setNumber(e.target.value)}
          style={dashStyles.input}
        />
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button onClick={viewByNumber} style={dashStyles.button}>
            Search
          </button>
          <button onClick={viewAll} style={dashStyles.button}>
            View All
          </button>
        </div>

        {/* RESULTS SECTION */}
        <h3 style={{ ...dashStyles.heading, marginTop: "40px" }}>Results:</h3>
        {complaints.length === 0 ? (
          <p>No complaints found</p>
        ) : (
          complaints.map((c) => (
            <div key={c.complaintNumber} style={dashStyles.resultCard}>
              <p><b>Number:</b> {c.complaintNumber}</p>
              <p><b>District:</b> {c.districtName}</p>
              <p><b>Type:</b> {c.complaintType || "N/A"}</p>
              <p><b>Complaint Text:</b> {c.complaintText || "N/A"}</p>
              <p><b>Status:</b> {c.status}</p>
            </div>
          ))
        )}
      </div>

      {/* FLOATING SHAPES */}
      <div style={{ ...dashStyles.circle, top: "10%", left: "20%" }} />
      <div style={{ ...dashStyles.circle, top: "70%", left: "80%" }} />
      <div style={{ ...dashStyles.circle, top: "50%", left: "50%", width: 300, height: 300 }} />
    </div>
  );
}

const dashStyles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #020024, #090979, #00d4ff)", // same as login
    color: "white",
    position: "relative",
    paddingBottom: "50px",
    fontFamily: "'Roboto', sans-serif",
    overflow: "hidden",
  },
  card: {
    backdropFilter: "blur(15px)",
    background: "rgba(0,0,0,0.6)", // same as login card
    padding: "50px",
    borderRadius: "20px",
    boxShadow: "0 0 40px #00f0ff, 0 0 80px #00f0ff inset",
    animation: "fadeIn 1.2s ease-in",
    zIndex: 2,
  },
  heading: {
    color: "#00f0ff",
    textShadow: "0 0 10px #00f0ff",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "12px",
    border: "1px solid #00f0ff",
    outline: "none",
    background: "rgba(0,0,0,0.4)", // same as login input
    color: "white",
    fontSize: "1rem",
    transition: "0.3s",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(45deg,#00f0ff,#00ffea)",
    color: "#020024",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
    boxShadow: "0 0 20px #00f0ff",
    transition: "0.3s",
  },
  resultCard: {
    background: "rgba(0,255,255,0.1)",
    padding: "15px",
    margin: "12px 0",
    borderRadius: "12px",
    boxShadow: "0 0 15px #00f0ff",
    transition: "0.3s",
    cursor: "pointer",
  },
  circle: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: "50%",
    background: "rgba(0,255,255,0.15)",
    boxShadow: "0 0 60px #00f0ff",
    filter: "blur(100px)",
    animation: "float 6s ease-in-out infinite alternate",
  },
};

export default Dashboard;
