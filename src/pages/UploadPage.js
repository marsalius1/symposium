import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { createContent, uploadVideo } from '../services/contentService';
import { initialContentState, createUniqueId } from '../models/contentModel';

const UploadPage = ({ setActivePage }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [content, setContent] = useState({...initialContentState, id: createUniqueId()});
  const [contentType, setContentType] = useState('text');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // File uploads
  const [hookVideo, setHookVideo] = useState(null);
  const [mainVideo, setMainVideo] = useState(null);
  const [fullVideo, setFullVideo] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const steps = ['Hook', 'Main', 'Full'];
  
  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handleBack(),
    preventScrollOnSwipe: true,
    trackMouse: false,
    delta: 50,
  });
  
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => Math.min(prevStep + 1, 2));
    }
  };
  
  const handleBack = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleChange = (section, field, value) => {
    if (section === 'base') {
      setContent({...content, [field]: value});
    } else {
      setContent({
        ...content,
        [section]: {
          ...content[section],
          [field]: value
        }
      });
    }
  };

  const handlePrimaryContentChange = (field, value) => {
    setContent({
      ...content,
      full: {
        ...content.full,
        primaryContent: {
          ...content.full.primaryContent,
          [field]: value
        }
      }
    });
  };

  const handleAddKeyPoint = () => {
    setContent({
      ...content,
      main: {
        ...content.main,
        keyPoints: [...content.main.keyPoints, '']
      }
    });
  };

  const handleChangeKeyPoint = (index, value) => {
    const newKeyPoints = [...content.main.keyPoints];
    newKeyPoints[index] = value;
    setContent({
      ...content,
      main: {
        ...content.main,
        keyPoints: newKeyPoints
      }
    });
  };

  const handleRemoveKeyPoint = (index) => {
    const newKeyPoints = [...content.main.keyPoints];
    newKeyPoints.splice(index, 1);
    setContent({
      ...content,
      main: {
        ...content.main,
        keyPoints: newKeyPoints
      }
    });
  };

  const handleAddReference = () => {
    setContent({
      ...content,
      full: {
        ...content.full,
        references: [...content.full.references, { text: '', url: '' }]
      }
    });
  };

  const handleChangeReference = (index, field, value) => {
    const newReferences = [...content.full.references];
    newReferences[index] = {
      ...newReferences[index],
      [field]: value
    };
    setContent({
      ...content,
      full: {
        ...content.full,
        references: newReferences
      }
    });
  };

  const handleRemoveReference = (index) => {
    const newReferences = [...content.full.references];
    newReferences.splice(index, 1);
    setContent({
      ...content,
      full: {
        ...content.full,
        references: newReferences
      }
    });
  };

  const handleFileUpload = (file, setFileState) => {
    const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
    if (file && validTypes.includes(file.type)) {
      setFileState(file);
      return true;
    } else {
      setError('Please upload a valid video file (MP4, MOV, or AVI)');
      return false;
    }
  };

  const uploadMediaFiles = async () => {
    setUploadProgress(0);
    let updatedContent = {...content};
    
    // Upload videos if they exist
    if (contentType === 'video' && hookVideo) {
      setUploadProgress(10);
      const hookVideoUrl = await uploadVideo(hookVideo);
      updatedContent.hook.video = hookVideoUrl;
      setUploadProgress(30);
    }
    
    if (contentType === 'video' && mainVideo) {
      setUploadProgress(40);
      const mainVideoUrl = await uploadVideo(mainVideo);
      updatedContent.main.video = mainVideoUrl;
      setUploadProgress(60);
    }
    
    if (contentType === 'video' && fullVideo) {
      setUploadProgress(70);
      const fullVideoUrl = await uploadVideo(fullVideo);
      updatedContent.full.primaryContent.video = fullVideoUrl;
      setUploadProgress(90);
    }
    
    setUploadProgress(100);
    setContent(updatedContent);
    return updatedContent;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Update content type
      let updatedContent = {
        ...content,
        contentType: contentType
      };
      setContent(updatedContent);
      
      // Upload media files and get updated content
      updatedContent = await uploadMediaFiles();
      
      // Create the content in Firestore using the updated content
      await createContent(updatedContent);
      
      // Navigate back to the feed
      setActivePage('forYou');
      
    } catch (error) {
      console.error('Error creating content:', error);
      setError('Failed to create content. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Custom color scheme - rich gradient with complementary accents
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
  
  return (
    <div 
      className="min-h-screen w-full flex flex-col" 
      style={{ 
        background: colors.gradient,
        color: colors.text,
        fontFamily: "'Inter', system-ui, sans-serif"
      }}
    >
      {/* Header with custom styling */}
      <header className="py-4 px-4 sm:px-6 flex justify-between items-center border-b" style={{ borderColor: colors.border }}>
        <div className="text-xl font-semibold tracking-tight" style={{ color: colors.accent2 }}>
          Symposium
        </div>
        <button 
          className="text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-colors"
          style={{ 
            background: colors.accent1,
            color: "#1A1A2E", 
            fontWeight: 500
          }}
          onClick={() => setActivePage('forYou')}
        >
          Close
        </button>
      </header>
      
      {/* Progress indicator with custom styling */}
      <div className="px-4 sm:px-8 py-4 sm:py-6">
        <div className="flex justify-between items-center mb-6 relative max-w-3xl mx-auto">
          {/* Line connecting steps */}
          <div className="absolute h-px w-full top-4 left-0" style={{ background: colors.border, zIndex: 0 }}></div>
          
          {steps.map((step, index) => (
            <div key={step} className="flex flex-col items-center relative z-10">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all duration-200"
                style={{ 
                  background: index < activeStep ? colors.accent2 : 
                             index === activeStep ? colors.accent1 : 
                             colors.surface2,
                  color: (index < activeStep || index === activeStep) ? "#1A1A2E" : colors.text,
                  boxShadow: "0 0 0 4px rgba(10, 15, 30, 0.5)",
                  transform: index === activeStep ? 'scale(1.1)' : 'scale(1)'
                }}
              >
                {index < activeStep ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <div 
                className="text-sm hidden sm:block" 
                style={{ 
                  color: index === activeStep ? colors.accent1 : colors.textSecondary,
                  fontWeight: index === activeStep ? 600 : 400
                }}
              >
                {step}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Content area */}
      <div {...swipeHandlers} className="flex-1 px-4 sm:px-6 py-4 overflow-y-auto">
        <div 
          className="max-w-3xl mx-auto rounded-xl p-4 sm:p-6 backdrop-blur-sm" 
          style={{ 
            background: "rgba(255, 255, 255, 0.03)",
            borderLeft: `3px solid ${colors.accent1}`,
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)"
          }}
        >
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{steps[activeStep]}</h2>
            <p style={{ color: colors.textSecondary }} className="mt-1 text-sm sm:text-base">
              {activeStep === 0
                ? "This is your attention-grabbing introduction (30-60 seconds)"
                : activeStep === 1
                ? "Elaborate on your key points (3-5 minutes)"
                : "Provide comprehensive analysis and references (8-15 minutes)"
              }
            </p>
          </div>
          
          <form onSubmit={activeStep === 2 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }} className="space-y-6">
            {/* Basic Information (only on first step) */}
            {activeStep === 0 && (
              <div 
                className="mb-6 p-4 sm:p-5 rounded-lg" 
                style={{ background: colors.surface1 }}
              >
                <h3 className="text-lg font-medium mb-4">Basic Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Topic</label>
                    <input 
                      type="text" 
                      placeholder="E.g., Double slit experiment" 
                      className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 transition-shadow"
                      style={{ 
                        background: colors.surface2,
                        border: `1px solid ${colors.border}`,
                        color: colors.text,
                        focusRing: colors.accent1
                      }}
                      value={content.topic}
                      onChange={(e) => handleChange('base', 'topic', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Discipline</label>
                    <select 
                      className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 transition-shadow appearance-none"
                      style={{ 
                        background: colors.surface2,
                        border: `1px solid ${colors.border}`,
                        color: colors.text,
                        focusRing: colors.accent1
                      }}
                      value={content.discipline}
                      onChange={(e) => handleChange('base', 'discipline', e.target.value)}
                      required
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
                        value={content.complexity}
                        onChange={(e) => handleChange('base', 'complexity', parseInt(e.target.value))}
                        className="w-full mr-3"
                        style={{ accentColor: colors.accent2 }}
                      />
                      <span className="text-sm font-medium w-8 text-center">{content.complexity}</span>
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
                  type="button"
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
                  type="button"
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
                        Hook Text <span style={{ color: colors.textSecondary }}>(60-90 seconds of reading)</span>
                      </label>
                      <textarea 
                        rows="5" 
                        placeholder="Write your attention-grabbing introduction here..."
                        className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                        style={{ 
                          background: colors.surface2,
                          border: `1px solid ${colors.border}`,
                          color: colors.text,
                          focusRing: colors.accent1
                        }}
                        value={content.hook.text}
                        onChange={(e) => handleChange('hook', 'text', e.target.value)}
                        required={contentType === 'text'}
                      ></textarea>
                    </div>
                  )}
                  
                  {activeStep === 1 && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Main Text <span style={{ color: colors.textSecondary }}>(3-5 minutes of reading)</span>
                        </label>
                        <textarea 
                          rows="8" 
                          placeholder="Elaborate on your key points here..."
                          className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                          style={{ 
                            background: colors.surface2,
                            border: `1px solid ${colors.border}`,
                            color: colors.text
                          }}
                          value={content.main.text}
                          onChange={(e) => handleChange('main', 'text', e.target.value)}
                          required={contentType === 'text'}
                        ></textarea>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Key Points</label>
                        <div className="space-y-2">
                          {content.main.keyPoints.map((keyPoint, index) => (
                            <div key={index} className="flex gap-2">
                              <input 
                                type="text" 
                                placeholder={`Key point ${index + 1}`} 
                                className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                                style={{ 
                                  background: colors.surface2,
                                  border: `1px solid ${colors.border}`,
                                  color: colors.text
                                }}
                                value={keyPoint}
                                onChange={(e) => handleChangeKeyPoint(index, e.target.value)}
                              />
                              {index > 0 && (
                                <button 
                                  type="button"
                                  onClick={() => handleRemoveKeyPoint(index)}
                                  className="p-2 rounded-md"
                                  style={{ background: colors.surface2, color: colors.textSecondary }}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              )}
                            </div>
                          ))}
                          <button 
                            type="button"
                            style={{ color: colors.accent2 }} 
                            className="text-sm flex items-center hover:opacity-80 transition-opacity"
                            onClick={handleAddKeyPoint}
                          >
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
                          Full Text <span style={{ color: colors.textSecondary }}>(8-15 minutes of reading)</span>
                        </label>
                        <textarea 
                          rows="12" 
                          placeholder="Provide your comprehensive analysis here..."
                          className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                          style={{ 
                            background: colors.surface2,
                            border: `1px solid ${colors.border}`,
                            color: colors.text
                          }}
                          value={content.full.primaryContent.text}
                          onChange={(e) => handlePrimaryContentChange('text', e.target.value)}
                          required={contentType === 'text'}
                        ></textarea>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">References</label>
                        <div className="space-y-2">
                          {content.full.references.map((reference, index) => (
                            <div key={index} className="flex gap-2">
                              <input 
                                type="text" 
                                placeholder="Reference text" 
                                className="flex-1 px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                                style={{ 
                                  background: colors.surface2,
                                  border: `1px solid ${colors.border}`,
                                  color: colors.text
                                }}
                                value={reference.text}
                                onChange={(e) => handleChangeReference(index, 'text', e.target.value)}
                              />
                              <input 
                                type="text" 
                                placeholder="URL (optional)" 
                                className="flex-1 px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                                style={{ 
                                  background: colors.surface2,
                                  border: `1px solid ${colors.border}`,
                                  color: colors.text
                                }}
                                value={reference.url}
                                onChange={(e) => handleChangeReference(index, 'url', e.target.value)}
                              />
                              <button 
                                type="button"
                                onClick={() => handleRemoveReference(index)}
                                className="p-2 rounded-md"
                                style={{ background: colors.surface2, color: colors.textSecondary }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ))}
                          <button 
                            type="button"
                            style={{ color: colors.accent2 }} 
                            className="text-sm flex items-center hover:opacity-80 transition-opacity"
                            onClick={handleAddReference}
                          >
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
                    <input
                      id="video-upload"
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (activeStep === 0) {
                          handleFileUpload(file, setHookVideo);
                        } else if (activeStep === 1) {
                          handleFileUpload(file, setMainVideo);
                        } else {
                          handleFileUpload(file, setFullVideo);
                        }
                      }}
                    />
                    <label 
                      htmlFor="video-upload"
                      className="px-4 py-2 rounded-md transition-colors inline-block cursor-pointer"
                      style={{ 
                        background: colors.accent1,
                        color: "#1A1A2E",
                        fontWeight: 500
                      }}
                    >
                      Select Video
                    </label>
                  </div>
                  
                  {((activeStep === 0 && hookVideo) || 
                    (activeStep === 1 && mainVideo) || 
                    (activeStep === 2 && fullVideo)) && (
                    <div className="mt-2 text-sm" style={{ color: colors.accent2 }}>
                      Video selected: {
                        activeStep === 0 ? hookVideo?.name :
                        activeStep === 1 ? mainVideo?.name :
                        fullVideo?.name
                      }
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Video Caption (optional)</label>
                    <textarea 
                      rows="3" 
                      placeholder="Add a caption to your video..."
                      className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                      style={{ 
                        background: colors.surface2,
                        border: `1px solid ${colors.border}`,
                        color: colors.text
                      }}
                      value={
                        activeStep === 0 ? content.hook.text :
                        activeStep === 1 ? content.main.text :
                        content.full.primaryContent.text
                      }
                      onChange={(e) => {
                        if (activeStep === 0) {
                          handleChange('hook', 'text', e.target.value);
                        } else if (activeStep === 1) {
                          handleChange('main', 'text', e.target.value);
                        } else {
                          handlePrimaryContentChange('text', e.target.value);
                        }
                      }}
                    ></textarea>
                  </div>
                </div>
              )}
            </div>
            
            {/* Display errors if any */}
            {error && (
              <div className="mt-4 text-sm p-2 rounded-md" style={{ background: "rgba(255, 50, 50, 0.1)", color: "#ff6b6b", border: "1px solid rgba(255, 50, 50, 0.2)" }}>
                {error}
              </div>
            )}
            
            {/* Footer / Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-opacity-90 backdrop-blur-sm" style={{ background: colors.surface1 }}>
              <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
                <button 
                  type="button"
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
                  type={activeStep === 2 ? "submit" : "button"}
                  className="px-4 py-2 rounded-md transition-colors"
                  style={{ 
                    background: activeStep === steps.length - 1 ? colors.accent2 : colors.accent1,
                    color: "#1A1A2E",
                    fontWeight: 500
                  }}
                  disabled={isSubmitting}
                  onClick={activeStep !== 2 ? handleNext : undefined}
                >
                  {activeStep === steps.length - 1 ? (isSubmitting ? 'Publishing...' : 'Submit') : 'Next'}
                </button>
              </div>
            </div>
            
            {isSubmitting && (
              <div className="fixed bottom-20 left-0 right-0 px-4">
                <div className="max-w-3xl mx-auto">
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-center text-sm mt-2">Uploading... {uploadProgress}%</p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadPage; 