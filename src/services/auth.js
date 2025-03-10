import axios from 'axios'
const baseUrl = 'http://localhost:5000/user/'


const signup = async(credentials)=>{
  return await axios.post(baseUrl + "signup",credentials,{
    withCredentials:true
  });
}

const login = async (credentials) =>{
  return await axios.post(baseUrl + "login",credentials,{
    withCredentials:true
  });
}

const logout = async () => {
  try {
    const response = await axios.post(baseUrl + 'logout', {}, { withCredentials: true });
    return response;
  } catch (error) {
    return error.response || { status: 500, message: "Internal error" };
  }
};

const refreshToken = async () => {
  const response = await axios.get(baseUrl + "refresh",{
    withCredentials:true,
  });
  return response.data
}

export {login,refreshToken,signup, logout}