import 'react'
import '../assets/sass/header.scss'

import logo from '../assets/images/RedAlert_Dark 1.png'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Button from '@mui/material/Button';
const Header: React.FC = () => {
    return (
    <header>
        <nav>
            < a href='/'>
            <figure>
            <img src={logo} alt="Logo" />
            </figure>
            </a>
            <a href='/'>
                <p>Accueil</p>
            </a>
            <a href='/qui_sommes_nous'>
                <p>Qui sommes nous?</p>
            </a>
            <a href='/concept'>
            <p>Le concept</p>
            </a>
            < div className='loginsignup'>
            <a href='/login'>
            <Button variant='contained' endIcon={< MeetingRoomIcon/>} >Login</Button>
            </a>
            <a href='/register'>
                <Button variant='contained' endIcon={< PersonAddIcon/>}>Signup</Button>
            </a>
            
            </div>
        </nav>
    </header>
    );
};

export default Header