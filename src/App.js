import React, { useState } from 'react';
import ForYouPage from './pages/ForYouPage';
import UploadPage from './pages/UploadPage3';

function App() {
  const [activePage, setActivePage] = useState('forYou');

  return (
    <div className="App flex flex-col h-screen overflow-hidden">
      <div className="flex-grow pb-16 overflow-y-auto">
        {activePage === 'forYou' ? (
          <ForYouPage setActivePage={setActivePage} />
        ) : (
          <UploadPage setActivePage={setActivePage} />
        )}
      </div>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 flex justify-center space-x-10 z-50">
        <button 
          className={`px-4 py-2 rounded-full ${activePage === 'forYou' ? 'bg-white text-black' : ''}`}
          onClick={() => setActivePage('forYou')}
        >
          For You
        </button>
        <button 
          className={`px-4 py-2 rounded-full ${activePage === 'upload' ? 'bg-white text-black' : ''}`}
          onClick={() => setActivePage('upload')}
        >
          Upload
        </button>
      </nav>
    </div>
  );
}

export default App; 