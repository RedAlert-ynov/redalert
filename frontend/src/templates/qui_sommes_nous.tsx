import 'react'
import '../assets/sass/qui_sommes_nous.scss'
import Header from './header'
import  Button  from '@mui/material/Button'

const Quisommesnous: React.FC=()=>{
    return(
        <div>
            <Header></Header>
            <br></br>
            <br></br>
            <br></br>
            <section className='quisommesnous'>
                <div className='equipe'>
                <h1>Qui sommes nous?</h1>
                <h3>Red Alert a été créé sur l'idée d'Elvis Pichou et grâce à l'aide de Lucas Guerra, Maxime Bouyssou, Alexis Provo
                    et Lilian Schott, 5 étudiants en développement web.<br></br><br></br>
                    Ce projet a débuté en octobre 2024 pour s'achever en avril 2025.<br></br><br></br>
                    Pour découvrir le fruit de notre travail, vous pouvez créer un compte dès maintenant.
                </h3>
                <br></br>
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

export default Quisommesnous