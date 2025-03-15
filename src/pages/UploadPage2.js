import React, { useState, useRef, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable'; // A popular library to handle swipe events (npm i react-swipeable)

const UploadPage2 = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [contentType, setContentType] = useState('text');

  const steps = ['Hook', 'Main', 'Full'];

  // Swipe handlers from react-swipeable
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handleBack(),
    preventScrollOnSwipe: true,
  });

  const handleNext = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  // Custom color scheme - same as your original
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

  // A helper to show recommended reading / video length
  const getStepRecommendation = () => {
    if (activeStep === 0) return contentType === 'text' ? "30-60 sec reading" : "30-60 sec video";
    if (activeStep === 1) return contentType === 'text' ? "3-5 min reading" : "3-5 min video";
    return contentType === 'text' ? "8-15 min reading" : "8-15 min video";
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{
        background: colors.gradient,
        color: colors.text,
        fontFamily: "'Inter', system-ui, sans-serif",
        position: "relative"
      }}
    >
      {/* Header with custom styling */}
      <header
        className="py-5 px-6 flex justify-between items-center border-b"
        style={{ borderColor: colors.border }}
      >
        <div
          className="text-xl font-semibold tracking-tight"
          style={{ color: colors.accent2 }}
        >
          Symposium
        </div>
        <button
          className="text-sm px-4 py-2 rounded-full transition-colors"
          style={{
            background: colors.accent1,
            color: "#1A1A2E",
            fontWeight: 500
          }}
        >
          Close
        </button>
      </header>

      {/* Swipeable Steps Container */}
      <div
        {...swipeHandlers}
        className="flex-1 px-4 py-2 overflow-x-hidden"
        style={{
          // In a real app, you might animate left-right transitions with CSS
          // or use something like Framer Motion for smooth transitions
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Step Indicator (compact) */}
        <div className="flex items-center justify-center mt-4 mb-4">
          {steps.map((step, index) => (
            <div
              key={step}
              className="flex flex-col items-center mx-2"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  background:
                    index === activeStep ? colors.accent1 : colors.surface2,
                  boxShadow:
                    index === activeStep ? `0 0 6px ${colors.accent1}` : "none",
                }}
              />
            </div>
          ))}
        </div>

        {/* Step Title and Recommendation */}
        <div className="max-w-2xl mx-auto text-center mb-4">
          <h2 className="text-2xl font-bold tracking-tight">
            {steps[activeStep]}
          </h2>
          <p style={{ color: colors.textSecondary }} className="mt-1">
            Recommendation: {getStepRecommendation()}
          </p>
        </div>

        {/* Conditionally render each step’s content */}
        <div className="max-w-2xl w-full mx-auto mb-20">
          {activeStep === 0 && (
            <StepHook
              colors={colors}
              contentType={contentType}
              setContentType={setContentType}
            />
          )}
          {activeStep === 1 && (
            <StepMain
              colors={colors}
              contentType={contentType}
              setContentType={setContentType}
            />
          )}
          {activeStep === 2 && (
            <StepFull
              colors={colors}
              contentType={contentType}
              setContentType={setContentType}
            />
          )}
        </div>
      </div>

      {/* Fixed Bottom Navigation */}
      <nav
        className="w-full flex justify-between items-center px-6 py-3"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          background: colors.surface1,
          borderTop: `1px solid ${colors.border}`
        }}
      >
        <button
          onClick={handleBack}
          disabled={activeStep === 0}
          className="px-4 py-2 rounded-md transition-colors"
          style={{
            background:
              activeStep === 0 ? 'rgba(255, 255, 255, 0.05)' : colors.surface2,
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
            background:
              activeStep === steps.length - 1 ? colors.accent2 : colors.accent1,
            color: "#1A1A2E",
            fontWeight: 500
          }}
        >
          {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
        </button>
      </nav>
    </div>
  );
};

/**
 * Step components can be extracted for clarity.
 * Each has a consistent layout, with differences in
 * text vs video input fields.
 */
const StepHook = ({ colors, contentType, setContentType }) => {
  return (
    <div
      className="rounded-xl p-4 mb-6"
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        borderLeft: `3px solid ${colors.accent1}`,
      }}
    >
      <h3 className="text-lg font-medium mb-4">Basic Information</h3>
      {/* Basic Info Fields */}
      <div className="space-y-4 mb-6">
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
          <div
            className="flex justify-between text-xs mt-1"
            style={{ color: colors.textSecondary }}
          >
            <span>Introductory</span>
            <span>Advanced</span>
          </div>
        </div>
      </div>

      {/* Content Type Selection */}
      <label className="block text-sm font-medium mb-2">Content Type</label>
      <div className="flex p-1 rounded-lg w-fit" style={{ background: colors.surface1 }}>
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

      {/* Hook Content Fields */}
      <div
        className="p-4 rounded-lg mt-4"
        style={{ background: colors.surface1 }}
      >
        <h4 className="text-md font-medium mb-2">Hook Content</h4>
        {contentType === 'text' ? (
          <textarea
            rows="5"
            placeholder="Write your attention-grabbing introduction..."
            className="w-full px-3 py-2 rounded-md focus:outline-none"
            style={{
              background: colors.surface2,
              border: `1px solid ${colors.border}`,
              color: colors.text
            }}
          ></textarea>
        ) : (
          <VideoUpload colors={colors} step="Hook" />
        )}
      </div>
    </div>
  );
};

const StepMain = ({ colors, contentType, setContentType }) => {
  return (
    <div
      className="rounded-xl p-4 mb-6"
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        borderLeft: `3px solid ${colors.accent1}`,
      }}
    >
      {/* Content Type Selection */}
      <label className="block text-sm font-medium mb-2">Content Type</label>
      <div className="flex p-1 rounded-lg w-fit" style={{ background: colors.surface1 }}>
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

      {/* Main Content Fields */}
      <div
        className="p-4 rounded-lg mt-4"
        style={{ background: colors.surface1 }}
      >
        <h4 className="text-md font-medium mb-2">Main Content</h4>
        {contentType === 'text' ? (
          <>
            <textarea
              rows="7"
              placeholder="Elaborate your key points..."
              className="w-full px-3 py-2 rounded-md focus:outline-none"
              style={{
                background: colors.surface2,
                border: `1px solid ${colors.border}`,
                color: colors.text
              }}
            ></textarea>
            
            {/* Key Points */}
            <div className="mt-4">
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
                <button
                  style={{ color: colors.accent2 }}
                  className="text-sm flex items-center hover:opacity-80 transition-opacity"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add another key point
                </button>
              </div>
            </div>
          </>
        ) : (
          <VideoUpload colors={colors} step="Main" />
        )}
      </div>
    </div>
  );
};

const StepFull = ({ colors, contentType, setContentType }) => {
  return (
    <div
      className="rounded-xl p-4 mb-6"
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        borderLeft: `3px solid ${colors.accent1}`,
      }}
    >
      {/* Content Type Selection */}
      <label className="block text-sm font-medium mb-2">Content Type</label>
      <div className="flex p-1 rounded-lg w-fit" style={{ background: colors.surface1 }}>
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

      {/* Full Content Fields */}
      <div
        className="p-4 rounded-lg mt-4"
        style={{ background: colors.surface1 }}
      >
        <h4 className="text-md font-medium mb-2">Full Content</h4>
        {contentType === 'text' ? (
          <>
            <textarea
              rows="10"
              placeholder="Provide comprehensive analysis..."
              className="w-full px-3 py-2 rounded-md focus:outline-none"
              style={{
                background: colors.surface2,
                border: `1px solid ${colors.border}`,
                color: colors.text
              }}
            ></textarea>

            {/* References */}
            <div className="mt-4">
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
                <button
                  style={{ color: colors.accent2 }}
                  className="text-sm flex items-center hover:opacity-80 transition-opacity"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add another reference
                </button>
              </div>
            </div>
          </>
        ) : (
          <VideoUpload colors={colors} step="Full" />
        )}
      </div>
    </div>
  );
};

/**
 * Simple VideoUpload component that can be reused.
 */
const VideoUpload = ({ colors, step }) => {
  return (
    <div className="space-y-4">
      <div
        className="border-2 border-dashed rounded-lg p-10 text-center"
        style={{ borderColor: colors.border }}
      >
        <div className="mb-4 inline-flex items-center justify-center" style={{ color: colors.accent2 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-14 w-14"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <div className="text-lg font-medium mb-1">Upload your {step} video</div>
        <div
          className="text-sm mb-4"
          style={{ color: colors.textSecondary }}
        >
          {step === "Hook"
            ? "30-60 seconds recommended"
            : step === "Main"
            ? "3-5 minutes recommended"
            : "8-15 minutes recommended"}
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
          placeholder="Add a caption..."
          className="w-full px-3 py-2 rounded-md focus:outline-none"
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

export default UploadPage2;
