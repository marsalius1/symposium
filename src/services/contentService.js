import { collection, addDoc, getDoc, getDocs, doc, updateDoc, query, orderBy, limit, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../firebase';
import { createUniqueId } from '../models/contentModel';

// Collection reference
const contentCollectionRef = collection(db, 'content');

// Get a list of content for the feed
export const getFeedContent = async (limitCount = 10) => {
  try {
    const q = query(contentCollectionRef, orderBy('dateCreated', 'desc'), limit(limitCount));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting feed content: ", error);
    throw error;
  }
};

// Get a single content item by ID
export const getContentById = async (contentId) => {
  try {
    const contentDoc = await getDoc(doc(db, 'content', contentId));
    if (contentDoc.exists()) {
      return {
        id: contentDoc.id,
        ...contentDoc.data()
      };
    } else {
      throw new Error('Content not found');
    }
  } catch (error) {
    console.error("Error getting content: ", error);
    throw error;
  }
};

// Upload a video file to Firebase Storage
export const uploadVideo = async (file, onProgress) => {
  try {
    const fileId = createUniqueId();
    const fileRef = ref(storage, `videos/${fileId}`);
    
    if (onProgress) {
      const uploadTask = uploadBytesResumable(fileRef, file);
      
      // Set up progress monitoring
      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress(progress);
        },
        (error) => {
          console.error("Upload error:", error);
          throw error;
        }
      );
      
      // Wait for the upload to complete
      await uploadTask;
      const downloadURL = await getDownloadURL(fileRef);
      return downloadURL;
    } else {
      // Fall back to the old method if no progress callback
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      return downloadURL;
    }
  } catch (error) {
    console.error("Error uploading video: ", error);
    throw error;
  }
};

// Upload an image file to Firebase Storage
export const uploadImage = async (file) => {
  try {
    const fileId = createUniqueId();
    const fileRef = ref(storage, `images/${fileId}`);
    await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image: ", error);
    throw error;
  }
};

// Create a new content post
export const createContent = async (contentData) => {
  try {
    // Add a timestamp if not provided
    if (!contentData.dateCreated) {
      contentData.dateCreated = new Date();
    }
    
    // Ensure we have an ID
    if (!contentData.id) {
      contentData.id = createUniqueId();
    }
    
    const contentRef = doc(db, 'content', contentData.id);
    await setDoc(contentRef, contentData);
    return contentData.id;
  } catch (error) {
    console.error("Error creating content: ", error);
    throw error;
  }
};

// Add a response to a content
export const addResponse = async (contentId, responseData) => {
  try {
    // Validate contentId
    if (!contentId) {
      throw new Error('Content ID is required but was not provided');
    }
    
    const contentRef = doc(db, 'content', contentId);
    const contentDoc = await getDoc(contentRef);
    
    if (!contentDoc.exists()) {
      throw new Error('Content not found');
    }
    
    const content = contentDoc.data();
    const responses = content.responses || [];
    
    // Generate an ID for the response
    responseData.id = createUniqueId();
    
    // Add timestamp if not provided
    if (!responseData.dateCreated) {
      responseData.dateCreated = new Date();
    }
    
    // Add the new response to the array
    responses.push(responseData);
    
    // Update the document with the new responses array
    await updateDoc(contentRef, { responses });
    
    return responseData.id;
  } catch (error) {
    console.error("Error adding response: ", error);
    throw error;
  }
}; 