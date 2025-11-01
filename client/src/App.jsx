import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import LoanInfo from './pages/LoanInfo';
import { toggleDarkMode } from './redux/slices/uiSlice';

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    // Apply dark mode on mount
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} 
        />
        <Route 
          path="/loan-info" 
          element={isAuthenticated ? <LoanInfo /> : <Navigate to="/" />} 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
