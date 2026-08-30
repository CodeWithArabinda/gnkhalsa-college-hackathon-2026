import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { ThemeProvider } from './context/ThemeContext';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import PublicPortfolioPage from './pages/PublicPortfolioPage';
import StudioEditor from './pages/StudioEditor';
import CreatePortfolio from './pages/CreatePortfolio';
import LivePortfolioPreview from './pages/LivePortfolioPreview';

function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <ThemeProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/create" element={<CreatePortfolio />} />
              <Route path="/studio" element={<StudioEditor />} />
              <Route path="/preview" element={<LivePortfolioPreview />} />
              <Route path="/p/:public_slug" element={<PublicPortfolioPage />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </PortfolioProvider>
    </AuthProvider>
  );
}

export default App;
