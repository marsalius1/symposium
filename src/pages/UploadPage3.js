import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const ResponsiveUploadForm = () => {
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

  // Memoize the step content to improve performance
  const currentStepContent = useMemo(() => {
    return {
      desktop: (
        <div key={`desktop-step-${activeStep}`} className="max-w-2xl mx-auto rounded-xl p-6 backdrop-blur-sm"
          style={{ 
            background: "rgba(255, 255, 255, 0.03)",
            borderLeft: `3px solid ${colors.accent1}`,
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)"
          }}
        >
          {/* Basic Information (only on first step) */}
          {activeStep === 0 && (
            <div 
              className="mb-6 p-5 rounded-lg" 
              style={{ background: colors.surface1 }}
            >
              <h3 className="text-lg font-medium mb-4">Basic Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Topic</label>
                  <input 
                    type="text" 
                    placeholder="E.g., Double slit experiment" 
                    className="w-full px-3 py-2 rounded-md focus:outline-none"
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
                    className="w-full px-3 py-2 rounded-md focus:outline-none appearance-none"
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
          )}
          
          {/* Content Type Selection */}
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
          
          {/* Content Input */}
          <div 
            className="p-5 rounded-lg" 
            style={{ background: colors.surface1 }}
          >
            <h3 className="text-lg font-medium mb-4">{steps[activeStep]} Content</h3>
            
            {contentType === 'text' ? (
              <div className="space-y-4">
                {activeStep === 0 && (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Hook Text <span style={{ color: colors.textSecondary }}>(60-90 seconds video)</span>
                    </label>
                    <textarea 
                      rows="5" 
                      placeholder="Write your attention-grabbing introduction here..."
                      className="w-full px-3 py-2 rounded-md focus:outline-none"
                      style={{ 
                        background: colors.surface2,
                        border: `1px solid ${colors.border}`,
                        color: colors.text
                      }}
                    ></textarea>
                  </div>
                )}
                
                {activeStep === 1 && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Main Text <span style={{ color: colors.textSecondary }}>(3-5 minutes of video)</span>
                      </label>
                      <textarea 
                        rows="8" 
                        placeholder="Elaborate on your key points here..."
                        className="w-full px-3 py-2 rounded-md focus:outline-none"
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
                          className="w-full px-3 py-2 rounded-md focus:outline-none"
                          style={{ 
                            background: colors.surface2,
                            border: `1px solid ${colors.border}`,
                            color: colors.text
                          }}
                        />
                        <input 
                          type="text" 
                          placeholder="Key point 2" 
                          className="w-full px-3 py-2 rounded-md focus:outline-none"
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
                )}
                
                {activeStep === 2 && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Full Text <span style={{ color: colors.textSecondary }}>(8-15 minutes of video)</span>
                      </label>
                      <textarea 
                        rows="8" 
                        placeholder="Provide your comprehensive analysis here..."
                        className="w-full px-3 py-2 rounded-md focus:outline-none"
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
                        <button style={{ color: colors.accent2 }} className="text-sm flex items-center hover:opacity-80 transition-opacity">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Add another reference
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div 
                  className="border-2 border-dashed rounded-lg p-10 text-center"
                  style={{ borderColor: colors.border }}
                >
                  <div className="mb-4 inline-flex items-center justify-center" style={{ color: colors.accent2 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div className="text-lg font-medium mb-1">Upload your video</div>
                  <div className="text-sm mb-4" style={{ color: colors.textSecondary }}>
                    {activeStep === 0
                      ? "30-60 seconds recommended"
                      : activeStep === 1
                      ? "3-5 minutes recommended"
                      : "8-15 minutes recommended"
                    }
                  </div>
                  <button 
                    className="px-4 py-2 rounded-md transition-colors"
                    style={{ 
                      background: colors.accent1,
                      color: "#1A1A2E",
                      fontWeight: 500
                    }}
                  >
                    Select Video
                  </button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Video Caption (optional)</label>
                  <textarea 
                    rows="3" 
                    placeholder="Add a caption to your video..."
                    className="w-full px-3 py-2 rounded-md focus:outline-none"
                    style={{ 
                      background: colors.surface2,
                      border: `1px solid ${colors.border}`,
                      color: colors.text
                    }}
                  ></textarea>
                </div>
              </div>
            )}
          </div>
        </div>
      ),
      mobile: (
        <div key={`mobile-step-${activeStep}`} className="w-full rounded-xl p-4 backdrop-blur-sm"
          style={{ 
            background: "rgba(255, 255, 255, 0.05)",
            borderTop: `2px solid ${colors.accent1}`,
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)"
          }}
        >
          {/* Mobile Form Content */}
          {/* Basic Information (only on first step) */}
          {activeStep === 0 && (
            <div 
              className="mb-5 p-4 rounded-lg" 
              style={{ background: colors.surface1 }}
            >
              <h3 className="text-base font-medium mb-3">Basic Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Topic</label>
                  <input 
                    type="text" 
                    placeholder="E.g., Double slit experiment" 
                    className="w-full px-3 py-2 rounded-md focus:outline-none text-base"
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
                    className="w-full px-3 py-2 rounded-md focus:outline-none appearance-none text-base"
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
                  <div className="flex items-center ">
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
          )}
          
          {/* Content Type Selection - Mobile */}
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
          
          {/* Content Input - Mobile */}
          <div 
            className="p-4 rounded-lg" 
            style={{ background: colors.surface1 }}
          >
            <h3 className="text-base font-medium mb-3">{steps[activeStep]} Content</h3>
            
            {contentType === 'text' ? (
              <div className="space-y-4">
                {activeStep === 0 && (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Hook Text <span style={{ color: colors.textSecondary }}>(60-90 seconds)</span>
                    </label>
                    <textarea 
                      rows="4" 
                      placeholder="Write your attention-grabbing introduction here..."
                      className="w-full px-3 py-2 rounded-md focus:outline-none text-base"
                      style={{ 
                        background: colors.surface2,
                        border: `1px solid ${colors.border}`,
                        color: colors.text
                      }}
                    ></textarea>
                  </div>
                )}
                
                {activeStep === 1 && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Main Text <span style={{ color: colors.textSecondary }}>(3-5 minutes)</span>
                      </label>
                      <textarea 
                        rows="6" 
                        placeholder="Elaborate on your key points here..."
                        className="w-full px-3 py-2 rounded-md focus:outline-none text-base"
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
                          className="w-full px-3 py-2 rounded-md focus:outline-none text-base"
                          style={{ 
                            background: colors.surface2,
                            border: `1px solid ${colors.border}`,
                            color: colors.text
                          }}
                        />
                        <input 
                          type="text" 
                          placeholder="Key point 2" 
                          className="w-full px-3 py-2 rounded-md focus:outline-none text-base"
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
                )}
                
                {activeStep === 2 && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Full Text <span style={{ color: colors.textSecondary }}>(8-15 minutes)</span>
                      </label>
                      <textarea 
                        rows="6" 
                        placeholder="Provide your comprehensive analysis here..."
                        className="w-full px-3 py-2 rounded-md focus:outline-none text-base"
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
                        <button style={{ color: colors.accent2 }} className="text-sm flex items-center hover:opacity-80 transition-opacity">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Add another reference
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div 
                  className="border-2 border-dashed rounded-lg p-6 text-center"
                  style={{ borderColor: colors.border }}
                >
                  <div className="mb-3" style={{ color: colors.accent2 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div className="text-base font-medium mb-1">Upload your video</div>
                  <div className="text-xs mb-3" style={{ color: colors.textSecondary }}>
                    {activeStep === 0
                      ? "30-60 seconds recommended"
                      : activeStep === 1
                      ? "3-5 minutes recommended"
                      : "8-15 minutes recommended"
                    }
                  </div>
                  <button 
                    className="px-4 py-2 rounded-md transition-colors text-sm"
                    style={{ 
                      background: colors.accent1,
                      color: "#1A1A2E"
                    }}
                  >
                    Select Video
                  </button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Caption (optional)</label>
                  <textarea 
                    rows="3" 
                    placeholder="Add a caption to your video..."
                    className="w-full px-3 py-2 rounded-md focus:outline-none text-base"
                    style={{ 
                      background: colors.surface2,
                      border: `1px solid ${colors.border}`,
                      color: colors.text
                    }}
                  ></textarea>
                </div>
              </div>
            )}
          </div>
        </div>
      )
    };
  }, [activeStep, contentType, colors]);

  // Desktop layout component
  const DesktopLayout = () => (
    <div 
      className="min-h-screen w-full flex flex-col" 
      style={{ 
        color: colors.text,
        fontFamily: "'Inter', system-ui, sans-serif"
      }}
    >
      {/* Progress indicator with custom styling */}
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
      
      {/* Content area */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        {/* Step Title and Recommendation */}
        <div className="max-w-2xl mx-auto text-center mb-4">
          <h2 className="text-2xl font-bold tracking-tight">
            {steps[activeStep]}
          </h2>
          <p style={{ color: colors.textSecondary }} className="mt-1">
            Recommendation: {getStepRecommendation()}
          </p>
        </div>

        {currentStepContent.desktop}
      </div>
      
      {/* Footer / Navigation */}
      <div className="px-8 py-5 border-t" style={{ borderColor: colors.border }}>
        <div className="max-w-2xl mx-auto flex justify-between">
          <button 
            onClick={handleBack}
            disabled={activeStep === 0}
            className="px-4 py-2 rounded-md transition-colors"
            style={{ 
              background: activeStep === 0 ? 'rgba(255, 255, 255, 0.05)' : colors.surface1,
              color: activeStep === 0 ? 'rgba(255, 255, 255, 0.3)' : colors.text,
              cursor: activeStep === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            Back
          </button>
          
          <button 
            onClick={handleNext}
            className="px-4 py-2 rounded-md transition-colors"
            style={{ 
              background: activeStep === steps.length - 1 ? colors.accent2 : colors.accent1,
              color: "#1A1A2E",
              fontWeight: 500
            }}
          >
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
  
  // Mobile layout component with innovative card-stack UI
  const MobileLayout = () => (
    <div 
      className="min-h-screen w-full flex flex-col" 
      style={{ 
        color: colors.text,
        fontFamily: "'Inter', system-ui, sans-serif",
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Mobile Content */}
      <div 
        className="flex-1 px-4 pt-5 pb-20 overflow-hidden"
        style={{ 
          position: 'relative',
          perspective: '1000px'
        }}
      >
        {/* Step Title and Recommendation */}
        <div className="max-w-2xl mx-auto text-center mb-4">
          <h2 className="text-2xl font-bold tracking-tight">
            {steps[activeStep]}
          </h2>
          <p style={{ color: colors.textSecondary }} className="mt-2">
            Recommendation: {getStepRecommendation()}
          </p>
        </div>

        {currentStepContent.mobile}
      </div>
      
      {/* Mobile Navigation */}
      <div 
        className="fixed bottom-0 left-0 right-0 px-4 py-3 z-20"
        style={{ 
          background: "rgba(26, 32, 44, 0.8)",
          backdropFilter: "blur(10px)",
          borderTop: `1px solid ${colors.border}`
        }}
      >
        <div className="flex justify-between items-center">
          <button 
            onClick={handleBack}
            disabled={activeStep === 0}
            className="w-12 h-12 flex items-center justify-center rounded-full"
            style={{ 
              background: activeStep === 0 ? 'rgba(255, 255, 255, 0.05)' : colors.surface1,
              color: activeStep === 0 ? 'rgba(255, 255, 255, 0.3)' : colors.text,
              cursor: activeStep === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex-1 mx-3 px-4 py-1.5 rounded-full" style={{ background: "rgba(255, 255, 255, 0.05)" }}>
            <div className="flex justify-between items-center">
              <span className="text-xs" style={{ color: colors.textSecondary }}>Step</span>
              <div className="font-medium">{activeStep + 1} / 3</div>
            </div>
          </div>
          
          <button 
            onClick={handleNext}
            className="w-12 h-12 flex items-center justify-center rounded-full"
            style={{ 
              background: activeStep === steps.length - 1 ? colors.accent2 : colors.accent1,
              color: "#1A1A2E"
            }}
          >
            {activeStep === steps.length - 1 ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
  
  return isMobile ? <MobileLayout /> : <DesktopLayout />;
};

const UploadPage = () => {
  const navigate = useNavigate();
  
  return <ResponsiveUploadForm />;
};

export default UploadPage;