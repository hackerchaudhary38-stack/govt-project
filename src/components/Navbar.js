import { useNavigate } from "react-router-dom";
import API from "../api/api"; // ✅ use your api.js instance

function Navbar() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await API.post("/logout"); // ✅ local backend URL handled by api.js
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error logging out");
    }
  };

  return (
    <div
      style={{
        padding: "15px 30px",
        background: "linear-gradient(90deg, #1976d2, #42a5f5)",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0px 3px 6px rgba(0,0,0,0.2)",
      }}
    >
      <h2 style={{ margin: 0, fontFamily: "'Segoe UI', sans-serif" }}>
        Govt Complaint Portal
      </h2>
      <button
        onClick={logout}
        style={{
          padding: "8px 15px",
          background: "#ffffff",
          color: "#1976d2",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
