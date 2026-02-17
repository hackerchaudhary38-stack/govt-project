import { useState } from "react";
import axios from "axios"; // use axios directly
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");

  // ✅ Correct baseURL matching deployed WAR
  const API = axios.create({
    baseURL: "http://localhost:8080/govt-complain-backend-project",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });

  const signup = async () => {
    if (!userName || !name || !password || !securityAnswer) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await API.post("/api/signup", {
        userName,
        name,
        password,
        securityAnswer,
      });

      if (res.data.status === "success") {
        alert("Signup successful! You can now login.");
        console.log("Signup success, navigating to Login page");
        navigate("/", { replace: true }); // ← Fixed to go to Login page correctly
      } else {
        alert(res.data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err.response || err);
      alert(
        err.response?.data?.message ||
          "Error signing up. Check console for details."
      );
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={{ marginBottom: "20px", color: "#00f0ff" }}>
          Govt Complaint Portal - Signup
        </h2>

        <input
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Security Answer"
          onChange={(e) => setSecurityAnswer(e.target.value)}
          style={styles.input}
        />

        <button onClick={signup} style={styles.button}>
          Signup
        </button>

        <p style={styles.link} onClick={() => navigate("/")}>
          Already have an account? Login
        </p>
      </div>

      {/* Floating glowing circles */}
      <div style={{ ...styles.circle, top: "10%", left: "20%" }} />
      <div style={{ ...styles.circle, top: "70%", left: "80%" }} />
      <div
        style={{ ...styles.circle, top: "50%", left: "50%", width: 300, height: 300 }}
      />
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #020024, #090979, #00d4ff)",
    overflow: "hidden",
    position: "relative",
  },
  card: {
    backdropFilter: "blur(15px)",
    background: "rgba(0,0,0,0.6)",
    padding: "50px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 0 40px #00f0ff, 0 0 80px #00f0ff inset",
    zIndex: 2,
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "12px",
    border: "1px solid #00f0ff",
    outline: "none",
    background: "rgba(0,0,0,0.4)",
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
  link: {
    marginTop: "15px",
    cursor: "pointer",
    textDecoration: "underline",
    color: "#00f0ff",
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

export default Signup;
