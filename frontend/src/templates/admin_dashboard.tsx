import 'react'
import Header from './header';
import '../assets/sass/article_list.scss'
import Button from '@mui/material/Button';
import { useDeleteUser, useUsers } from '../api/admin/users/users';
import { User } from '../api/auth/auth.types';
import { useStore } from '../store/store';
import { ADMIN_ROLE } from '../common';
import Unauthorized from './unauthorized';
import { useArticles } from '../api/articles/articles';
import { Article } from '../api/articles/articles.types';
import { useDeleteArticle } from '../api/admin/articles/articles';

const AdminDashboard:React.FC=()=>{
    const usersQuery = useUsers()
    const users = usersQuery.data
    const isAdmin = useStore((state) => state.role) === ADMIN_ROLE
    const articlesQuery = useArticles()
    const articles = articlesQuery.data

    if (!isAdmin) {
        return <Unauthorized />
    }

    return(
        <div>
            <Header/>
            <section className='article_list'>
                <div className='all_articles'>
                    <div className="article-headers">
                        <h1>Dashboard administrateur :</h1>
                        <h3>Utilisateurs :</h3>
                    </div>
                    <div className="articles-container">
                        {users?.map((user) => (
                            <UserListItem key={user.id} user={user} />
                        ))}
                    </div>
                    <div className="article-headers">
                        <h3>Articles :</h3>
                    </div>
                    <div className="articles-container">
                        {articles?.map((article) => (
                            <ArticleListItem key={article.id} article={article} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AdminDashboard

const UserListItem = (props: {user: User}) => {
    const { mutate: deleteUser } = useDeleteUser()

    return (
        <ul>
            <li>
                <p>{props.user.username}</p>
                <a href={`/admin_dashboard/users/${props.user.id}`}>
                    <Button variant='contained' color="primary">
                        <b>Edit</b>
                    </Button>
                </a>
                <a>
                    <Button variant='contained' color="error" onClick={() => deleteUser(props.user.id)}>
                        <b>Delete</b>
                    </Button>
                </a>
            </li>
        </ul>
    )
}

const ArticleListItem = (props: {article: Article}) => {
    const { mutate: deleteArticle } = useDeleteArticle()

    return (
        <ul>
            <li>
                <p>{props.article.title}</p>
                <a href={`/admin_dashboard/articles/${props.article.slug}`}>
                    <Button variant='contained' color="primary">
                        <b>Edit</b>
                    </Button>
                </a>
                <a>
                    <Button variant='contained' color="error" onClick={() => deleteArticle(props.article.id)}>
                        <b>Delete</b>
                    </Button>
                </a>
            </li>
        </ul>
    )
}