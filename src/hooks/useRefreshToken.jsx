import useAuth from "./useAuth";
import {refreshToken} from "../services/auth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();
  const refresh = async () => {
    const response = await refreshToken();
    setAuth(prev => {
      return {
        ...prev,
        accessToken: response.token,
        roles: response.roles
      };
    });
    
    return response;
  };
  
  return refresh;
};

export default useRefreshToken;