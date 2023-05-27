import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert } from '../components/Alert'
import axiosClient from '../config/axiosClient'

export const Register = () => {
  const [name, setName ] = useState("")
  const [email, setEmail ] = useState("")
  const [password, setPassword ] = useState("")
  const [repeatPassword, setRepeatPassword ] = useState("")
  const [alert, setAlert] = useState({})

  //Funciones para obtener los valores de cada input
  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    if([name, email, password, repeatPassword].includes('')){
      setAlert({
        msg: "Todos los campos son obligatorios",
        error: true
      });
      return;
    }

    if(password !== repeatPassword){
      setAlert({
        msg: "Las contraseñas no son iguales",
        error: true
      });
      return;
    }

    if(password.length < 6){
      setAlert({
        msg: "La contraseña es muy corta, agrega minimo 6 caracteres",
        error: true
      });
      return;
    }

    setAlert({})

    //Crear el usuario en la API
    try {
      const { data } = await axiosClient.post('/users', { name, email, password });
      setAlert({
        msg: data.msg,
        error: false
      });

      //Reiniciamos el formulario
      setName("");
      setEmail("");
      setPassword("");
      setRepeatPassword("");
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
      <h1 className='title'>Crea tu cuenta y adiministra tus <span>empresas</span></h1>

      { msg && <Alert alert={alert}/> }
      <form 
        className='login__form'
        onSubmit={handleSubmit}
      >
        <div className='form__input'>
          <label className='generic__text' htmlFor="name">Nombre</label>
          <input
              id='name' 
              type="text"
              placeholder='Tu nombre'
              className='search'
              value={name}
              onChange={handleName} 
          />
          </div>
        <div className='form__input'>
          <label className='generic__text' htmlFor="email">Email</label>
          <input
              id='email' 
              type="email"
              className='search'
              placeholder='Email de Registro' 
              value={email}
              onChange={handleEmail} 
          />
        </div>
        <div className='form__input'>
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
        <div className='form__input'>
          <label className='generic__text' htmlFor="repeatpassword">Repetir Password</label>
          <input
              id='repeatpassword' 
              type="password"
              className='search'
              placeholder='Repetir tu Password'
              value={repeatPassword}
              onChange={handleRepeatPassword}  
          />
        </div>
        <input 
          type="submit" 
          value="Crear cuenta"
          className='button__login'
        />
      </form>
      <nav className='others__links container'>
        <Link
            to="/"
        >¿Ya tienes una cuenta? Inicia Sesión</Link>
        <Link
            to="forget-password"
        >Olvide mi contraseña</Link>
      </nav>
    </>
  )
}