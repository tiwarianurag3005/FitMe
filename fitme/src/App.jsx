import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Workout from './pages/Workout';
import Progress from './pages/Progress';
import History from './pages/History';
import Community from './pages/Community';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { WorkoutProvider } from './context/WorkoutContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthProvider>
      <WorkoutProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/workout" element={<Workout />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/history" element={<History />} />
                <Route path="/community" element={<Community />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </WorkoutProvider>
    </AuthProvider>
  );
}

export default App;