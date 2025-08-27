import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { addDoc } from "firebase/firestore";

const Signup = ({ msg }) => {
  // Local state banaya for controlled inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !userName || !password) {
      setError("All fields are required!");
      return;
    }

    console.log("data", data);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      console.log("user", user);
      let storageData = { email, accessToken: user?.accessToken, name };
      localStorage.setItem("user", storageData);
      await addDoc(collection(db, "users"), {
        name: name,
        email: email,
        username: userName,
        password: password,
      });

      console.log("useradded");
    } catch (err) {
      console.log("err", err);
    }

    // Agar sab filled hain, to error hata do
    setError("");

    // Parent function ko call karo
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    formWrapper: {
      maxWidth: "450px",
      width: "100%",
      background: "rgba(255, 255, 255, 0.95)",
      borderRadius: "20px",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
      backdropFilter: "blur(10px)",
      overflow: "hidden",
      position: "relative",
    },
    header: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "40px 30px",
      textAlign: "center",
      color: "white",
    },
    title: {
      fontSize: "28px",
      fontWeight: "700",
      margin: "0 0 10px 0",
      letterSpacing: "0.5px",
    },
    subtitle: {
      fontSize: "16px",
      opacity: "0.9",
      margin: "0",
    },
    form: {
      padding: "40px 30px",
    },
    formGroup: {
      marginBottom: "25px",
      position: "relative",
    },
    label: {
      display: "block",
      fontSize: "14px",
      fontWeight: "600",
      color: "#374151",
      marginBottom: "8px",
      transition: "color 0.3s ease",
    },
    input: {
      width: "100%",
      padding: "15px 20px",
      fontSize: "16px",
      border: "2px solid #e5e7eb",
      borderRadius: "12px",
      background: "#f9fafb",
      transition: "all 0.3s ease",
      outline: "none",
      boxSizing: "border-box",
    },
    inputFocus: {
      borderColor: "#667eea",
      background: "#ffffff",
      boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
    },
    inputHover: {
      borderColor: "#d1d5db",
    },
    errorContainer: {
      background: "#fef2f2",
      border: "1px solid #fecaca",
      borderRadius: "10px",
      padding: "15px",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      animation: "shake 0.5s ease-in-out",
    },
    warningContainer: {
      background: "#fffbeb",
      border: "1px solid #fed7aa",
      borderRadius: "10px",
      padding: "15px",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      animation: "shake 0.5s ease-in-out",
    },
    errorDot: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      backgroundColor: "#ef4444",
      marginRight: "12px",
      animation: "pulse 2s infinite",
    },
    warningDot: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      backgroundColor: "#f59e0b",
      marginRight: "12px",
      animation: "pulse 2s infinite",
    },
    errorText: {
      color: "#dc2626",
      fontSize: "14px",
      fontWeight: "500",
      margin: "0",
    },
    warningText: {
      color: "#d97706",
      fontSize: "14px",
      fontWeight: "500",
      margin: "0",
    },
    button: {
      width: "100%",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      padding: "16px 24px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden",
    },
    buttonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 10px 25px rgba(102, 126, 234, 0.4)",
    },
    buttonActive: {
      transform: "translateY(0)",
    },
    footer: {
      textAlign: "center",
      paddingTop: "20px",
      borderTop: "1px solid #f3f4f6",
      marginTop: "20px",
    },
    footerText: {
      color: "#6b7280",
      fontSize: "14px",
      margin: "0",
    },
    footerLink: {
      color: "#667eea",
      textDecoration: "none",
      fontWeight: "600",
      transition: "color 0.3s ease",
    },
    decorativeElement: {
      position: "absolute",
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      background: "rgba(255, 255, 255, 0.1)",
      pointerEvents: "none",
    },
    decorative1: {
      top: "-50px",
      right: "-50px",
    },
    decorative2: {
      bottom: "-30px",
      left: "-30px",
      width: "80px",
      height: "80px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        {/* Decorative elements */}
        <div
          style={{ ...styles.decorativeElement, ...styles.decorative1 }}
        ></div>
        <div
          style={{ ...styles.decorativeElement, ...styles.decorative2 }}
        ></div>

        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Join us and get started today</p>
        </div>

        {/* Form */}
        <div style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              style={styles.input}
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = styles.inputFocus.borderColor;
                e.target.style.background = styles.inputFocus.background;
                e.target.style.boxShadow = styles.inputFocus.boxShadow;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.background = "#f9fafb";
                e.target.style.boxShadow = "none";
              }}
              onMouseEnter={(e) => {
                if (document.activeElement !== e.target) {
                  e.target.style.borderColor = styles.inputHover.borderColor;
                }
              }}
              onMouseLeave={(e) => {
                if (document.activeElement !== e.target) {
                  e.target.style.borderColor = "#e5e7eb";
                }
              }}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = styles.inputFocus.borderColor;
                e.target.style.background = styles.inputFocus.background;
                e.target.style.boxShadow = styles.inputFocus.boxShadow;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.background = "#f9fafb";
                e.target.style.boxShadow = "none";
              }}
              onMouseEnter={(e) => {
                if (document.activeElement !== e.target) {
                  e.target.style.borderColor = styles.inputHover.borderColor;
                }
              }}
              onMouseLeave={(e) => {
                if (document.activeElement !== e.target) {
                  e.target.style.borderColor = "#e5e7eb";
                }
              }}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              style={styles.input}
              placeholder="Choose a username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = styles.inputFocus.borderColor;
                e.target.style.background = styles.inputFocus.background;
                e.target.style.boxShadow = styles.inputFocus.boxShadow;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.background = "#f9fafb";
                e.target.style.boxShadow = "none";
              }}
              onMouseEnter={(e) => {
                if (document.activeElement !== e.target) {
                  e.target.style.borderColor = styles.inputHover.borderColor;
                }
              }}
              onMouseLeave={(e) => {
                if (document.activeElement !== e.target) {
                  e.target.style.borderColor = "#e5e7eb";
                }
              }}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              style={styles.input}
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = styles.inputFocus.borderColor;
                e.target.style.background = styles.inputFocus.background;
                e.target.style.boxShadow = styles.inputFocus.boxShadow;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.background = "#f9fafb";
                e.target.style.boxShadow = "none";
              }}
              onMouseEnter={(e) => {
                if (document.activeElement !== e.target) {
                  e.target.style.borderColor = styles.inputHover.borderColor;
                }
              }}
              onMouseLeave={(e) => {
                if (document.activeElement !== e.target) {
                  e.target.style.borderColor = "#e5e7eb";
                }
              }}
            />
          </div>

          {/* Error Messages */}
          {error && (
            <div style={styles.errorContainer}>
              <div style={styles.errorDot}></div>
              <p style={styles.errorText}>{error}</p>
            </div>
          )}

          {msg && (
            <div style={styles.warningContainer}>
              <div style={styles.warningDot}></div>
              <p style={styles.warningText}>{msg}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            style={styles.button}
            onMouseEnter={(e) => {
              e.target.style.transform = styles.buttonHover.transform;
              e.target.style.boxShadow = styles.buttonHover.boxShadow;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
            onMouseDown={(e) => {
              e.target.style.transform = styles.buttonActive.transform;
            }}
            onMouseUp={(e) => {
              e.target.style.transform = styles.buttonHover.transform;
            }}
          >
            Create Account →
          </button>

          {/* Footer */}
          <div style={styles.footer}>
            <p style={styles.footerText}>
              Already have an account?{" "}
              <a href="#" style={styles.footerLink}>
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
