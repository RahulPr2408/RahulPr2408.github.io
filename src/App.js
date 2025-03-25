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
import Login from './components/login/Login';
import SignUp from './components/login/SignUp'; // Import SignUp component
import RestaurantLogin from './components/login/RestaurantLogin'; // Import RestaurantLogin component
import { AuthProvider } from './context/AuthContext';
import OAuthCallback from './components/login/OAuthCallback'; // Import OAuthCallback component
import RestaurantSignUp from './components/login/RestaurantSignUp'; // Import RestaurantSignUp component
import RestaurantDashboard from './components/dashboard/RestaurantDashboard'; // Import RestaurantDashboard component
import ProtectedRoute from './components/routes/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
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
            <Route path="/restaurant-login" element={<RestaurantLogin />} /> {/* Add RestaurantLogin route */}
            <Route path="/oauth-callback" element={<OAuthCallback />} /> {/* Add OAuthCallback route */}
            <Route path="/restaurant-signup" element={<RestaurantSignUp />} /> {/* Add RestaurantSignUp route */}
            <Route 
              path="/restaurant-dashboard" 
              element={
                <ProtectedRoute type="restaurant">
                  <RestaurantDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;