import 'react'
import '../assets/sass/concept.scss'
import Header from './header'
import Button from '@mui/material/Button';

const Concept: React.FC=()=>{
    return(
        <div>
            <Header></Header>
            <section className='concept'>
            <h1>Concept :</h1>
            <h3>
                Red Alert est un gestionnaire de crise.<br></br>
                Grâce à Red Alert, vous pouvez créer un scénario de crise ainsi que toutes les étapes pour résoudre la crise.<br></br>
                Les membres de la communauté peuvent également réagir à vos scénarios et ajouter des étapes pour résoudre la crise si besoin.
            </h3>
            <p> Inscrivez vous dès maintenant et créez vos scénarios!</p>
            <a href='/login'>
            <Button variant='contained' color="error">Créer un compte</Button>

            </a>
            </section>
        </div>
    )
}

export default Concept