import React, { useState } from 'react';
import { createContent, uploadVideo, uploadImage } from '../services/contentService';
import { initialContentState, createUniqueId } from '../models/contentModel';

const UploadPage = ({ setActivePage }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [content, setContent] = useState({...initialContentState, id: createUniqueId()});
  const [hookMediaType, setHookMediaType] = useState('text');
  const [mainMediaType, setMainMediaType] = useState('text');
  const [fullMediaType, setFullMediaType] = useState('text');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // File uploads
  const [hookVideo, setHookVideo] = useState(null);
  const [mainVideo, setMainVideo] = useState(null);
  const [fullVideo, setFullVideo] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const steps = [
    { title: 'Hook', description: 'Create a short, attention-grabbing hook' },
    { title: 'Main', description: 'Expand on your idea with key points' },
    { title: 'Full', description: 'Provide complete details and references' }
  ];

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

  const handleAddSection = () => {
    setContent({
      ...content,
      full: {
        ...content.full,
        sections: [...content.full.sections, { title: '', content: '' }]
      }
    });
  };

  const handleChangeSection = (index, field, value) => {
    const newSections = [...content.full.sections];
    newSections[index] = {
      ...newSections[index],
      [field]: value
    };
    setContent({
      ...content,
      full: {
        ...content.full,
        sections: newSections
      }
    });
  };

  const handleRemoveSection = (index) => {
    const newSections = [...content.full.sections];
    newSections.splice(index, 1);
    setContent({
      ...content,
      full: {
        ...content.full,
        sections: newSections
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

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
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
    if (hookMediaType === 'video' && hookVideo) {
      setUploadProgress(10);
      const hookVideoUrl = await uploadVideo(hookVideo);
      updatedContent.hook.video = hookVideoUrl;
      setUploadProgress(30);
    }
    
    if (mainMediaType === 'video' && mainVideo) {
      setUploadProgress(40);
      const mainVideoUrl = await uploadVideo(mainVideo);
      updatedContent.main.video = mainVideoUrl;
      setUploadProgress(60);
    }
    
    if (fullMediaType === 'video' && fullVideo) {
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
      // Update content type from the hook media type
      let updatedContent = {
        ...content,
        contentType: hookMediaType
      };
      setContent(updatedContent);
      
      // Upload media files and get updated content
      updatedContent = await uploadMediaFiles();
      updatedContent.contentType = hookMediaType;
      
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

  const renderHookStep = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Topic</label>
          <input 
            type="text"
            className="w-full p-2 border rounded bg-gray-800 text-white border-gray-600"
            placeholder="E.g., Double Slit Experiment"
            value={content.topic}
            onChange={(e) => handleChange('base', 'topic', e.target.value)}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Discipline</label>
          <input 
            type="text"
            className="w-full p-2 border rounded bg-gray-800 text-white border-gray-600"
            placeholder="E.g., Physics"
            value={content.discipline}
            onChange={(e) => handleChange('base', 'discipline', e.target.value)}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Complexity (1-10)</label>
          <input 
            type="range"
            min="1"
            max="10"
            className="w-full"
            value={content.complexity}
            onChange={(e) => handleChange('base', 'complexity', parseInt(e.target.value))}
          />
          <div className="flex justify-between text-xs">
            <span>Simple</span>
            <span>Complex</span>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-700 pt-6">
        <label className="block text-sm font-medium mb-2">Hook Media Type</label>
        <div className="flex space-x-4 mb-4">
          <button
            type="button"
            className={`px-4 py-2 rounded ${hookMediaType === 'text' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setHookMediaType('text')}
          >
            Text
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded ${hookMediaType === 'video' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setHookMediaType('video')}
          >
            Video
          </button>
        </div>
        
        {hookMediaType === 'text' ? (
          <div>
            <label className="block text-sm font-medium mb-1">Hook Text</label>
            <textarea 
              className="w-full p-2 border rounded bg-gray-800 text-white border-gray-600"
              placeholder="Enter an attention-grabbing hook (max 150 chars)"
              rows="3"
              maxLength="150"
              value={content.hook.text}
              onChange={(e) => handleChange('hook', 'text', e.target.value)}
              required
            />
            <div className="text-right text-xs text-gray-400">
              {content.hook.text.length}/150
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium mb-1">Upload Hook Video</label>
            <input
              type="file"
              accept="video/*"
              className="w-full p-2 border rounded bg-gray-800 text-white border-gray-600"
              onChange={(e) => handleFileUpload(e.target.files[0], setHookVideo)}
            />
            {hookVideo && (
              <div className="mt-2 text-sm text-green-400">
                Video selected: {hookVideo.name}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const renderMainStep = () => (
    <div className="space-y-6">
      <div className="border-b border-gray-700 pb-6">
        <label className="block text-sm font-medium mb-2">Main Content Media Type</label>
        <div className="flex space-x-4 mb-4">
          <button
            type="button"
            className={`px-4 py-2 rounded ${mainMediaType === 'text' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setMainMediaType('text')}
          >
            Text
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded ${mainMediaType === 'video' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setMainMediaType('video')}
          >
            Video
          </button>
        </div>
        
        {mainMediaType === 'text' ? (
          <div>
            <label className="block text-sm font-medium mb-1">Main Content</label>
            <textarea 
              className="w-full p-2 border rounded bg-gray-800 text-white border-gray-600"
              placeholder="Expand on your hook with the main content"
              rows="5"
              value={content.main.text}
              onChange={(e) => handleChange('main', 'text', e.target.value)}
              required
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium mb-1">Upload Main Video</label>
            <input
              type="file"
              accept="video/*"
              className="w-full p-2 border rounded bg-gray-800 text-white border-gray-600"
              onChange={(e) => handleFileUpload(e.target.files[0], setMainVideo)}
            />
            {mainVideo && (
              <div className="mt-2 text-sm text-green-400">
                Video selected: {mainVideo.name}
              </div>
            )}
          </div>
        )}
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium">Key Points</label>
          <button
            type="button"
            className="text-blue-400 text-sm"
            onClick={handleAddKeyPoint}
          >
            + Add Key Point
          </button>
        </div>
        
        {content.main.keyPoints.map((point, index) => (
          <div key={index} className="flex items-center mb-2">
            <input 
              type="text"
              className="flex-grow p-2 border rounded bg-gray-800 text-white border-gray-600"
              placeholder={`Key point #${index + 1}`}
              value={point}
              onChange={(e) => handleChangeKeyPoint(index, e.target.value)}
            />
            {content.main.keyPoints.length > 1 && (
              <button
                type="button"
                className="ml-2 text-red-400"
                onClick={() => handleRemoveKeyPoint(index)}
              >
                &times;
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderFullStep = () => (
    <div className="space-y-6">
      <div className="border-b border-gray-700 pb-6">
        <label className="block text-sm font-medium mb-2">Full Content Media Type</label>
        <div className="flex space-x-4 mb-4">
          <button
            type="button"
            className={`px-4 py-2 rounded ${fullMediaType === 'text' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setFullMediaType('text')}
          >
            Text
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded ${fullMediaType === 'video' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setFullMediaType('video')}
          >
            Video
          </button>
        </div>
        
        {fullMediaType === 'text' ? (
          <div>
            <label className="block text-sm font-medium mb-1">Primary Content</label>
            <textarea 
              className="w-full p-2 border rounded bg-gray-800 text-white border-gray-600"
              placeholder="Provide the detailed content for the full view"
              rows="5"
              value={content.full.primaryContent.text}
              onChange={(e) => handlePrimaryContentChange('text', e.target.value)}
              required
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium mb-1">Upload Full Content Video</label>
            <input
              type="file"
              accept="video/*"
              className="w-full p-2 border rounded bg-gray-800 text-white border-gray-600"
              onChange={(e) => handleFileUpload(e.target.files[0], setFullVideo)}
            />
            {fullVideo && (
              <div className="mt-2 text-sm text-green-400">
                Video selected: {fullVideo.name}
              </div>
            )}
          </div>
        )}
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium">Sections</label>
          <button
            type="button"
            className="text-blue-400 text-sm"
            onClick={handleAddSection}
          >
            + Add Section
          </button>
        </div>
        
        {content.full.sections.map((section, index) => (
          <div key={index} className="mb-4 border border-gray-700 rounded p-3">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium">Section {index + 1}</h4>
              {content.full.sections.length > 1 && (
                <button
                  type="button"
                  className="text-red-400"
                  onClick={() => handleRemoveSection(index)}
                >
                  &times;
                </button>
              )}
            </div>
            
            <input 
              type="text"
              className="w-full p-2 border rounded mb-2 bg-gray-800 text-white border-gray-600"
              placeholder="Section Title"
              value={section.title}
              onChange={(e) => handleChangeSection(index, 'title', e.target.value)}
            />
            
            <textarea 
              className="w-full p-2 border rounded bg-gray-800 text-white border-gray-600"
              placeholder="Section Content"
              rows="3"
              value={section.content}
              onChange={(e) => handleChangeSection(index, 'content', e.target.value)}
            />
          </div>
        ))}
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium">References</label>
          <button
            type="button"
            className="text-blue-400 text-sm"
            onClick={handleAddReference}
          >
            + Add Reference
          </button>
        </div>
        
        {content.full.references.length === 0 && (
          <p className="text-sm text-gray-400 mb-2">No references added yet</p>
        )}
        
        {content.full.references.map((reference, index) => (
          <div key={index} className="flex items-start mb-2">
            <div className="flex-grow">
              <input 
                type="text"
                className="w-full p-2 border rounded mb-1 bg-gray-800 text-white border-gray-600"
                placeholder="Reference Text"
                value={reference.text}
                onChange={(e) => handleChangeReference(index, 'text', e.target.value)}
              />
              <input 
                type="url"
                className="w-full p-2 border rounded bg-gray-800 text-white border-gray-600"
                placeholder="URL (optional)"
                value={reference.url}
                onChange={(e) => handleChangeReference(index, 'url', e.target.value)}
              />
            </div>
            <button
              type="button"
              className="ml-2 text-red-400"
              onClick={() => handleRemoveReference(index)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-full bg-gray-900 text-white pt-6 overflow-y-auto">
      <div className="container mx-auto px-4 max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Create Post</h1>
          <button 
            className="text-gray-400"
            onClick={() => setActivePage('forYou')}
          >
            Cancel
          </button>
        </div>
        
        {/* Progress Tracker */}
        <div className="flex mb-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`flex-1 text-center ${index < currentStep ? 'text-green-400' : index === currentStep ? 'text-white' : 'text-gray-500'}`}
            >
              <div className="relative">
                <div className={`h-2 ${index < steps.length - 1 ? 'w-full' : 'w-1/2'} ${index < currentStep ? 'bg-green-400' : 'bg-gray-700'} absolute top-3 left-0`}></div>
                {index < steps.length - 1 && (
                  <div className={`h-2 w-1/2 ${index < currentStep ? 'bg-green-400' : 'bg-gray-700'} absolute top-3 left-1/2`}></div>
                )}
                <div className={`w-7 h-7 mx-auto rounded-full flex items-center justify-center border-2 ${index <= currentStep ? 'border-blue-500 bg-blue-500' : 'border-gray-500 bg-gray-700'} relative z-10`}>
                  {index < currentStep ? '✓' : index + 1}
                </div>
              </div>
              <div className="mt-2 text-sm">{step.title}</div>
            </div>
          ))}
        </div>
        
        {error && (
          <div className="bg-red-500 bg-opacity-20 border border-red-400 text-red-300 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {currentStep === 0 && renderHookStep()}
          {currentStep === 1 && renderMainStep()}
          {currentStep === 2 && renderFullStep()}
          
          <div className="mt-8 flex justify-between">
            {currentStep > 0 ? (
              <button
                type="button"
                className="px-6 py-2 border border-gray-500 rounded"
                onClick={handlePrevious}
                disabled={isSubmitting}
              >
                Back
              </button>
            ) : (
              <div></div> // Empty div for spacing
            )}
            
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                className="px-6 py-2 bg-blue-600 rounded"
                onClick={handleNext}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 rounded"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Publishing...' : 'Publish'}
              </button>
            )}
          </div>
          
          {isSubmitting && (
            <div className="mt-4">
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-center text-sm mt-2">Uploading... {uploadProgress}%</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UploadPage; 