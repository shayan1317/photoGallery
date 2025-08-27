import React, { useState } from "react";

function SignUP({ SubmitToDataBase, msg }) {
  // Local state banaya for controlled inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !userName || !password) {
      setError("All fields are required!");
      return;
    }

    // Agar sab filled hain, to error hata do
    setError("");

    // Parent function ko call karo
    SubmitToDataBase({ name, email, userName, password });
  };

  return (
    <div className="col-6">
      <div className="content">
        <h2 className="title">Sign Up</h2>

        <form className="p-5" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Enter full name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Enter email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Enter user name</label>
            <input
              type="text"
              className="form-control"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Enter password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error message (local validation) */}
          {error && <div className="error_msg text-danger">{error}</div>}

          {/* Error message (parent se aayi ho) */}
          {msg && <div className="error_msg text-warning">{msg}</div>}

          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUP;
