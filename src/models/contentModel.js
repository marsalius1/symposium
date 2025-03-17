// Content Schema for Firestore
import { Timestamp } from "firebase/firestore";

// Initial content object template for new uploads
export const initialContentState = {
  id: "",
  creator: "Anonymous User", // Default user for now
  dateCreated: Timestamp.now(),
  complexity: 5, // Default middle complexity
  discipline: "",
  topic: "",
  contentType: "text", // Default to text content

  // Level 1: Hook
  hook: {
    video: "",
    text: "",
    duration: 0,
  },

  // Level 2: Main
  main: {
    video: "",
    text: "",
    visuals: [],
    keyPoints: [""],
    references: [],
    duration: 0,
  },

  // Level 3: Full
  full: {
    video: "",
    text: "",
    sections: [
      {
        title: "Introduction",
        content: "",
      },
    ],
    references: [],
    visuals: [],
    duration: 0,
  },

  responses: [],
};

// Initial response template
export const initialResponseState = {
  id: "",
  text: "",
  video: "",
  citations: [],
  dateCreated: Timestamp.now(),
  author: "Anonymous User",
  votes: 0,
  views: 0,
};

// Function to create a blank citation
export const createBlankCitation = () => ({
  text: "",
  url: "",
});

// Function to create a blank section
export const createBlankSection = () => ({
  title: "",
  content: "",
});

// Function to create a new unique ID (simple implementation)
export const createUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
