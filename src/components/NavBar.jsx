import profileIcon from '../assets/profile-icon.svg'
import '../styles/navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import {logout} from '../services/auth'
export default function NavBar(){

    const navigate = useNavigate();

    const handleLogout = async ()=>{
        const logoutStatus=await logout()
  
        if(logoutStatus.status === 204){
            navigate("/")
        }
  
    }

    return(
        <div className='navbar-container'>
            <Link className='navbar-app-name' to='../app'>
                <p>Flashify</p>
            </Link>
            <div className='navbar-menu'>
                <Link to='../profile'>
                    <img src={profileIcon} alt='profile-icon' className='profile-icon'/>
                </Link>
                <button className='logout-button' onClick={handleLogout}>
                    logout
                </button>
            </div>
        </div>
    );
}