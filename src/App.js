import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Footer';
import Testimonials from './components/Testimonials';
import Team from './components/Team';
import AboutUs from './components/AboutUs';
import PopularRestaurants from './components/PopularRestaurants';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Home />
        <PopularRestaurants />
        <AboutUs />
        <Team />
        <Testimonials />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
