import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert } from '../components/Alert'
import { useAuth } from '../hooks/useAuth'
import { useAPI } from '../hooks/useAPI'
import axiosClient from '../config/axiosClient'
import ClipLoader from "react-spinners/ClipLoader";

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState({})

    const { handleSumbitApi } = useAPI();
    const { setAuth, loading, setLoading } = useAuth(); 
    const navigate = useNavigate();
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);

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
            if(error.code === "ERR_NETWORK"){
                setAlert({
                    msg: "Error de conexión, intentalo de nuevo.",
                    error: true
                })
                setTimeout(() => {
                    setAlert({})
                }, "5000");
                handleSumbitApi();
            }
            setAlert({
                msg: error.response.data.msg,
                error: true
            }) 
        }finally{
            setLoading(false);
        }
    }

    const { msg } = alert;

    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    

    if(loading) return <div style={style}><ClipLoader loading={loading} color="#FDBC2C" size={150}/></div>
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