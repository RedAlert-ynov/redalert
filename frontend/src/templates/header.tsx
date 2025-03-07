import 'react';
import '../assets/sass/header.scss';
import { useState } from 'react';
import logo from '../assets/images/RedAlert_Dark 1.png';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Button from '@mui/material/Button';
import ListIcon from '@mui/icons-material/List';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import { useStore } from '../store/store';
import { useLogout } from '../api/auth/auth';

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const isLoggedIn = useStore((state) => state.isLoggedIn)
    const { mutate: logout } = useLogout()
    
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <header>
            <nav>
                <a href='/'>
                    <figure>
                        <img src={logo} alt="Logo" />
                    </figure>
                </a>
                <div className="nav-links">
                    <a href='/'>Accueil</a>
                    <a href='/qui_sommes_nous'>Qui sommes nous?</a>
                    <a href='/concept'>Le concept</a>
                    <div className='loginsignup'>
                        {!isLoggedIn && <>
                            <a href='/login'>
                                <Button variant='contained' endIcon={<MeetingRoomIcon />}>Login</Button>
                            </a>
                            <a href='/register'>
                                <Button variant='contained' endIcon={<PersonAddIcon />}>Signup</Button>
                            </a>
                        </>}
                        {isLoggedIn && 
                            <a>
                                <Button onClick={() => logout()} variant='contained' endIcon={<LogoutIcon />}>Logout</Button>
                            </a>
                        }
                    </div>
                </div>
                <div className="menu-icon" onClick={toggleMenu}>
                    <ListIcon fontSize='large' />
                </div>
            </nav>
            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                <div className="close-icon" onClick={toggleMenu}>
                    <CloseIcon fontSize='large' />
                </div>
                <a href='/'>Accueil</a>
                <br></br>
                <a href='/qui_sommes_nous'>Qui sommes nous?</a>
                <br></br>
                <a href='/concept'>Le concept</a>
                <br></br>
                {!isLoggedIn &&
                <>
                    <a href='/login'>
                        <Button variant='contained' endIcon={<MeetingRoomIcon />}>Login</Button>
                    </a>
                    <br></br>
                    <a href='/register'>
                        <Button variant='contained' endIcon={<PersonAddIcon />}>Signup</Button>
                    </a>                
                </>
                }
                {isLoggedIn &&
                    <a>
                        <Button onClick={() => logout()} variant='contained' endIcon={<LogoutIcon />}>Logout</Button>
                    </a> 
                }
            </div>
        </header>
    );
};

export default Header;
