import { useState } from "react"
import { useEnterprise } from "../hooks/useEnterprise"
import { Alert } from '../components/Alert'
import ClipLoader from "react-spinners/ClipLoader";

export const AddCollaborator = () => {
    const [email, setEmail] = useState("")
    const { searchUsers, alert, loading } = useEnterprise();
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(email === "") return;
        await searchUsers(email);
    }

    const { msg } = alert;

    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    

    if(loading) return <div style={style}><ClipLoader loading={loading} color="#FDBC2C" size={150}/></div>
    return (
        <>
            <h2 className="title__page">Agrega un colaborador</h2>
            { msg && <Alert alert={alert}/>}
            <div className="store container">
            <form onSubmit={handleSubmit} className=' login__form container' action="">
                <input value={email} onChange={handleEmail} className="input__store" type="text" name="" id="" placeholder='Correo del colaborador'/>
                <input className="button--modify" type="submit" value="Buscar" />
            </form>
            </div>
        </>
    )
}
