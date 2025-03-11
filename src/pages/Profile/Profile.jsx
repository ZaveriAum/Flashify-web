import NavBar from "../../components/NavBar";
import '../../styles/profile.css'
import { getProfile } from "../../services/auth";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useToast } from "../../context/ToastContext";

export default function Profile(){

    const { auth } = useAuth();
    const [user, setUser] = useState({});
    const { addToast } = useToast();

    useEffect(()=>{
        const fetchUser = async ()=>{
            try{
                const response = await getProfile(auth.accessToken)
                if(response.status == 200)
                    setUser(response.data.user);
                else if (response.status < 500)
                    addToast(response.data.message, "failure")
                else
                    addToast("Error in Fetching Profile Details", "failure")
            }catch(e){
                addToast("Error in Fetching Profile Details", "failure")
            }
        }

        fetchUser();
    }, [auth.accessToken])

    return(
        <div className="profile-container">
            <NavBar/>
            <div className="user-info">       
                <p className="username">Username : {user.username}</p>
                <p className="email">Email : {user.email}</p>
            </div>
        </div>
    );
}