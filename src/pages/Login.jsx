import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert } from '../components/Alert'
import { useAuth } from '../hooks/useAuth'
import axiosClient from '../config/axiosClient'

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState({})

    const { setAuth } = useAuth(); 
    const navigate = useNavigate();
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        if([email, password].includes("")){
            setAlert({
                msg: "Todos los campos son obligatoios",
                error: true
            })
        }
        try {
            const { data } = await axiosClient.post('/users/login', { email, password })
            sessionStorage.setItem('token', data.token);
            setAuth(data);
            navigate('/enterprises');
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            }) 
        }
    }

    const { msg } = alert;

    return (
        <>
            <h1 className='title'>Inicia sesión y administra tus <span>empresas</span></h1>
            { msg && <Alert alert={alert}/>}
            <form className='login__form container' onSubmit={handleSubmit}>
                <div className='form__input'>
                    <label className='generic__text' htmlFor="email">Email</label>
                    <input
                        id='email' 
                        type="email"
                        className="search"
                        placeholder='Email de Registro' 
                        value={email}
                        onChange={handleEmail}
                    />
                </div>
                <div  className='form__input'>
                    <label className='generic__text' htmlFor="password">Password</label>
                    <input
                        id='password' 
                        type="password"
                        className='search'
                        placeholder='Password de Registro'
                        value={password} 
                        onChange={handlePassword}
                    />
                </div>
                <input 
                    type="submit" 
                    value="Iniciar Sesión"
                    className='button__login'
                />
            </form>
            <nav className='others__links container'>
                <Link
                    to="register"
                >¿No tienes una cuenta? Regístrate</Link>
                <Link
                    to="forget-password"
                >Olvide mi contraseña</Link>
            </nav>
        </>
    )
}