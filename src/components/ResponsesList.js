import React, { useState } from 'react';

const ResponsesList = ({ responses }) => {
  const [expandedResponse, setExpandedResponse] = useState(null);
  
  if (!responses || responses.length === 0) {
    return <p className="text-gray-400">No responses yet. Be the first to respond!</p>;
  }
  
  const toggleExpandResponse = (responseId) => {
    if (expandedResponse === responseId) {
      setExpandedResponse(null);
    } else {
      setExpandedResponse(responseId);
    }
  };
  
  return (
    <div className="space-y-4">
      {responses.map((response) => (
        <div 
          key={response.id}
          className={`rounded-lg bg-gray-800 overflow-hidden transition-all ${expandedResponse === response.id ? 'max-h-[80vh]' : 'max-h-24'}`}
        >
          <div 
            className="p-4 cursor-pointer"
            onClick={() => toggleExpandResponse(response.id)}
          >
            {/* Header with author info */}
            <div className="flex justify-between items-center mb-2">
              <div className="font-medium">{response.author || 'Anonymous'}</div>
              <div className="text-gray-400 text-xs">
                {response.dateCreated ? new Date(response.dateCreated.seconds * 1000).toLocaleDateString() : 'Recently'}
              </div>
            </div>
            
            {/* Response content preview or video indicator */}
            {response.video ? (
              <div className="flex items-center text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
                <span>Video Response</span>
              </div>
            ) : (
              <p className="text-sm line-clamp-2 overflow-hidden text-ellipsis">
                {response.text}
              </p>
            )}
          </div>
          
          {/* Expanded content */}
          {expandedResponse === response.id && (
            <div className="px-4 pb-4">
              {response.video ? (
                <video 
                  src={response.video}
                  className="w-full rounded"
                  controls
                  autoPlay
                />
              ) : (
                <p className="text-sm mb-4">{response.text}</p>
              )}
              
              {/* Citations */}
              {response.citations && response.citations.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <h4 className="text-sm font-medium mb-2">Citations</h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-gray-300">
                    {response.citations.map((citation, idx) => (
                      <li key={idx}>
                        {citation.text}
                        {citation.url && (
                          <a 
                            href={citation.url} 
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
              
              {/* Votes */}
              <div className="mt-4 flex items-center justify-end">
                <button className="flex items-center text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  <span>{response.votes || 0}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResponsesList; 