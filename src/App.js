import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Testimonials from './components/Testimonials';
import Team from './components/Team';
import AboutUs from './components/AboutUs';
import PopularRestaurants from './components/PopularRestaurants';
import AllTeamMembers from './components/AllTeamMembers';
import Login from './components/Login';
import SignUp from './components/SignUp'; // Import SignUp component

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Home />
              <PopularRestaurants />
              <AboutUs />
              <Team />
              <Testimonials />
            </>
          } />
          <Route path="/team" element={<AllTeamMembers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} /> 
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;