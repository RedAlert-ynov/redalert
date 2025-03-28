import 'react'
import Header from './header';
import '../assets/sass/dashboard.scss'
import Button from '@mui/material/Button';

const Dashboard:React.FC=()=>{
    return(
        <div>
            <Header/>
            <section className='dashboard'>
                <div className='user_infos'>
                    <h1>Infos utilisateur</h1>
                    <h3>Pseudo : toto</h3>
                    <h3>Mail : toto@gmail.com</h3>
                </div>
                
            </section>
        </div>
    )
}

export default Dashboard