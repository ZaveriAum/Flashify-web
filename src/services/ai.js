import axios from 'axios'
const baseUrl = 'http://localhost:5000/ai/'


const generateFlashcards = async (formData, credentials) => {
  const config = {
      headers: {
      Authorization: `Bearer ${credentials}`, 
      },
  };

  const response = await axios.post(baseUrl + `flashcard`,formData, config);
  return response;    
};

const generateNote = async (formData, credentials) => {
  const config = {
    headers: {
      Authorization: `Bearer ${credentials}`, 
    },
  };
  
  const response = await axios.post(baseUrl + `note`,formData, config);
  return response;
};

const interactWithFlashcards = async (data, id, credentials) => {
  const config = {
    headers: {
      Authorization: `Bearer ${credentials}`, 
    },
  };
  
  const response = await axios.post(baseUrl + `flashcard/${id}`,data, config);
  return response;
}

const interactWithNotes = async (data, id, credentials) => {
  const config = {
    headers: {
      Authorization: `Bearer ${credentials}`, 
    },
  };
  
  const response = await axios.post(baseUrl + `note/${id}`,data, config);
  return response;
}

export {generateFlashcards, generateNote, interactWithFlashcards, interactWithNotes}