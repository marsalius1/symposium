import React, { useState } from 'react';
import { addResponse, uploadVideo } from '../services/contentService';
import { initialResponseState, createBlankCitation } from '../models/contentModel';

const ResponseForm = ({ contentId, onSubmitSuccess }) => {
  const [response, setResponse] = useState({...initialResponseState});
  const [responseType, setResponseType] = useState('text');
  const [responseVideo, setResponseVideo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (field, value) => {
    setResponse({
      ...response,
      [field]: value
    });
  };

  const handleAddCitation = () => {
    setResponse({
      ...response,
      citations: [...response.citations, createBlankCitation()]
    });
  };

  const handleChangeCitation = (index, field, value) => {
    const newCitations = [...response.citations];
    newCitations[index] = {
      ...newCitations[index],
      [field]: value
    };
    setResponse({
      ...response,
      citations: newCitations
    });
  };

  const handleRemoveCitation = (index) => {
    const newCitations = [...response.citations];
    newCitations.splice(index, 1);
    setResponse({
      ...response,
      citations: newCitations
    });
  };

  const handleFileUpload = (file) => {
    const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
    if (file && validTypes.includes(file.type)) {
      setResponseVideo(file);
      return true;
    } else {
      setError('Please upload a valid video file (MP4, MOV, or AVI)');
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      setError('');
      
      // Create a copy of the response to avoid state issues
      const responseToSubmit = { ...response };
      
      // Validate contentId
      if (!contentId) {
        throw new Error('Content ID is missing. Cannot submit response.');
      }
      
      // Set a default author if not provided
      if (!responseToSubmit.author || responseToSubmit.author.trim() === '') {
        responseToSubmit.author = 'Anonymous User';
      }
      
      // Validate response based on type
      if (responseType === 'text' && (!responseToSubmit.text || responseToSubmit.text.trim() === '')) {
        throw new Error('Please enter a text response.');
      }
      
      if (responseType === 'video' && !responseVideo) {
        throw new Error('Please upload a video for your response.');
      }
      
      // Upload video if it exists
      if (responseType === 'video' && responseVideo) {
        setUploadProgress(20);
        const videoUrl = await uploadVideo(responseVideo);
        responseToSubmit.video = videoUrl;
        setUploadProgress(70);
      }
      
      // Add the response to the content
      await addResponse(contentId, responseToSubmit);
      setUploadProgress(100);
      
      // Call success callback
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
      
    } catch (error) {
      console.error('Error submitting response:', error);
      setError(error.message || 'Failed to submit response. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-lg p-6">
      <h2 className="text-xl font-bold mb-6">Add Your Response</h2>
      
      {error && (
        <div className="bg-red-500 bg-opacity-20 border border-red-400 text-red-300 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Your Name (optional)</label>
          <input 
            type="text"
            className="w-full p-2 border rounded bg-gray-800 text-white border-gray-600"
            placeholder="Anonymous"
            value={response.author}
            onChange={(e) => handleChange('author', e.target.value)}
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Response Type</label>
          <div className="flex space-x-4">
            <button
              type="button"
              className={`px-4 py-2 rounded ${responseType === 'text' ? 'bg-blue-600' : 'bg-gray-700'}`}
              onClick={() => setResponseType('text')}
            >
              Text
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded ${responseType === 'video' ? 'bg-blue-600' : 'bg-gray-700'}`}
              onClick={() => setResponseType('video')}
            >
              Video
            </button>
          </div>
        </div>
        
        {responseType === 'text' ? (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Your Response</label>
            <textarea 
              className="w-full p-2 border rounded bg-gray-800 text-white border-gray-600"
              placeholder="Share your thoughts..."
              rows="5"
              value={response.text}
              onChange={(e) => handleChange('text', e.target.value)}
              required={responseType === 'text'}
            />
          </div>
        ) : (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Upload Video Response</label>
            <input
              type="file"
              accept="video/*"
              className="w-full p-2 border rounded bg-gray-800 text-white border-gray-600"
              onChange={(e) => handleFileUpload(e.target.files[0])}
              required={responseType === 'video'}
            />
            {responseVideo && (
              <div className="mt-2 text-sm text-green-400">
                Video selected: {responseVideo.name}
              </div>
            )}
          </div>
        )}
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">Citations (optional)</label>
            <button
              type="button"
              className="text-blue-400 text-sm"
              onClick={handleAddCitation}
            >
              + Add Citation
            </button>
          </div>
          
          {response.citations.map((citation, index) => (
            <div key={index} className="flex items-start mb-2">
              <div className="flex-grow">
                <input 
                  type="text"
                  className="w-full p-2 border rounded mb-1 bg-gray-800 text-white border-gray-600"
                  placeholder="Citation Text"
                  value={citation.text}
                  onChange={(e) => handleChangeCitation(index, 'text', e.target.value)}
                />
                <input 
                  type="url"
                  className="w-full p-2 border rounded bg-gray-800 text-white border-gray-600"
                  placeholder="URL (optional)"
                  value={citation.url}
                  onChange={(e) => handleChangeCitation(index, 'url', e.target.value)}
                />
              </div>
              <button
                type="button"
                className="ml-2 text-red-400"
                onClick={() => handleRemoveCitation(index)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        
        <button
          type="submit"
          className="w-full px-6 py-3 bg-blue-600 rounded font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Response'}
        </button>
        
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
  );
};

export default ResponseForm; 