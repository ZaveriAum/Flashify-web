import profileIcon from '../assets/profile-icon.svg'
import '../styles/navbar.css'
export default function NavBar(){
    return(
        <div className='navbar-container'>
            <p className='navbar-app-name'>
                Flashify
            </p>
            <div className='navbar-menu'>
                <img src={profileIcon} alt='profile-icon' className='profile-icon'/>
                <p className='logout-button'>logout</p>
            </div>
        </div>
    );
}