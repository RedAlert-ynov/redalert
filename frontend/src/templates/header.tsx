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
            <figure>
            <img src={logo} alt="Logo" />
            </figure>
            <a href='/'>
                <p>Accueil</p>
            </a>
            <p>Qui sommes nous?</p>
            <a href='/concept'>
            <p>Le concept</p>
            </a>
            < div className='loginsignup'>
            <div className='login'>
            <Button variant='contained' endIcon={< MeetingRoomIcon/>} >Login</Button>
            </div>
            <div className='signup'>
            <Button variant='contained' endIcon={< PersonAddIcon/>}>Signup</Button>
            </div>
            </div>
        </nav>
    </header>
    );
};

export default Header