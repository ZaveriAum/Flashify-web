import axios from 'axios'
const baseUrl = 'http://localhost:5000/flashcard/'


const getFlashcards = async (id, credentials) => {
    const config = {
      headers: {
        Authorization: `Bearer ${credentials}`, 
      },
    };
    console.log(baseUrl + `${id}`)
    const response = await axios.get(baseUrl + `${id}`, config);
    return response;    
  };

export { getFlashcards }