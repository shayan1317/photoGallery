import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./app.css";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AuthProvider from "./components/AuthProvider";
import ProtectedRoutes from "./components/ProtectedRoutes";
function App() {
  // const navigate = useNavigate();

  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<Home />} />

            {/* Sign Up Page */}
            <Route path="/signup" element={<Signup />} />

            {/* Sign In Page */}
            <Route path="/signin" element={<Signin />} />

            {/* Dashboard Page */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoutes>
                  <Dashboard />
                </ProtectedRoutes>
              }
            />
          </Routes>
        </div>
      </AuthProvider>

      <ToastContainer />
    </Router>
  );
}

export default App;
