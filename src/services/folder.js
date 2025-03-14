import axios from 'axios'
const baseUrl = 'http://localhost:5000/folder/'


const getFolders = async (credentials) => {
    const config = {
      headers: {
        Authorization: `Bearer ${credentials}`, 
      },
    };
    
    const response = await axios.get(baseUrl, config);
    return response;    
  };

const createFolder = async(data, credentials) => {
  const config = {
    headers: {
      Authorization: `Bearer ${credentials}`, 
    },
  };
  
  const response = await axios.post(baseUrl,data, config);
  return response;
}

export { getFolders, createFolder }