import 'react'
import Header from './header';
import '../assets/sass/single_article.scss'
import Button from '@mui/material/Button';

const SingleArticle:React.FC=()=>{
    return(
        <div>
            <Header/>
            <section className='single_article'>
                <div className='article_content'>
                    <h1>Titre article</h1>
                    <h3>Contenu de l'article</h3>
                    
                    <a href='/article_list'>
                    <Button variant='contained' size='large' color='error'>Revenir à la liste</Button>
                    </a>
                </div>
                
            </section>
        </div>
    )
}

export default SingleArticle