import 'react'
import alarm from '../assets/images/alarm.png'
import '../assets/sass/404.scss'
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
                <button>
                    Retour à l'accueil
                </button>
            </a>
            </section>
        </div>
    )
}

export default Error404