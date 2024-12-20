import 'react'
import '../assets/sass/header.scss'

import logo from '../assets/images/RedAlert_Dark 1.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faRightToBracket,faUserPlus} from '@fortawesome/free-solid-svg-icons'
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
            <p>Le concept</p>
            <div className='loginsignup'>
            <div className='login'>
                <FontAwesomeIcon icon={faRightToBracket} />
                <p>&nbsp;Connexion&nbsp;</p>
            </div>
            <div className='signup'>
            <FontAwesomeIcon icon={faUserPlus} />
            <p>&nbsp;Inscription&nbsp;</p>
            </div>
            </div>
        </nav>
    </header>
    );
};

export default Header