import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Footer';
import Testimonials from './components/Testimonials';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Home />
        <Testimonials />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
