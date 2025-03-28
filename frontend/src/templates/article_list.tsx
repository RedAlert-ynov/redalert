import 'react'
import Header from './header';
import '../assets/sass/article_list.scss'
import Button from '@mui/material/Button';

const ArticleList:React.FC=()=>{
    return(
        <div>
            <Header/>
            <section className='article_list'>
                <div className='all_articles'>
                <div className="article-headers">
                        <h1>Liste des scénarios :</h1>
                        <h3>Voici la liste de tous les scénarios disponibles :</h3>
                    </div>
                    <div className="articles-container">
                        {[...Array(20)].map((_, i) => (
                            <ul key={i}>
                                <li>
                                    <p>Scénario {i+1}</p>
                                    <a href={`scenario/id${i+1}`}>
                                        <Button variant='contained' color="error">
                                            <b>Consulter</b>
                                        </Button>
                                    </a>
                                </li>
                            </ul>
                        ))}
                    </div>
                </div>
                
            </section>
        </div>
    )
}

export default ArticleList