import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await API.post("/login", { userName, password });
      if (res.data.status === "success") {
        navigate("/dashboard");
      } else {
        alert("Login Failed");
      }
    } catch (err) {
      alert("Error logging in");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={{ marginBottom: "20px", color: "#00f0ff" }}>
          Govt Complaint Portal
        </h2>

        <input
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={login} style={styles.button}>
          Login
        </button>

        {/* Links for Signup, Forgot Password, Reset Password */}
        <div style={{ marginTop: "15px" }}>
          <span
            style={{ ...styles.link, marginRight: "15px" }}
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
          <span
            style={{ ...styles.link, marginRight: "15px" }}
            onClick={() => navigate("/ForgotPassword")}
          >
            Forgot Password?
          </span>
          <span
            style={styles.link}
            onClick={() => navigate("/ResetPassword")}
          >
            Reset Password
          </span>
        </div>
      </div>

      {/* Floating glowing circles */}
      <div style={{ ...styles.circle, top: "10%", left: "20%" }} />
      <div style={{ ...styles.circle, top: "70%", left: "80%" }} />
      <div style={{ ...styles.circle, top: "50%", left: "50%", width: 300, height: 300 }} />
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

export default Login;
