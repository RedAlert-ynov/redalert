import Header from "./header";
import intro from '../assets/images/mainpage.png'
import '../assets/sass/mainpage.scss'
import Button from '@mui/material/Button';

const Mainpage: React.FC = () => {
    return (
        <div>
            <Header />
            <br></br>
            <section className="mainpage">
                <div className="maintext">
                <h1>
                    DECOUVREZ<br></br>
                </h1>
                <h1 className="title">
                RED ALERT!
                </h1>
                <h3>
                    Red Alert est un gestionnaire de crise.<br></br>
                    Grâce à Red Alert, vous pouvez créer un scénario de crise avec une liste d'étapes à suivre.<br></br>
                    Vous pouvez aussi consulter les scénarios d'autres utilisateurs et faire un retour dessus.
                </h3>
                <a href="/concept">
                <Button variant='contained'>Découvrir Red Alert</Button>
                </a>
                </div>
                <div>
                    <figure>
                        <img src={intro}></img>
                    </figure>
                </div>
        </section>
        </div>
    );
};

export default Mainpage;