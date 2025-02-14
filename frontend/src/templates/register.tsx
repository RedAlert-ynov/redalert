import 'react'
import '../assets/sass/register.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Header from './header';


const Register:React.FC=()=>{
    return(
        <div>
            <Header></Header>
            <section className='register'>
                <form>
                    <h1>Register now</h1>
                <TextField id="outlined-basic" label="Username" variant="outlined" size='small' required margin="dense"/>
                <TextField id="outlined-basic" label="email" variant="outlined" size='small' required margin="dense"/>
                <TextField id="outlined-basic" label="Password" variant="outlined" type='password' size='small' required margin="dense" />
                <TextField id="outlined-basic" label="Confirm password" variant="outlined" type='password' size='small' required  margin="dense"/>
                <br></br>
                <Button variant='contained' color="error" type='submit' >register</Button>
                <br></br>
                </form>
            </section>
        </div>
    )
}

export default Register