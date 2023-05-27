import { useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useEnterprise } from "../hooks/useEnterprise"
import { StoreCard } from "../components/StoreCard"
import { CollaboratorCard } from "../components/CollaboratorCard"
import ClipLoader from "react-spinners/ClipLoader";
import "../styles/enterprise-information-module.css"

export const Enterprise = () => {

    const params = useParams();
    const navigate = useNavigate();
    const { enterprise, getEnterprise, loading } = useEnterprise();
    const { id } = params;

    useEffect(() => {
        getEnterprise(id);
    }, [])

    

    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    
    if(loading) return <div style={style}><ClipLoader loading={loading} color="#FDBC2C" size={150}/></div>
    return (
        <div className="container enterprise">
            <div className="enterprise__information">
                <p>Nombre: {enterprise?.enterprise?.name}</p>
                <p>Teléfono: {enterprise?.enterprise?.phoneNumber}</p>
                <p>Email: {enterprise?.enterprise?.email}</p>
            </div>

            <div className="">
                <h2>Colaboradores</h2>
                <div className="generic__container">
                    {
                        enterprise?.enterprise?.collaborators?.map((element, index) => (
                            <CollaboratorCard key={index} collaborator={element}/>
                        ))
                    }
                </div>
                
                <div className="add__icon">
                    <Link to="/enterprises/new-collaborator">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </Link>
                </div>
            </div>

            <div>
                <h2>Sucursales</h2>
                <div className="generic__container">
                    {
                        enterprise?.stores?.map((element, index) => (
                            <StoreCard key={index} store={element}/>
                        ))
                    }
                </div>
                <div className="add__icon">
                    <Link to="/enterprises/new-store">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    )
}