import 'react'
import '../assets/sass/concept.scss'
import Header from './header'
import Button from '@mui/material/Button';

const Concept: React.FC=()=>{
    return(
        <div>
            <Header />
            <section className='concept'>
                <div className='intro_concept'>
                <h1>Red Alert, Notre concept :</h1>
                <h3>
                Red Alert est un gestionnaire de crise.<br></br><br></br>
                Grâce à Red Alert, vous pouvez créer un scénario de crise ainsi que toutes les étapes pour résoudre la crise.
                <br></br><br></br>
                Les membres de la communauté peuvent également réagir à vos scénarios et ajouter des étapes pour résoudre la crise si besoin.
                <br></br><br></br>Inscrivez vous dès maintenant et créez vos scénarios!
            </h3>
            <a href='/register'>
            <Button variant='contained' color="error" size='large'><b>Créer un compte</b></Button>
            </a>
            <br></br>
            <br></br>
                </div>
            </section>
        </div>
    )
}

export default Concept