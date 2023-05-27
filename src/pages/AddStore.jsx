import { useState } from 'react'
import { useEnterprise } from '../hooks/useEnterprise'
import { Alert } from '../components/Alert'
import ClipLoader from "react-spinners/ClipLoader";

import '../styles/add-store-module.css'

export const AddStore = () => {
  const [name, setName] = useState("")
  const { submitStore, enterprise, alert, loading } = useEnterprise();
  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(name === "") return;
    const { _id } = enterprise.enterprise
    await submitStore({
      name: name,
      enterprise: _id
    })
  }
  const { msg } = alert;

  const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    

  if(loading) return <div style={style}><ClipLoader loading={loading} color="#FDBC2C" size={150}/></div>
  return (
    <>
      <h2 className="title__page">Agrega una sucursal</h2>
      { msg && <Alert alert={alert}/>}
      <div className="store container">
        <form onSubmit={handleSubmit} className='login__form container' action="">
          <input value={name} onChange={handleName} className="input__store" type="text" name="" id="" placeholder='Nombre del almacen'/>
          <input className="button--modify" type="submit" value="Crear almacen" />
        </form>
      </div>
    </>
    
  )
}
