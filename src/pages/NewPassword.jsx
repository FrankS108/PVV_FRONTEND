import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Alert } from '../components/Alert'
import axiosClient from '../config/axiosClient'

export const NewPassword = () => {
  const [password, setPassword] = useState("")
  const [alert, setAlert] = useState({})
  const [validToken, setValidToken] = useState(false)
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const verifyToken = async() => {
      try {
        await axiosClient.get(`/users/reset-password/${token}`);
        setValidToken(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    return () => { verifyToken() }
  }, [])

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if(password.length < 6){
      setAlert({
        msg: "La contraseña es muy corta, agrega minimo 6 caracteres",
        error: true
      });
      return;
    }

    try {
      const url = `/users/reset-password/${token}`
      const { data } = await axiosClient.post(url, { password })
      setAlert({
        msg: data.msg,
        error: false
      });
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      });
    }
  }
  
  const { msg } = alert;

  return (
    <>
      <h1>Reestablece tu contraseña y no pierdas acceso a tus <span>empresas</span></h1>
      { msg && <Alert alert={alert}/>}
      {
        validToken && (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password">Nuevo Password</label>
              <input
                id='password' 
                type="password"
                placeholder='Escribe tu nuevo password'
                value={password}
                onChange={handlePassword}
              />
            </div>
            <input 
              type="submit" 
              value="Guardar nuevo password"
            />
          </form>
        )
      }
    </>
  )
}