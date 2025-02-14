import 'react'
import alarm from '../assets/images/alarm.png'
import '../assets/sass/404.scss'
import Button from '@mui/material/Button';

const Error404:React.FC=()=>{
    return(
        <div>
            <section className='error404'>
            <h1>Oh non!</h1>
            <figure>
                <img src={alarm}></img>
            </figure>
            <br></br>
            <h2>La page recherchée n'existe pas</h2>
            <br></br>
            <a href='/'>
            <Button variant='contained' color="error">retour à l'accueil</Button>
            </a>
            </section>
        </div>
    )
}

export default Error404