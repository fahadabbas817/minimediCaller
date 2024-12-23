import React, { useContext,useState,useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import SimulationModule from "./components/SimulationModule";
import FeedbackModule from "./components/FeedbackModule";
import SimulationResults from "./components/SimulationResults";
import FeedbackAnalysis from "./components/FeedbackAnalysis";
import ReportingDashboard from "./components/ReportingDashboard";
import Header from "./components/Header";
import { DispatchContext } from "./Context/ContextAPI";
import Signup from "./components/Signup";
import Login from "./components/login";

function App() {

  const { isAuthenticated,setIsAuthenticated } = useContext(DispatchContext);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    setIsAuthenticated(!!authToken);
  }, []);

  return (
    <Router>
      <div className="flex h-screen bg-gradient-to-br from-blue-100 to-purple-100">
        {/* {isAuthenticated && <Sidebar />} */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-r from-emerald-500 to-emerald-900">
          {isAuthenticated && <Header />}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/simulation" element={<SimulationModule />} />
            <Route path="/feedback" element={<FeedbackModule />} />
            <Route path="/reports" element={<ReportingDashboard />} />
          </Routes>
          {/* <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/*"
              element={
                isAuthenticated ? (
                  <Routes>
                    {/* <Route path="/" element={<HomePage />} /> */}
          {/* <Route path="/" element={<Dashboard />} />
                    <Route path="/simulation" element={<SimulationModule />} />
                    <Route path="/feedback" element={<FeedbackModule />} />
                    <Route path="/reports" element={<ReportingDashboard />} />
                  </Routes> */}
          {/* ) : ( */}
          {/* <Navigate to="/auth" replace /> */}
          {/* ) */}
          {/* } */}
          {/* /> */}
          {/* </Routes> */} */
        </main>
      </div>
    </Router>
  );
}

export default App;
