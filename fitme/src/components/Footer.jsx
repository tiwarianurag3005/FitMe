import { Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto py-4 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="bg-emerald-500 rounded-full p-1">
              <Activity className="h-4 w-4 text-white" />
            </div>
            <span className="text-gray-700 font-medium">FitMe</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0 items-center mb-4 md:mb-0">
            <Link to="/" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Dashboard</Link>
            <Link to="/profile" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Profile</Link>
            <Link to="/workout" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Workout</Link>
            <Link to="/progress" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Progress</Link>
            <Link to="/history" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">History</Link>
            <Link to="/community" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Community</Link>
          </div>
          
          <div className="text-sm text-gray-500">
            © {currentYear} Fitness World. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;