import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import ForYouPage from './pages/ForYouPage';
import UploadPage from './pages/UploadPage';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Custom color scheme matching UploadPage3.js
  const colors = {
    gradient: "linear-gradient(135deg, #2A1B3D 0%, #1A3A63 100%)",
    accent1: "#E9A16B", // Warm amber
    accent2: "#44CFCB", // Turquoise
    surface1: "rgba(255, 255, 255, 0.07)",
    surface2: "rgba(255, 255, 255, 0.12)",
    text: "#FFFFFF",
    textSecondary: "rgba(255, 255, 255, 0.7)",
    border: "rgba(255, 255, 255, 0.12)"
  };
  
  // Determine button text and navigation based on current route
  const isUploadPage = location.pathname === "/upload";
  const buttonText = isUploadPage ? "For You" : "Upload";
  const buttonNavigateTo = isUploadPage ? "/" : "/upload";
  
  const handleButtonClick = () => {
    navigate(buttonNavigateTo);
  };

  return (
    <div className="App flex flex-col h-screen overflow-hidden" style={{ 
      background: colors.gradient,
      color: colors.text,
      fontFamily: "'Inter', system-ui, sans-serif"
    }}>
      {/* Header with dynamic button */}
      <header className="py-5 px-6 flex justify-between items-center border-b" style={{ borderColor: colors.border }}>
        <div className="text-xl font-semibold tracking-tight flex items-center" style={{ color: colors.accent2 }}>
          <svg viewBox="0 0 24 24" className="w-7 h-7 mr-2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.5 9C9.5 8.17157 10.1716 7.5 11 7.5H13C13.8284 7.5 14.5 8.17157 14.5 9C14.5 9.82843 13.8284 10.5 13 10.5H11C10.1716 10.5 9.5 11.1716 9.5 12C9.5 12.8284 10.1716 13.5 11 13.5H13C13.8284 13.5 14.5 14.1716 14.5 15C14.5 15.8284 13.8284 16.5 13 16.5H11C10.1716 16.5 9.5 15.8284 9.5 15" 
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 7.5V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 18V16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Symposium
        </div>
        <button 
          onClick={handleButtonClick}
          className="text-sm px-4 py-2 rounded-full transition-colors"
          style={{ 
            background: colors.accent1,
            color: "#1A1A2E", 
            fontWeight: 500
          }}
        >
          {buttonText}
        </button>
      </header>

      <div className="flex-grow overflow-y-auto">
        <Routes>
          <Route path="/" element={<ForYouPage />} />
          <Route path="/upload" element={<UploadPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App; 