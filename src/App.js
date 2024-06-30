import { Route, Routes } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";
import "./App.css";

import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import RootLayout from "./components/sidebar/RootLayout";
import ZenoraLayout from "./components/sidebar/ZenoraLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import Chat from "./pages/chat/Chat";
import CompleteProfile from "./pages/completeProfile/CompleteProfile";

import Home from './pages/Home/Home';
import Services from './pages/Services/Services';
import ContactUs from './pages/Contact/ContactUs';
import About from './pages/About/About';
import Blogs from './pages/Blogs/BlogCatalog';
import BlogCatalog from './pages/Blogs/Blogs';        
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import TripPlanner from './pages/TripPlanner/TripPlanner';
import TermsAndConditions from './containers/Terms/TermsAndConditions';
import PrivacyPolicy from './containers/Terms/PrivacyPolicy';
import EmailVerification from "./pages/EmailVerification/EmailVerification";

function App() {
  return (
    <Router>
      <Routes>
          <Route path='/blogs/:id' element={<BlogCatalog/>} />
          <Route path='/terms&conditions' element={<TermsAndConditions/>} />
          <Route path='/privacypolicy' element={<PrivacyPolicy/>} />
          <Route path='/' element={
            <>
              <Navbar />
              <section id="home">
                <Home />
              </section>
              <section id="about">
                <About />
              </section>
              <section id="services">
                <Services />
              </section>
              <section id="contact">
                <ContactUs />
              </section>
              <section id="blogs">
                <Blogs />
              </section>
              <Footer />
            </>
          } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/completeProfile" element={<CompleteProfile />} />
        <Route path="/verifyEmail" element={<EmailVerification />} />
        <Route
          path="/*"
          element={
            <RootLayout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/chat" element={<Chat />} />
              </Routes>
            </RootLayout>
          }
        />
        <Route
          path="/zenora"
          element={
            <ZenoraLayout>
              <Routes>
                <Route path="/" element={<TripPlanner />} />
              </Routes>
            </ZenoraLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
