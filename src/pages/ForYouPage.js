import React, { useState, useEffect, useRef } from 'react';
import { getFeedContent, getContentById } from '../services/contentService';
import ContentViewer from '../components/ContentViewer';
import ResponseForm from '../components/ResponseForm';

const ForYouPage = ({ setActivePage }) => {
  const [feedContent, setFeedContent] = useState([]);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [currentDepthLevel, setCurrentDepthLevel] = useState('hook');
  const [loading, setLoading] = useState(true);
  const [showResponseForm, setShowResponseForm] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const content = await getFeedContent(20);
        if (content.length > 0) {
          setFeedContent(content);
        } else {
          // TODO: Handle empty content (maybe show demo content)
          console.log('No content available');
        }
      } catch (error) {
        console.error('Error loading feed content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  // Reset depth level when changing content
  useEffect(() => {
    setCurrentDepthLevel('hook');
    setShowResponseForm(false);
  }, [currentContentIndex]);

  // Function to reload the current content with updated responses
  const reloadCurrentContent = async () => {
    try {
      const currentContent = feedContent[currentContentIndex];
      const updatedContent = await getContentById(currentContent.id);
      
      // Update just the current content in the feedContent array
      const updatedFeedContent = [...feedContent];
      updatedFeedContent[currentContentIndex] = updatedContent;
      setFeedContent(updatedFeedContent);
    } catch (error) {
      console.error('Error reloading content:', error);
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const diffX = touchStartX.current - touchEndX;
    const diffY = touchStartY.current - touchEndY;
    
    // Determine if horizontal or vertical swipe based on which has greater movement
    if (Math.abs(diffX) > Math.abs(diffY)) {
      // Horizontal swipe
      if (diffX > 50) {
        // Swipe left - go deeper
        handleGoDeeper();
      } else if (diffX < -50) {
        // Swipe right - go back
        handleGoBack();
      }
    } else {
      // Vertical swipe
      if (diffY > 50) {
        // Swipe up - next content
        handleNextContent();
      } else if (diffY < -50) {
        // Swipe down - previous content
        handlePreviousContent();
      }
    }
  };

  const handleGoDeeper = () => {
    if (currentDepthLevel === 'hook') {
      setCurrentDepthLevel('main');
    } else if (currentDepthLevel === 'main') {
      setCurrentDepthLevel('full');
    }
  };

  const handleGoBack = () => {
    if (currentDepthLevel === 'full') {
      setCurrentDepthLevel('main');
      setShowResponseForm(false);
    } else if (currentDepthLevel === 'main') {
      setCurrentDepthLevel('hook');
    }
  };

  const handleNextContent = () => {
    if (currentContentIndex < feedContent.length - 1) {
      setCurrentContentIndex(currentContentIndex + 1);
    }
  };

  const handlePreviousContent = () => {
    if (currentContentIndex > 0) {
      setCurrentContentIndex(currentContentIndex - 1);
    }
  };

  const toggleResponseForm = () => {
    setShowResponseForm(!showResponseForm);
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto"></div>
          <p className="mt-4">Loading fascinating content...</p>
        </div>
      </div>
    );
  }

  if (feedContent.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-black text-white p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Content Yet</h2>
          <p className="mb-6">Be the first to share something insightful!</p>
          <button 
            className="bg-white text-black px-6 py-3 rounded-full font-semibold"
            onClick={() => setActivePage('upload')}
          >
            Create Post
          </button>
        </div>
      </div>
    );
  }

  const currentContent = feedContent[currentContentIndex];
  console.log('Current content:', currentContent);
  console.log('feedContent:', feedContent);
  
  // Debug logging to check content
  console.log('Current content index:', currentContentIndex);
  console.log('Feed content length:', feedContent.length);
  console.log('Current content:', currentContent);

  return (
    <div 
      className="h-full bg-black text-white"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Depth level indicator */}
      <div className="absolute top-4 right-4 z-40 bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm">
        {currentDepthLevel.charAt(0).toUpperCase() + currentDepthLevel.slice(1)}
      </div>
      
      {/* Content area */}
      <div className="h-full overflow-hidden">
        <ContentViewer 
          content={currentContent} 
          depthLevel={currentDepthLevel}
        />
      </div>
      
      {/* Response section - only visible at 'full' depth */}
      {currentDepthLevel === 'full' && !showResponseForm && (
        <div className="absolute bottom-20 left-0 right-0 flex justify-center z-40">
          <button 
            className="bg-white text-black px-6 py-2 rounded-full font-semibold"
            onClick={toggleResponseForm}
          >
            Respond
          </button>
        </div>
      )}
      
      {/* Response form overlay */}
      {showResponseForm && (
        <div className="absolute inset-0 bg-black bg-opacity-90 z-50">
          <button 
            className="absolute top-4 left-4 text-white text-2xl"
            onClick={toggleResponseForm}
          >
            &times;
          </button>
          <ResponseForm 
            contentId={currentContent.id} 
            onSubmitSuccess={() => {
              // Refresh content to show the new response
              reloadCurrentContent();
              toggleResponseForm();
            }}
          />
        </div>
      )}
      
      {/* Swipe instructions - shown briefly */}
      <div className="absolute bottom-20 left-4 text-gray-400 text-xs">
        Swipe horizontally to change depth, vertically for next post
      </div>
    </div>
  );
};

export default ForYouPage; 