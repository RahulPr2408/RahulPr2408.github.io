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
import Faq from './components/Faq';

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
          <Route path="/faq" element={<Faq />} />  {/* ✅ Add the FAQ Route */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;