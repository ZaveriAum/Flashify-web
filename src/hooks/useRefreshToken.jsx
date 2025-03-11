import useAuth from "./useAuth";
import {refreshToken} from "../services/auth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();
  const refresh = async () => {
    const response = await refreshToken();
    setAuth(prev => {
      return {
        ...prev,
        accessToken: response.accessToken,
      };
    });
    
    return response;
  };
  
  return refresh;
};

export default useRefreshToken;