import React, { useState, useEffect } from 'react';
import ResponsesList from './ResponsesList';

const ContentViewer = ({ content, depthLevel }) => {
  const [muted, setMuted] = useState(true);
  
  // Reset muted state when content or depth level changes
  useEffect(() => {
    // Auto unmute for main and full levels
    if (depthLevel === 'hook') {
      setMuted(true);
    } else {
      setMuted(false);
    }
  }, [content, depthLevel]);

  // Get the appropriate content based on depth level
  const getCurrentLevelContent = () => {
    switch (depthLevel) {
      case 'hook':
        return content.hook;
      case 'main':
        return content.main;
      case 'full':
        return content.full;
      default:
        return content.hook;
    }
  };
  
  const currentLevelContent = getCurrentLevelContent();
  const isVideo = currentLevelContent.video || 
    (depthLevel === 'full' && content.full.primaryContent.video);
  
  // Helper to render the content text for the selected depth level
  const renderText = () => {
    switch (depthLevel) {
      case 'hook':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">{content.topic}</h2>
            <div className="text-gray-400 text-sm mb-4">
              {content.discipline} • Complexity: {content.complexity}/10
            </div>
            <p className="text-lg">{content.hook.text}</p>
          </div>
        );
      
      case 'main':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">{content.topic}</h2>
            <div className="text-gray-400 text-sm mb-4">
              {content.discipline} • Complexity: {content.complexity}/10
            </div>
            <p className="mb-6">{content.main.text}</p>
            
            {content.main.keyPoints && content.main.keyPoints.length > 0 && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Key Points</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {content.main.keyPoints.map((point, index) => (
                    point && <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      
      case 'full':
        return (
          <div className="p-6 pb-40 overflow-y-auto max-h-[80vh]">
            <h2 className="text-2xl font-bold mb-2">{content.topic}</h2>
            <div className="text-gray-400 text-sm mb-4">
              {content.discipline} • Complexity: {content.complexity}/10
            </div>
            
            {/* Main full content */}
            <div className="mb-6">
              <p>{content.full.primaryContent.text}</p>
            </div>
            
            {/* Sections */}
            {content.full.sections && content.full.sections.length > 0 && (
              <div className="mt-6 space-y-4">
                {content.full.sections.map((section, index) => (
                  section.title && (
                    <div key={index} className="border-t border-gray-700 pt-4">
                      <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                      <p>{section.content}</p>
                    </div>
                  )
                ))}
              </div>
            )}
            
            {/* References */}
            {content.full.references && content.full.references.length > 0 && (
              <div className="mt-8 border-t border-gray-700 pt-4">
                <h3 className="text-lg font-semibold mb-2">References</h3>
                <ul className="list-decimal pl-5 space-y-2 text-sm text-gray-300">
                  {content.full.references.map((ref, index) => (
                    <li key={index}>
                      {ref.text}
                      {ref.url && (
                        <a 
                          href={ref.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="ml-1 text-blue-400"
                        >
                          [link]
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Responses */}
            {content.responses && content.responses.length > 0 && (
              <div className="mt-8 border-t border-gray-700 pt-4">
                <h3 className="text-lg font-semibold mb-4">Responses ({content.responses.length})</h3>
                <ResponsesList responses={content.responses} />
              </div>
            )}
          </div>
        );
      
      default:
        return <div>No content available</div>;
    }
  };
  
  // Helper to render video content
  const renderVideo = () => {
    let videoUrl;
    
    if (depthLevel === 'full' && content.full.primaryContent.video) {
      videoUrl = content.full.primaryContent.video;
    } else {
      videoUrl = currentLevelContent.video;
    }
    
    return (
      <div className="relative h-screen flex items-center justify-center bg-black">
        <video 
          src={videoUrl}
          className="max-h-screen max-w-full -mt-16"
          autoPlay 
          loop 
          playsInline
          muted={muted}
          controls={depthLevel === 'full'}
        />
        
        {depthLevel === 'hook' && (
          <button 
            className="absolute bottom-20 right-6 bg-white bg-opacity-20 p-3 rounded-full"
            onClick={() => setMuted(!muted)}
          >
            {muted ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>
        )}
        
        {/* Overlay for text information */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
          <h2 className="text-xl font-bold">{content.topic}</h2>
          <div className="text-gray-400 text-sm">
            {content.discipline} • Complexity: {content.complexity}/10
          </div>
          
          {depthLevel === 'full' && content.responses && content.responses.length > 0 && (
            <div className="mt-4">
              <h3 className="text-md font-semibold">Responses ({content.responses.length})</h3>
              <ResponsesList responses={content.responses} />
            </div>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="h-full">
      {isVideo ? renderVideo() : renderText()}
    </div>
  );
};

export default ContentViewer; 