import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert} from '../components/Alert'
import axiosClient from '../config/axiosClient'

export const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({})

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(email === ''){
      setAlert({
        msg: "El email es obligatorio",
        error: true
      })
      return;
    }

    try {
      const { data } = await axiosClient.post(`/users/reset-password`, { email });

      setAlert({
        msg: data.msg,
        error: false
      })
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
      <h1 className='title'>Recupera tu acceso y no pierdas tus <span>empresas</span></h1>
      {msg && <Alert alert={alert}/>}
      <form className='login__form' onSubmit={handleSubmit}>
        <div className='form__input'>
          <label className='generic__text' htmlFor="email">Email</label>
          <input
              id='email' 
              type="email"
              placeholder='Email de Registro' 
              className='search'
              value={email}
              onChange={handleEmail}
          />
        </div>
        <input 
          type="submit" 
          value="Enviar Instrucciones"
          className='button__login'
        />
      </form>
      <nav className='others__links container'>
        <Link
            to="/"
        >¿Ya tienes una cuenta? Inicia Sesión</Link>
        <Link
            to="/register"
        >¿No tienes una cuenta? Regístrate</Link>
      </nav>
    </>
  )
}