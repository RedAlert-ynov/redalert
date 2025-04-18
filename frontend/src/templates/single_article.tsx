import 'react'
import Header from './header';
import '../assets/sass/single_article.scss'
import Button from '@mui/material/Button';
import { Navigate, useParams } from 'react-router-dom';
import { useArticle } from '../api/articles/articles';
import { useStore } from '../store/store';
import { ADMIN_ROLE } from '../common';
import { useDeleteArticle } from '../api/admin/articles/articles';

const SingleArticle:React.FC=()=>{
    const { slug = '' } = useParams()
    const articleQuery = useArticle(slug)
    const isAdmin = useStore((state) => state.role) === ADMIN_ROLE
    const deleteArticle = useDeleteArticle()

    const handleDeleteArticle = (id: number) => {
        deleteArticle.mutate(id)
    }

    if (deleteArticle.isSuccess) {
        return <Navigate replace to="/article_list" />
    }
    
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
                        {isAdmin &&
                            <a>
                                <Button variant='contained' size='large' color='error' onClick={() => handleDeleteArticle(articleQuery.data.id)}>Supprimer</Button>
                            </a>                    
                        }
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