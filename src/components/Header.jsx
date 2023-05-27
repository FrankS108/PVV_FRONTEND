import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../styles/header-module.css'



export const Header = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    sessionStorage.removeItem('token');
    navigate('/')
  }
  return (
    <div className="header__block">
        <div className="header__title">
            <p>mycorp</p>
        </div>
        <div className="header__nav">
            <Link to='/enterprises' className="link selected">Empresas</Link>
            {/*<Link to='/enterprises/products' className="link ">Productos</Link>*/}
            {/*<Link to='/enterprises/pv' className="link ">Punto de Venta</Link>*/}
        </div>
        <div >
            <input type="button" value="Cerrar Sesión" className="button--modify" onClick={handleSubmit}/>
        </div>
    </div>
  )
}
