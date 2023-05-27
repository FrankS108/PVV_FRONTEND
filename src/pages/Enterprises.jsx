import { useNavigate } from 'react-router-dom';
import { useEnterprise } from '../hooks/useEnterprise';
import { EnterpriseCard } from '../components/EnterpriseCard';
import ClipLoader from "react-spinners/ClipLoader";
import '../styles/enterprises-module.css'
import { useEffect } from 'react';

export const Enterprises = () => {

  const { getEnterprises,enterprises, loading } = useEnterprise();

  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.preventDefault();
    navigate('/enterprises/new-enterprise');
  }

  useEffect(() => {
    return () => { getEnterprises() };
  }, [])

  const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    

  if(loading) return <div style={style}><ClipLoader loading={loading} color="#FDBC2C" size={150}/></div>
  return (
    <>
      <div className="inputs container">
        <input className="search" type="search" name="" id="search" placeholder="Buscar"/>
        <button className="add" onClick={handleAdd}>+</button>
      </div>
      <div className="enterprises__block container">
        {
          enterprises.length ? 
          enterprises.map((element, index) => (
            <EnterpriseCard key={index} enterprise={element}/>
          ))
          : <p className="text__alternative">No hay empresas aún</p>
        }
      </div>
    </>
  )
}