import axios from 'axios'
const baseUrl = 'http://localhost:5000/note/'


const getNotes = async (id, credentials) => {
    const config = {
      headers: {
        Authorization: `Bearer ${credentials}`, 
      },
    };
    
    const response = await axios.get(baseUrl + `${id}`, config);
    return response;    
  };

  const createNote = async (id, data, credentials) => {
    const config = {
      headers: {
        Authorization: `Bearer ${credentials}`, 
      },
    };
    const response = await axios.post(baseUrl + `${id}`,data, config);
    return response
  }

export {getNotes, createNote}