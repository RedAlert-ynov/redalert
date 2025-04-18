import 'react'
import Header from './header';
import '../assets/sass/single_article.scss'
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { useArticle } from '../api/articles/articles';

const SingleArticle:React.FC=()=>{
    const { slug = '' } = useParams()
    const articleQuery = useArticle(slug)
    
    return(
        <div>
            <Header/>
            <section className='single_article'>
                
                <div className='article_content'>
                    {articleQuery.isError &&
                        <h1>Article introuvable</h1>
                    }
                    {articleQuery.isSuccess &&
                    <>
                        <h1>{articleQuery.data.title}</h1>
                        {articleQuery.data.imageUrl &&
                            <img src={articleQuery.data.imageUrl}/>                        
                        }

                        {articleQuery.data.sections.map((section) =>
                            <Section key={section.title} title={section.title} body={section.body}/>
                        )}
                        
                        <a href='/article_list'>
                            <Button variant='contained' size='large' color='error'>Revenir à la liste</Button>
                        </a>
                    </>
                    }
                    
                </div>
                
            </section>
        </div>
    )
}

export default SingleArticle

const Section = (props: {title: string, body: string}) => {
    return (
        <>
            <h3>{props.title}</h3>
            <h4>{props.body}</h4>
        </>
    )
}