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
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useStore } from '../store/store';
import { useLogout } from '../api/auth/auth';
import { ADMIN_ROLE } from '../common';

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const isLoggedIn = useStore((state) => state.isLoggedIn)
    const isAdmin = useStore((state) => state.role) === ADMIN_ROLE
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
                    <a href='/article_list'>Les articles</a>
                    {isAdmin && 
                        <a href='/admin_dashboard'>Dashboard admin</a>
                    }
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
                            <>
                                {isAdmin &&
                                    <a href='/new_article'>
                                        <Button variant='contained' endIcon={<PostAddIcon />}>Add article</Button>
                                    </a>
                                }
                                <a>
                                    <Button onClick={() => logout()} variant='contained' endIcon={<LogoutIcon />}>Logout</Button>
                                </a>
                            </>
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
                <a href='/article_list'>Les articles</a>
                <br></br>
                {isAdmin && 
                    <>
                        <a href='/admin_dashboard'>Dashboard admin</a>
                        <br/>
                    </>
                    }
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
                <>
                    {isAdmin && 
                        <a href='/new_article'>
                            <Button variant='contained' endIcon={<PostAddIcon />}>Add article</Button>
                        </a>
                    }
                    <br></br>
                    <a>
                        <Button onClick={() => logout()} variant='contained' endIcon={<LogoutIcon />}>Logout</Button>
                    </a> 
                </>  
                }
            </div>
        </header>
    );
};

export default Header;
