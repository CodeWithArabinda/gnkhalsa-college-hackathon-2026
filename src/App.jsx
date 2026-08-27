import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import PublicPortfolioPage from './pages/PublicPortfolioPage';

function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/p/:public_slug" element={<PublicPortfolioPage />} />
          </Routes>
        </Router>
      </PortfolioProvider>
    </AuthProvider>
  );
}

export default App;
