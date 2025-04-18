import 'react'
import alarm from '../assets/images/alarm.png'
import '../assets/sass/404.scss'
import Button from '@mui/material/Button';

const Unauthorized:React.FC=()=>{
    return(
        <div>
            <section className='error404'>
            <h1>Oh non!</h1>
            <figure>
                <img src={alarm}></img>
            </figure>
            <br></br>
            <h2>Vous n'avez pas accès à cette ressource</h2>
            <br></br>
            <a href='/'>
            <Button variant='contained' color="error">retour à l'accueil</Button>
            </a>
            </section>
        </div>
    )
}

export default Unauthorized