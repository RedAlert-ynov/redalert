import 'react'
import Header from './header';
import '../assets/sass/article_list.scss'
import Button from '@mui/material/Button';
import { useArticles } from '../api/articles/articles';

const ArticleList:React.FC=()=>{
    const articlesQuery = useArticles()
    const articles = articlesQuery.data

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
                        {articles?.map((article) => (
                            <ArticleListItem key={article.id} id={article.id} title={article.title} />
                        ))}
                    </div>
                </div>
                
            </section>
        </div>
    )
}

export default ArticleList

const ArticleListItem = (props: {id: number, title: string}) => {
    return (
        <ul>
            <li>
                <p>{props.title}</p>
                <a href={`article/${props.id}`}>
                    <Button variant='contained' color="error">
                        <b>Consulter</b>
                    </Button>
                </a>
            </li>
        </ul>
    )
}