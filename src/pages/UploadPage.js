import React, { useState, useEffect, useRef } from 'react';
import { createContent, uploadVideo } from '../services/contentService';
import { initialContentState, createUniqueId } from '../models/contentModel';
import { useNavigate } from 'react-router-dom';


const UploadPage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [contentType, setContentType] = useState('text');
  const [isMobile, setIsMobile] = useState(false);
  
  // Replace global video states with stage-specific states
  const [videoState, setVideoState] = useState({
    hook: {
      selectedVideo: null,
      videoPreviewUrl: '',
      uploadProgress: 0,
      isUploading: false,
      uploadSuccess: false,
      videoCaption: ''
    },
    main: {
      selectedVideo: null,
      videoPreviewUrl: '',
      uploadProgress: 0,
      isUploading: false,
      uploadSuccess: false,
      videoCaption: ''
    },
    full: {
      selectedVideo: null,
      videoPreviewUrl: '',
      uploadProgress: 0,
      isUploading: false,
      uploadSuccess: false,
      videoCaption: ''
    }
  });
  
  const [formData, setFormData] = useState({
    ...initialContentState,
    id: createUniqueId(),
  });
  const [submitStatus, setSubmitStatus] = useState({
    isSubmitting: false,
    success: false,
    error: ''
  });
  
  // Create refs for video inputs for each stage
  const videoInputRefs = {
    hook: useRef(null),
    main: useRef(null),
    full: useRef(null)
  };
  
  const steps = ['Hook', 'Main', 'Full'];
  
  // Get the current stage key based on activeStep
  const getCurrentStageKey = () => {
    return ['hook', 'main', 'full'][activeStep];
  };
  
  // Helper to update video state for a specific stage
  const updateVideoState = (stage, updates) => {
    setVideoState(prev => ({
      ...prev,
      [stage]: {
        ...prev[stage],
        ...updates
      }
    }));
  };
  
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
  
  // Handle changes to form inputs
  const handleInputChange = (field, value) => {
    // Update the form data based on field path
    setFormData(prevFormData => {
      const newFormData = { ...prevFormData };
      
      // Handle nested fields
      if (field.includes('.')) {
        const [section, subfield] = field.split('.');
        newFormData[section] = {
          ...newFormData[section],
          [subfield]: value
        };
      } else {
        // Handle top-level fields
        newFormData[field] = value;
      }
      
      return newFormData;
    });
  };
  
  // Check if the form is valid and submit button should be enabled
  const isFormValid = () => {
    // Based on activeStep, check if the current step has required fields filled
    if (activeStep === 0) {
      // Hook step - require either hook.text or hook.video
      return (formData.hook.text && formData.hook.text.trim() !== '') || 
             (formData.hook.video && formData.hook.video.trim() !== '') ||
             (videoState.hook.uploadSuccess);
    } 
    else if (activeStep === 1) {
      // Main step - require either main.text or main.video
      return (formData.main.text && formData.main.text.trim() !== '') || 
             (formData.main.video && formData.main.video.trim() !== '') ||
             (videoState.main.uploadSuccess);
    }
    else if (activeStep === 2) {
      // Full step - require either full.text or full.video
      return (formData.full.text && formData.full.text.trim() !== '') || 
             (formData.full.video && formData.full.video.trim() !== '') ||
             (videoState.full.uploadSuccess);
    }
    
    return false;
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Set submitting state
      setSubmitStatus({
        isSubmitting: true,
        success: false,
        error: ''
      });
      
      // Create content in Firebase
      await createContent(formData);
      
      // Update success state
      setSubmitStatus({
        isSubmitting: false,
        success: true,
        error: ''
      });
      
      // Redirect to home page after successful upload
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      console.error('Error creating content:', error);
      setSubmitStatus({
        isSubmitting: false,
        success: false,
        error: error.message || 'Failed to create content. Please try again.'
      });
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
              value={formData.topic}
              onChange={(e) => handleInputChange('topic', e.target.value)}
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
              value={formData.discipline}
              onChange={(e) => handleInputChange('discipline', e.target.value)}
            >
              <option value="">Select a discipline</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Environmental Science">Environmental Science</option>
              <option value="Astronomy">Astronomy</option>
              <option value="Engineering">Engineering</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Complexity Level (1-10)</label>
            <input 
              type="range" 
              min="1" 
              max="10" 
              className="w-full" 
              value={formData.complexity}
              onChange={(e) => handleInputChange('complexity', parseInt(e.target.value))}
            />
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
          className="grid grid-cols-2 gap-2 p-1 rounded-lg w-fit"
          style={{ background: colors.surface1 }}
        >
          <button
            className="py-3 px-6 rounded-md transition-all duration-200 flex flex-col items-center justify-center"
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
            className="py-3 px-6 rounded-md transition-all duration-200 flex flex-col items-center justify-center"
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
            value={formData.hook.text}
            onChange={(e) => handleInputChange('hook.text', e.target.value)}
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
              value={formData.main.text}
              onChange={(e) => handleInputChange('main.text', e.target.value)}
            ></textarea>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Key Points</label>
            <div className="space-y-2">
              {formData.main.keyPoints.map((point, index) => (
                <div key={index} className="flex">
                  <input 
                    type="text" 
                    placeholder={`Key point ${index + 1}`}
                    className={`w-full px-3 py-2 rounded-md focus:outline-none ${isMobile ? 'text-base' : ''}`}
                    style={{ 
                      background: colors.surface2,
                      border: `1px solid ${colors.border}`,
                      color: colors.text
                    }}
                    value={point}
                    onChange={(e) => {
                      const newKeyPoints = [...formData.main.keyPoints];
                      newKeyPoints[index] = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        main: {
                          ...prev.main,
                          keyPoints: newKeyPoints
                        }
                      }));
                    }}
                  />
                  {index > 0 && (
                    <button 
                      onClick={() => {
                        const newKeyPoints = [...formData.main.keyPoints];
                        newKeyPoints.splice(index, 1);
                        setFormData(prev => ({
                          ...prev,
                          main: {
                            ...prev.main,
                            keyPoints: newKeyPoints
                          }
                        }));
                      }}
                      className="ml-2 flex items-center justify-center w-8 h-8 rounded-full"
                      style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              
              <button 
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    main: {
                      ...prev.main,
                      keyPoints: [...prev.main.keyPoints, '']
                    }
                  }));
                }}
                className="flex items-center text-sm mt-2 px-3 py-1 rounded"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              >
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Key Point
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
              Full Content <span style={{ color: colors.textSecondary }}>{isMobile ? "(8-15 minutes)" : "(8-15 minutes of reading)"}</span>
            </label>
            <textarea 
              rows={isMobile ? "8" : "10"} 
              placeholder="Write your full, in-depth content here..."
              className={`w-full px-3 py-2 rounded-md focus:outline-none ${isMobile ? 'text-base' : ''}`}
              style={{ 
                background: colors.surface2,
                border: `1px solid ${colors.border}`,
                color: colors.text
              }}
              value={formData.full.text}
              onChange={(e) => handleInputChange('full.text', e.target.value)}
            ></textarea>
          </div>
          
          <div className="mt-6">
            <label className="flex justify-between items-center text-sm font-medium mb-1">
              <span>Content Sections</span>
            </label>
            
            <div className="space-y-4 mt-2">
              {formData.full.sections.map((section, index) => (
                <div key={index} className="p-3 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                  <div className="flex justify-between items-center mb-2">
                    <input 
                      type="text" 
                      placeholder="Section Title" 
                      className={`w-full px-3 py-2 rounded-md focus:outline-none ${isMobile ? 'text-base' : ''}`}
                      style={{ 
                        background: colors.surface2,
                        border: `1px solid ${colors.border}`,
                        color: colors.text
                      }}
                      value={section.title}
                      onChange={(e) => {
                        const newSections = [...formData.full.sections];
                        newSections[index].title = e.target.value;
                        setFormData(prev => ({
                          ...prev,
                          full: {
                            ...prev.full,
                            sections: newSections
                          }
                        }));
                      }}
                    />
                    
                    {index > 0 && (
                      <button 
                        onClick={() => {
                          const newSections = [...formData.full.sections];
                          newSections.splice(index, 1);
                          setFormData(prev => ({
                            ...prev,
                            full: {
                              ...prev.full,
                              sections: newSections
                            }
                          }));
                        }}
                        className="ml-2 flex items-center justify-center w-8 h-8 rounded-full"
                        style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  <textarea 
                    rows="4" 
                    placeholder="Section content..."
                    className={`w-full px-3 py-2 rounded-md focus:outline-none ${isMobile ? 'text-base' : ''}`}
                    style={{ 
                      background: colors.surface2,
                      border: `1px solid ${colors.border}`,
                      color: colors.text
                    }}
                    value={section.content}
                    onChange={(e) => {
                      const newSections = [...formData.full.sections];
                      newSections[index].content = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        full: {
                          ...prev.full,
                          sections: newSections
                        }
                      }));
                    }}
                  ></textarea>
                </div>
              ))}
              
              <button 
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    full: {
                      ...prev.full,
                      sections: [...prev.full.sections, { title: '', content: '' }]
                    }
                  }));
                }}
                className="flex items-center text-sm mt-2 px-3 py-1 rounded"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              >
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Section
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
    
    const handleVideoSelect = (event) => {
      const file = event.target.files[0];
      if (file) {
        updateVideoState(getCurrentStageKey(), {
          selectedVideo: file,
          videoPreviewUrl: URL.createObjectURL(file),
          uploadProgress: 0,
          uploadSuccess: false
        });
      }
    };
    
    const handleUploadVideo = async () => {
      const stage = getCurrentStageKey();
      const { selectedVideo } = videoState[stage];
      
      if (!selectedVideo) return;
      
      try {
        updateVideoState(stage, { isUploading: true });
        
        // Upload the video and get the URL
        const videoUrl = await uploadVideo(selectedVideo, (progress) => {
          updateVideoState(stage, { uploadProgress: progress });
        });
        
        // Update form data with the video URL based on current active step
        if (stage === 'hook') {
          handleInputChange('hook.video', videoUrl);
          handleInputChange('hook.duration', parseInt(videoState.hook.videoCaption) || 0);
        } 
        else if (stage === 'main') {
          handleInputChange('main.video', videoUrl);
          handleInputChange('main.duration', parseInt(videoState.main.videoCaption) || 0);
        }
        else if (stage === 'full') {
          handleInputChange('full.video', videoUrl);
          handleInputChange('full.duration', parseInt(videoState.full.videoCaption) || 0);
        }
        
        updateVideoState(stage, { 
          uploadSuccess: true,
          isUploading: false
        });
      } catch (error) {
        console.error('Error uploading video:', error);
        updateVideoState(stage, { isUploading: false });
      }
    };

    return (
      <div className="space-y-4">
        {!videoState[getCurrentStageKey()].videoPreviewUrl ? (
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
            <input
              type="file"
              accept="video/*"
              ref={videoInputRefs[getCurrentStageKey()]}
              className="hidden"
              onChange={handleVideoSelect}
            />
            <button 
              className={`px-4 py-2 rounded-md transition-colors ${isMobile ? 'text-sm' : ''}`}
              style={{ 
                background: colors.accent1,
                color: "#1A1A2E",
                fontWeight: isMobile ? 400 : 500
              }}
              onClick={() => videoInputRefs[getCurrentStageKey()].current.click()}
            >
              Select Video
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg overflow-hidden relative">
              <video 
                src={videoState[getCurrentStageKey()].videoPreviewUrl} 
                controls 
                className="w-full h-auto"
                style={{ maxHeight: "400px" }}
              />
              <button
                className="absolute top-3 right-3 p-2 rounded-full bg-black bg-opacity-60 hover:bg-opacity-80 transition-all"
                style={{
                  border: `1px solid ${colors.border}`,
                  color: colors.text,
                }}
                onClick={() => {
                  updateVideoState(getCurrentStageKey(), {
                    selectedVideo: null,
                    videoPreviewUrl: '',
                    uploadProgress: 0,
                    uploadSuccess: false
                  });
                }}
                disabled={videoState[getCurrentStageKey()].isUploading}
                title="Change video"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                className={`flex items-center justify-center px-5 py-3 rounded-md transition-colors w-full md:w-auto ${isMobile ? 'text-base' : 'text-base font-medium'}`}
                style={{ 
                  background: videoState[getCurrentStageKey()].uploadSuccess ? 'rgba(16, 185, 129, 0.2)' : colors.accent2,
                  color: videoState[getCurrentStageKey()].uploadSuccess ? '#10B981' : "#1A1A2E",
                  fontWeight: 500,
                  opacity: videoState[getCurrentStageKey()].isUploading || videoState[getCurrentStageKey()].uploadSuccess ? 0.7 : 1,
                  cursor: videoState[getCurrentStageKey()].isUploading || videoState[getCurrentStageKey()].uploadSuccess ? 'not-allowed' : 'pointer',
                  boxShadow: videoState[getCurrentStageKey()].uploadSuccess ? 'none' : '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
                onClick={handleUploadVideo}
                disabled={videoState[getCurrentStageKey()].isUploading || videoState[getCurrentStageKey()].uploadSuccess}
              >
                {videoState[getCurrentStageKey()].isUploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </>
                ) : videoState[getCurrentStageKey()].uploadSuccess ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Uploaded
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Upload This Video
                  </>
                )}
              </button>
            </div>
            
            {videoState[getCurrentStageKey()].isUploading && (
              <div className="mt-2">
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                    style={{ 
                      width: `${videoState[getCurrentStageKey()].uploadProgress}%`,
                      backgroundColor: colors.accent2 
                    }}
                  ></div>
                </div>
                <p className="text-center text-sm mt-1" style={{ color: colors.textSecondary }}>
                  {Math.round(videoState[getCurrentStageKey()].uploadProgress)}% Complete
                </p>
              </div>
            )}
            
            {!videoState[getCurrentStageKey()].isUploading && videoState[getCurrentStageKey()].uploadSuccess && (
              <div className="mt-2 py-2 px-3 rounded-md flex items-center" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#10B981' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm font-medium" style={{ color: '#10B981' }}>
                  Video uploaded successfully!
                </p>
              </div>
            )}
          </div>
        )}
        
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
            value={videoState[getCurrentStageKey()].videoCaption}
            onChange={(e) => updateVideoState(getCurrentStageKey(), { videoCaption: e.target.value })}
            disabled={videoState[getCurrentStageKey()].isUploading}
          ></textarea>
        </div>

        {/* Video Duration */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">Video Duration (in seconds)</label>
          <input 
            type="number" 
            placeholder="Enter video duration"
            className={`w-full px-3 py-2 rounded-md focus:outline-none ${isMobile ? 'text-base' : ''}`}
            style={{ 
              background: colors.surface2,
              border: `1px solid ${colors.border}`,
              color: colors.text
            }}
            value={videoState[getCurrentStageKey()].videoCaption}
            onChange={(e) => updateVideoState(getCurrentStageKey(), { videoCaption: e.target.value })}
          />
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
          className={isMobile ? "p-4 rounded-lg" : "p-5 rounded-lg"} 
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
    const nextBtnClass = `flex items-center justify-center px-4 py-2 rounded-full font-semibold transition-all duration-300 ${isMobile ? 'text-sm' : ''}`;
    const backBtnClass = `flex items-center justify-center px-4 py-2 rounded-full transition-all duration-300 ${isMobile ? 'text-sm' : ''}`;
    const contentClass = `flex items-center ${isMobile ? 'fixed bottom-0 left-0 right-0 z-10 px-4 py-3' : 'px-6 py-4'} bg-gradient-to-b from-transparent to-[#151529]`;
    
    // Check if current step is valid
    const isCurrentStepValid = isFormValid();
    
    // If submission is successful, show success message
    if (submitStatus.success) {
      return (
        <div className={contentClass}>
          <div className="w-full flex items-center justify-center">
            <div className="flex items-center bg-green-500 text-white py-3 px-5 rounded-lg">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Content uploaded successfully! Redirecting...
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div 
        className={isMobile ? "fixed bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-[#121225] to-transparent pb-5" : "relative"}
        style={{ 
          paddingTop: isMobile ? "2.5rem" : 0,
        }}
      >
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
            <div className="flex justify-center items-center">
              <div className="font-medium">{activeStep + 1} / {steps.length}</div>
            </div>
          </div>
          
          {activeStep === steps.length - 1 ? (
            <button 
              onClick={handleSubmit}
              disabled={!isCurrentStepValid || submitStatus.isSubmitting}
              className={nextBtnClass}
              style={{ 
                background: !isCurrentStepValid ? 'rgba(255, 255, 255, 0.1)' : colors.accent2,
                color: !isCurrentStepValid ? 'rgba(255, 255, 255, 0.3)' : "#1A1A2E",
                cursor: !isCurrentStepValid || submitStatus.isSubmitting ? 'not-allowed' : 'pointer',
                opacity: !isCurrentStepValid ? 0.7 : 1
              }}
            >
              {submitStatus.isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {!isMobile && <span className="ml-1">Submitting...</span>}
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {!isMobile && <span className="ml-2">Submit</span>}
                </>
              )}
            </button>
          ) : (
            <button 
              onClick={handleNext}
              className={nextBtnClass}
              style={{ 
                background: colors.accent1,
                color: "#1A1A2E"
              }}
            >
              <>
                {!isMobile && <span className="mr-2">Next</span>}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            </button>
          )}
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