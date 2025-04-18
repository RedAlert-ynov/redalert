import 'react'
import Header from './header';
import '../assets/sass/dashboard.scss'
import { useParams } from 'react-router-dom';
import { useUpdateUser, useUser } from '../api/admin/users/users';
import Error404 from './404';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useStore } from '../store/store';
import { ADMIN_ROLE } from '../common';
import Unauthorized from './unauthorized';

const AdminUserEdition:React.FC=()=>{
    const { id = "" } = useParams()
    const userId = parseInt(id)
    const userQuery = useUser(userId)
    const {mutate: updateUser} = useUpdateUser()

    const [username, setUsername] = useState('') 
    const [email, setEmail] = useState('') 
    const [role, setRole] = useState('')
    const isAdmin = useStore((state) => state.role) === ADMIN_ROLE

    useEffect(() => {
        if (userQuery.isSuccess) {
            setUsername(userQuery.data.username);
            setEmail(userQuery.data.email);
            setRole(userQuery.data.role.toString())
        }
    },
        [userQuery.data, userQuery.isSuccess]
    );

    if (!isAdmin) {
        return <Unauthorized />
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!userQuery.data) return;
        
        const updatedFields: Record<string, unknown> = {};
        
        if (username !== userQuery.data.username) {
            updatedFields.username = username;
        }
    
        if (email !== userQuery.data.email) {
            updatedFields.email = email;
        }
    
        if (parseInt(role) !== userQuery.data.role) {
            updatedFields.role = parseInt(role);
        }
    
        // Ne pas appeler mutate si rien n'a changé
        if (Object.keys(updatedFields).length === 0) return;
    
        updateUser({
            userId,
            userData: updatedFields,
        });
    }
    

    if (userQuery.isError) {
        return (
            <Error404 />
        )
    }

    return(
        <div>
            <Header/>
            <section className='dashboard'>
                <form onSubmit={handleSubmit} encType="multipart/form-data" className='user_infos'>
                    <h1>Infos utilisateur</h1>
                    <TextField 
                      id="username" 
                      label="Pseudo" 
                      variant="outlined" 
                      size='small'  
                      margin="dense"
                      fullWidth
                      sx={{ mb: 2 }}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField 
                      id="email" 
                      label="Email" 
                      variant="outlined" 
                      size='small'  
                      margin="dense"
                      fullWidth
                      sx={{ mb: 2 }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="role-dropdown">Role</InputLabel>
                        <Select
                            id="role-dropdown"
                            value={role}
                            label="Role"
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <MenuItem value={1}>User</MenuItem>
                            <MenuItem value={2}>Admin</MenuItem>
                        </Select>
                    </FormControl>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary"
                        size='large'
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Update
                    </Button>
                </form>
            </section>
        </div>
    )
}

export default AdminUserEdition