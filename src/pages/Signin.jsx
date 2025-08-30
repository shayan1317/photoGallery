import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../firebase/config";
import { styles } from "./styles";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";
import { useEffect } from "react";
const Signin = () => {
  // Local state banaya for controlled inputs
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { user } = useAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("All fields are required!");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      console.log("usersignin", user);
      let storageData = {
        email,
        accessToken: user?.accessToken,
        name: "shayan",
      };
      localStorage.setItem("user", storageData);

      toast.success("User logged in successfully", {
        position: "top-right",
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/dashboard");
    } catch (err) {
      console.log("err", err);
      toast.error(err.message, {
        position: "top-right",
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    // Agar sab filled hain, to error hata do
    setError("");

    // Parent function ko call karo
  };
  useEffect(() => {
    if (user) {
      navigate("/dashboard"); // already logged in, redirect away
    }
  }, [user, navigate]);
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
          <h2 style={styles.title}>Sign In </h2>
          {/* <p style={styles.subtitle}>Join us and get started today</p> */}
        </div>

        {/* Form */}
        <div style={styles.form}>
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

          {/* {msg && (
            <div style={styles.warningContainer}>
              <div style={styles.warningDot}></div>
              <p style={styles.warningText}>{msg}</p>
            </div>
          )} */}

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
            Signin
          </button>

          {/* Footer */}
          <div style={styles.footer}>
            <p style={styles.footerText}>
              Dont have an account?{" "}
              <a href="/signup" style={styles.footerLink}>
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
