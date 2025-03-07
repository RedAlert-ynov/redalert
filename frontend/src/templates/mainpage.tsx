import Header from "./header";
import '../assets/sass/mainpage.scss'
import Button from '@mui/material/Button';

const Mainpage: React.FC = () => {
    return (
        <div>
            <Header />
            <section className="mainpage">
                <div className="maintext">
                <h1 className="title">
                    DECOUVREZ<br></br>
                    RED ALERT!
                </h1>
                <h3>
                    Red Alert est un gestionnaire de crise.<br></br><br></br>
                    Grâce à Red Alert, vous pouvez créer un scénario de crise avec une liste d'étapes à suivre.<br></br><br></br>
                    Vous pouvez aussi consulter les scénarios d'autres utilisateurs et faire un retour dessus.
                </h3>
                <br></br><br></br>
                <a href="/concept">
                <Button variant='contained'color="error" size='large'><b>Découvrir Red Alert</b></Button>
                </a>
                <br></br>
                </div>
                <br></br>
        </section>
        </div>
    );
};

export default Mainpage;