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
import SignUp from './components/login/SignUp';
import RestaurantLogin from './components/login/RestaurantLogin';
import { AuthProvider } from './context/AuthContext';
import OAuthCallback from './components/login/OAuthCallback';
import RestaurantSignUp from './components/login/RestaurantSignUp';
import RestaurantDashboard from './components/dashboard/RestaurantDashboard';
import ProtectedRoute from './components/routes/ProtectedRoute';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={
              <>
                <div id="home"><Home /></div>
                <PopularRestaurants />
                <div id="about"><AboutUs /></div>
                <div id="team"><Team /></div>
                <div id="testimonial"><Testimonials /></div>
                <div id="contact"><Footer /></div>
              </>
            } />
            <Route path="/team" element={<AllTeamMembers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/restaurant-login" element={<RestaurantLogin />} />
            <Route path="/oauth-callback" element={<OAuthCallback />} />
            <Route path="/restaurant-signup" element={<RestaurantSignUp />} />
            <Route
              path="/restaurant-dashboard"
              element={
                <ProtectedRoute type="restaurant">
                  <RestaurantDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
          />  
      </div>
    </AuthProvider>
  );
}

export default App;