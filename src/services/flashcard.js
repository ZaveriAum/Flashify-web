import axios from 'axios'
const baseUrl = 'http://localhost:5000/flashcard/'


const getFlashcards = async (id, credentials) => {
    const config = {
      headers: {
        Authorization: `Bearer ${credentials}`, 
      },
    };
    const response = await axios.get(baseUrl + `${id}`, config);
    return response;    
  };

const createFlashcard = async (id, data, credentials) => {
  const config = {
    headers: {
      Authorization: `Bearer ${credentials}`, 
    },
  };
  const response = await axios.post(baseUrl + `${id}`,data, config);
  return response
}

export { getFlashcards, createFlashcard }