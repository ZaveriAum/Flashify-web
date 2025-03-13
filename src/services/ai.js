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

export {generateFlashcards, generateNote}