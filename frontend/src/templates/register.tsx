import 'react'
import '../assets/sass/register.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Header from './header';
import { useState } from 'react';
import { useRegister } from '../api/auth/auth';


const Register:React.FC=()=>{
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")

    const { mutate: register } = useRegister()

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        register({
            username,
            email,
            password,
            password_confirmation: passwordConfirmation
        })
    }
    
    return(
        <div>
            <Header/>
            <section className='register'>
                <form onSubmit={onSubmit}>
                    <h1>Register now</h1>
                <TextField id="outlined-basic" label="Username" variant="outlined" size='small' required margin="dense" value={username} onChange={(event) => setUsername(event.target.value)}/>
                <TextField id="outlined-basic" label="email" variant="outlined" size='small' required margin="dense" value={email} onChange={(event) => setEmail(event.target.value)}/>
                <TextField id="outlined-basic" label="Password" variant="outlined" type='password' size='small' required margin="dense" value={password} onChange={(event) => setPassword(event.target.value)}/>
                <TextField id="outlined-basic" label="Confirm password" variant="outlined" type='password' size='small' required  margin="dense" value={passwordConfirmation} onChange={(event) => setPasswordConfirmation(event.target.value)}/>
                <br/>
                <Button variant='contained' color="error" type='submit' >register</Button>
                <br/>
                </form>
            </section>
        </div>
    )
}

export default Register