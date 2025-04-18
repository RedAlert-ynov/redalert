import 'react'
import Header from './header';
import '../assets/sass/article_list.scss'
import Button from '@mui/material/Button';
import { useArticles } from '../api/articles/articles';
import { useStore } from '../store/store';
import { Navigate } from 'react-router-dom';

const ArticleList:React.FC=()=>{
    const articlesQuery = useArticles()
    const articles = articlesQuery.data
    const isLoggedIn = useStore((state) => state.isLoggedIn)

    if (!isLoggedIn) {
        return <Navigate replace to="/login" />
    }

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
                            <ArticleListItem key={article.id} slug={article.slug} title={article.title} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ArticleList

const ArticleListItem = (props: {slug: string, title: string}) => {
    return (
        <ul>
            <li>
                <p>{props.title}</p>
                <a href={`article/${props.slug}`}>
                    <Button variant='contained' color="error">
                        <b>Consulter</b>
                    </Button>
                </a>
            </li>
        </ul>
    )
}