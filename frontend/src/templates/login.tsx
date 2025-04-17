import 'react'
import '../assets/sass/register.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Header from './header';
import { useState } from 'react';
import { useLogin } from '../api/auth/auth';
import { Navigate } from 'react-router-dom';


const Login:React.FC=()=>{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = useLogin()

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        login.mutate(
            {
                email,
                password,
            }
        )
    }

    if (login.isSuccess) {
        return <Navigate replace to="/article_list" />
    }

    return(
        <div>
            <Header/>
            <section className='register'>
                <form onSubmit={onSubmit}>
                    <h1>Login</h1>
                <TextField id="outlined-basic" label="email" variant="outlined" size='small' required margin="dense" value={email} onChange={(event) => setEmail(event.target.value)}/>
                <TextField id="outlined-basic" label="Password" variant="outlined" type='password' size='small' required margin="dense" value={password} onChange={(event) => setPassword(event.target.value)}/>
                <br/>
                <Button variant='contained' color="error" type='submit' >login</Button>
                <br/>
                </form>
            </section>
        </div>
    )
}

export default Login