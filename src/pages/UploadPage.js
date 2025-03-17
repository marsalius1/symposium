import React, { useState, useEffect } from 'react';
import { createContent, uploadVideo } from '../services/contentService';
import { initialContentState, createUniqueId } from '../models/contentModel';


const UploadPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [contentType, setContentType] = useState('text');
  const [isMobile, setIsMobile] = useState(false);
  
  const steps = ['Hook', 'Main', 'Full'];
  
  // A helper to show recommended reading / video length
  const getStepRecommendation = () => {
    if (activeStep === 0) return contentType === 'text' ? "30-60 sec video" : "30-60 sec video";
    if (activeStep === 1) return contentType === 'text' ? "3-5 min video" : "3-5 min video";
    return contentType === 'text' ? "8-15 min reading" : "8-15 min video";
  };
  
  // Check if the screen is mobile size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };
  
  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };
  
  // Custom color scheme with enhanced depth
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

  // Basic Information (Step 0)
  const renderBasicInformation = () => {
    if (activeStep !== 0) return null;
    
    return (
      <div 
        className={`mb-${isMobile ? '5' : '6'} p-${isMobile ? '4' : '5'} rounded-lg`} 
        style={{ background: colors.surface1 }}
      >
        <h3 className={`text-${isMobile ? 'base' : 'lg'} font-medium mb-${isMobile ? '3' : '4'}`}>Basic Information</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Topic</label>
            <input 
              type="text" 
              placeholder="E.g., Double slit experiment" 
              className={`w-full px-3 py-2 rounded-md focus:outline-none ${isMobile ? 'text-base' : ''}`}
              style={{ 
                background: colors.surface2,
                border: `1px solid ${colors.border}`,
                color: colors.text
              }}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Discipline</label>
            <select 
              className={`w-full px-3 py-2 rounded-md focus:outline-none appearance-none ${isMobile ? 'text-base' : ''}`}
              style={{ 
                background: colors.surface2,
                border: `1px solid ${colors.border}`,
                color: colors.text
              }}
            >
              <option value="">Select a discipline</option>
              <option value="physics">Physics</option>
              <option value="philosophy">Philosophy</option>
              <option value="psychology">Psychology</option>
              <option value="mathematics">Mathematics</option>
              <option value="computer-science">Computer Science</option>
              <option value="economics">Economics</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Complexity (1-10)</label>
            <div className="flex items-center">
              <input 
                type="range" 
                min="1" 
                max="10" 
                defaultValue="5"
                className="w-full mr-3"
                style={{ accentColor: colors.accent2 }}
              />
              <span className="text-sm font-medium">5</span>
            </div>
            <div className="flex justify-between text-xs mt-1" style={{ color: colors.textSecondary }}>
              <span>Introductory</span>
              <span>Advanced</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Content Type Selection
  const renderContentTypeSelection = () => {
    if (isMobile) {
      return (
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">Content Type</label>
          <div 
            className="grid grid-cols-2 gap-2 p-1 rounded-lg"
            style={{ background: colors.surface1 }}
          >
            <button
              className="py-3 rounded-md transition-all duration-200 flex flex-col items-center justify-center"
              style={{
                background: contentType === 'text' ? colors.accent2 : 'transparent',
                color: contentType === 'text' ? '#1A1A2E' : colors.textSecondary
              }}
              onClick={() => setContentType('text')}
            >
              <svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              Text
            </button>
            <button
              className="py-3 rounded-md transition-all duration-200 flex flex-col items-center justify-center"
              style={{
                background: contentType === 'video' ? colors.accent2 : 'transparent',
                color: contentType === 'video' ? '#1A1A2E' : colors.textSecondary
              }}
              onClick={() => setContentType('video')}
            >
              <svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Video
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Content Type</label>
        <div 
          className="flex p-1 rounded-lg w-fit"
          style={{ background: colors.surface1 }}
        >
          <button
            className="px-4 py-2 rounded-md transition-all duration-200"
            style={{
              background: contentType === 'text' ? colors.accent2 : 'transparent',
              color: contentType === 'text' ? '#1A1A2E' : colors.textSecondary
            }}
            onClick={() => setContentType('text')}
          >
            Text
          </button>
          <button
            className="px-4 py-2 rounded-md transition-all duration-200"
            style={{
              background: contentType === 'video' ? colors.accent2 : 'transparent',
              color: contentType === 'video' ? '#1A1A2E' : colors.textSecondary
            }}
            onClick={() => setContentType('video')}
          >
            Video
          </button>
        </div>
      </div>
    );
  };

  // Hook (Step 0) Content
  const renderHookContent = () => {
    if (activeStep !== 0) return null;
    
    if (contentType === 'text') {
      return (
        <div>
          <label className="block text-sm font-medium mb-1">
            Hook Text <span style={{ color: colors.textSecondary }}>{isMobile ? "(60-90 seconds)" : "(60-90 seconds video)"}</span>
          </label>
          <textarea 
            rows={isMobile ? "4" : "5"} 
            placeholder="Write your attention-grabbing introduction here..."
            className={`w-full px-3 py-2 rounded-md focus:outline-none ${isMobile ? 'text-base' : ''}`}
            style={{ 
              background: colors.surface2,
              border: `1px solid ${colors.border}`,
              color: colors.text
            }}
          ></textarea>
        </div>
      );
    }
    
    return renderVideoUpload();
  };

  // Main (Step 1) Content
  const renderMainContent = () => {
    if (activeStep !== 1) return null;
    
    if (contentType === 'text') {
      return (
        <>
          <div>
            <label className="block text-sm font-medium mb-1">
              Main Text <span style={{ color: colors.textSecondary }}>{isMobile ? "(3-5 minutes)" : "(3-5 minutes of video)"}</span>
            </label>
            <textarea 
              rows={isMobile ? "6" : "8"} 
              placeholder="Elaborate on your key points here..."
              className={`w-full px-3 py-2 rounded-md focus:outline-none ${isMobile ? 'text-base' : ''}`}
              style={{ 
                background: colors.surface2,
                border: `1px solid ${colors.border}`,
                color: colors.text
              }}
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Key Points</label>
            <div className="space-y-2">
              <input 
                type="text" 
                placeholder="Key point 1" 
                className={`w-full px-3 py-2 rounded-md focus:outline-none ${isMobile ? 'text-base' : ''}`}
                style={{ 
                  background: colors.surface2,
                  border: `1px solid ${colors.border}`,
                  color: colors.text
                }}
              />
              <input 
                type="text" 
                placeholder="Key point 2" 
                className={`w-full px-3 py-2 rounded-md focus:outline-none ${isMobile ? 'text-base' : ''}`}
                style={{ 
                  background: colors.surface2,
                  border: `1px solid ${colors.border}`,
                  color: colors.text
                }}
              />
              <button style={{ color: colors.accent2 }} className="text-sm flex items-center hover:opacity-80 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add another key point
              </button>
            </div>
          </div>
        </>
      );
    }
    
    return renderVideoUpload();
  };

  // Full (Step 2) Content
  const renderFullContent = () => {
    if (activeStep !== 2) return null;
    
    if (contentType === 'text') {
      return (
        <>
          <div>
            <label className="block text-sm font-medium mb-1">
              Full Text <span style={{ color: colors.textSecondary }}>{isMobile ? "(8-15 minutes)" : "(8-15 minutes of video)"}</span>
            </label>
            <textarea 
              rows={isMobile ? "6" : "8"} 
              placeholder="Provide your comprehensive analysis here..."
              className={`w-full px-3 py-2 rounded-md focus:outline-none ${isMobile ? 'text-base' : ''}`}
              style={{ 
                background: colors.surface2,
                border: `1px solid ${colors.border}`,
                color: colors.text
              }}
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">References</label>
            <div className="space-y-2">
              {isMobile ? (
                <div className="space-y-2">
                  <input 
                    type="text" 
                    placeholder="Reference text" 
                    className="w-full px-3 py-2 rounded-md focus:outline-none text-base"
                    style={{ 
                      background: colors.surface2,
                      border: `1px solid ${colors.border}`,
                      color: colors.text
                    }}
                  />
                  <input 
                    type="text" 
                    placeholder="URL (optional)" 
                    className="w-full px-3 py-2 rounded-md focus:outline-none text-base"
                    style={{ 
                      background: colors.surface2,
                      border: `1px solid ${colors.border}`,
                      color: colors.text
                    }}
                  />
                </div>
              ) : (
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Reference text" 
                    className="flex-1 px-3 py-2 rounded-md focus:outline-none"
                    style={{ 
                      background: colors.surface2,
                      border: `1px solid ${colors.border}`,
                      color: colors.text
                    }}
                  />
                  <input 
                    type="text" 
                    placeholder="URL (optional)" 
                    className="flex-1 px-3 py-2 rounded-md focus:outline-none"
                    style={{ 
                      background: colors.surface2,
                      border: `1px solid ${colors.border}`,
                      color: colors.text
                    }}
                  />
                </div>
              )}
              <button style={{ color: colors.accent2 }} className="text-sm flex items-center hover:opacity-80 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add another reference
              </button>
            </div>
          </div>
        </>
      );
    }
    
    return renderVideoUpload();
  };

  // Video Upload Option
  const renderVideoUpload = () => {
    const getRecommendedDuration = () => {
      if (activeStep === 0) return "30-60 seconds recommended";
      if (activeStep === 1) return "3-5 minutes recommended";
      return "8-15 minutes recommended";
    };

    return (
      <div className="space-y-4">
        <div 
          className="border-2 border-dashed rounded-lg p-10 text-center"
          style={{ 
            borderColor: colors.border,
            padding: isMobile ? "24px" : "40px"
          }}
        >
          <div className={`mb-${isMobile ? '3' : '4'} inline-flex items-center justify-center`} style={{ color: colors.accent2 }}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-${isMobile ? '10' : '14'} w-${isMobile ? '10' : '14'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div className={`text-${isMobile ? 'base' : 'lg'} font-medium mb-1`}>Upload your video</div>
          <div className={`text-${isMobile ? 'xs' : 'sm'} mb-${isMobile ? '3' : '4'}`} style={{ color: colors.textSecondary }}>
            {getRecommendedDuration()}
          </div>
          <button 
            className={`px-4 py-2 rounded-md transition-colors ${isMobile ? 'text-sm' : ''}`}
            style={{ 
              background: colors.accent1,
              color: "#1A1A2E",
              fontWeight: isMobile ? 400 : 500
            }}
          >
            Select Video
          </button>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">{isMobile ? "Caption (optional)" : "Video Caption (optional)"}</label>
          <textarea 
            rows="3" 
            placeholder="Add a caption to your video..."
            className={`w-full px-3 py-2 rounded-md focus:outline-none ${isMobile ? 'text-base' : ''}`}
            style={{ 
              background: colors.surface2,
              border: `1px solid ${colors.border}`,
              color: colors.text
            }}
          ></textarea>
        </div>
      </div>
    );
  };

  // Render step progress indicator
  const renderStepProgress = () => {
    if (isMobile) return null;
    
    return (
      <div className="px-8 pt-10">
        <div className="flex justify-center items-center mb-4">
          {steps.map((step, index) => (
            <div key={step} className="flex flex-col items-center mx-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ 
                  background: index === activeStep ? colors.accent1 : colors.surface2,
                  boxShadow: index === activeStep ? `0 0 6px ${colors.accent1}` : "none",
                  transition: "all 0.3s ease"
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render form content based on the active step
  const renderStepContent = () => {
    return (
      <div 
        className={`${isMobile ? 'w-full rounded-xl p-4' : 'max-w-2xl mx-auto rounded-xl p-6'} backdrop-blur-sm`}
        style={{ 
          background: "rgba(255, 255, 255, 0.03)",
          [isMobile ? 'borderTop' : 'borderLeft']: `${isMobile ? '2px' : '3px'} solid ${colors.accent1}`,
          boxShadow: `0 4px 30px rgba(0, 0, 0, ${isMobile ? '0.2' : '0.1'})`
        }}
      >
        {renderBasicInformation()}
        {renderContentTypeSelection()}
        
        <div 
          className={`p-${isMobile ? '4' : '5'} rounded-lg`} 
          style={{ background: colors.surface1 }}
        >
          <h3 className={`text-${isMobile ? 'base' : 'lg'} font-medium mb-${isMobile ? '3' : '4'}`}>{steps[activeStep]} Content</h3>
          
          <div className="space-y-4">
            {renderHookContent()}
            {renderMainContent()}
            {renderFullContent()}
          </div>
        </div>
      </div>
    );
  };

  // Unified Navigation for both mobile and desktop
  const renderNavigation = () => {
    const containerClass = isMobile
      ? "fixed bottom-0 left-0 right-0 px-4 py-3 z-20"
      : "px-8 py-4 border-t";
    
    const containerStyle = isMobile
      ? { 
          background: "rgba(26, 32, 44, 0.8)",
          backdropFilter: "blur(10px)",
          borderTop: `1px solid ${colors.border}`
        }
      : { borderColor: colors.border };
    
    const contentClass = isMobile
      ? "flex justify-between items-center"
      : "max-w-2xl mx-auto flex justify-between items-center";
    
    // Back button styles
    const backBtnClass = isMobile
      ? "w-12 h-12 flex items-center justify-center rounded-full"
      : "px-5 py-2 flex items-center justify-center rounded-md";
    
    // Next button styles
    const nextBtnClass = isMobile
      ? "w-12 h-12 flex items-center justify-center rounded-full"
      : "px-5 py-2 flex items-center justify-center rounded-md";
    
    return (
      <div className={containerClass} style={containerStyle}>
        <div className={contentClass}>
          <button 
            onClick={handleBack}
            disabled={activeStep === 0}
            className={backBtnClass}
            style={{ 
              background: activeStep === 0 ? 'rgba(255, 255, 255, 0.05)' : colors.surface1,
              color: activeStep === 0 ? 'rgba(255, 255, 255, 0.3)' : colors.text,
              cursor: activeStep === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {!isMobile && <span className="ml-2">Back</span>}
          </button>
          
          <div 
            className={`flex-1 mx-3 px-4 py-1.5 rounded-full ${isMobile ? '' : 'max-w-xs'}`} 
            style={{ background: "rgba(255, 255, 255, 0.05)" }}
          >
            <div className="flex justify-between items-center">
              <span className="text-xs" style={{ color: colors.textSecondary }}>Step</span>
              <div className="font-medium">{activeStep + 1} / {steps.length}</div>
            </div>
          </div>
          
          <button 
            onClick={handleNext}
            className={nextBtnClass}
            style={{ 
              background: activeStep === steps.length - 1 ? colors.accent2 : colors.accent1,
              color: "#1A1A2E"
            }}
          >
            {activeStep === steps.length - 1 ? (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {!isMobile && <span className="ml-2">Submit</span>}
              </>
            ) : (
              <>
                {!isMobile && <span className="mr-2">Next</span>}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col" 
      style={{ 
        color: colors.text,
        fontFamily: "'Inter', system-ui, sans-serif",
        position: isMobile ? 'relative' : 'static',
        overflow: isMobile ? 'hidden' : 'auto',
      }}
    >
      {renderStepProgress()}
      
      <div className={`flex-1 ${isMobile ? 'px-4 pt-5 pb-20' : 'px-6 py-4 pb-20'} ${isMobile ? 'overflow-hidden' : 'overflow-y-auto'}`}
        style={{ 
          position: isMobile ? 'relative' : 'static',
          perspective: isMobile ? '1000px' : 'none'
        }}>
        {/* Step Title and Recommendation */}
        <div className="max-w-2xl mx-auto text-center mb-4">
          <h2 className="text-2xl font-bold tracking-tight">
            {steps[activeStep]}
          </h2>
          <p style={{ color: colors.textSecondary }} className={`mt-${isMobile ? '2' : '1'}`}>
            Recommendation: {getStepRecommendation()}
          </p>
        </div>

        {renderStepContent()}
      </div>
      {renderNavigation()}
    </div>
  );
};


export default UploadPage;