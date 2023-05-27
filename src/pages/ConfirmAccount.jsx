import { useEffect, useState } from "react"
import { useParams, Link} from "react-router-dom"
import axiosClient from "../config/axiosClient"
import { Alert } from "../components/Alert"

export const ConfirmAccount = () => {
  const [alert, setAlert] = useState({})
  const [accountConfirmed, setAccountConfirmed] = useState(false);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/users/confirm/${id}`
        const { data } = await axiosClient.get(url);
        setAlert({
          msg: data.msg,
          error: false
        })

        setAccountConfirmed(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        })
      }
    }

    return () =>  { confirmAccount() }; //Solo se realiza una vez, le afecta el restrict.mode
  }, []);

  const { msg } = alert;
  return (
    <>
      <h1 className="title">Confirma tu cuenta y comienza a crear tus <span>empresas</span></h1>

      <div className="">
        { msg && <Alert alert={alert}/>}

        {accountConfirmed && (
          <nav className="container">
            <Link
              to="/"
              style={{color: "white", textAlign:"center"}}
            >Inicia Sesión</Link>
          </nav>
          
        )}
      </div>
    </>
  )
}