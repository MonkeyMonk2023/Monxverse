import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import RootLayout from "./components/sidebar/RootLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import Chat from "./pages/chat/Chat";
import Planner from "./pages/planner/Planner";
import Demo from "./pages/Demo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route
          path="/*"
          element={
            <RootLayout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/planner" element={<Planner />} />
                <Route path="/demo" element={<Demo />} />
              </Routes>
            </RootLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
