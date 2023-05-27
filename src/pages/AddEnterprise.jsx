import { useState } from "react"
import { useEnterprise } from "../hooks/useEnterprise"
import { Alert } from "../components/Alert"
import ClipLoader from "react-spinners/ClipLoader";


export const AddEnterprise = () => {
    const [name, setName] = useState("")
    const [phoneNumber, setPhone] = useState("")
    const [adress, setAdress] = useState("")
    const [email, setEmail] = useState("")


    const { submitEnterprise, alert, setAlert, loading } = useEnterprise();

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handlePhone = (e) => {
        setPhone(e.target.value);
    }

    const handleAdress = (e) => {
        setAdress(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmitForm = async(e) => {
        e.preventDefault();

        if([name, phoneNumber, adress, email].includes('')){
            setAlert({
                msg: "Todos los campos son obligatorios",
                error: true
            })
            return;
        }

        setAlert({})
        await submitEnterprise({name, phoneNumber, adress, email});
    }

    const { msg } = alert;

    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    

    if(loading) return <div style={style}><ClipLoader loading={loading} color="#FDBC2C" size={150}/></div>
    return (
        <>
            <h1 className="title">Crea una <span>empresa</span></h1>
            { msg && <Alert alert={alert}/> }
            <form 
                className="login__form"
                onSubmit={handleSubmitForm}
            >
                <div className="form__input">
                    <label className="generic__text" htmlFor="name">Nombre</label>
                    <input
                        id='name' 
                        type="text"
                        placeholder='Tu nombre'
                        value={name}
                        onChange={handleName}
                        className="search"
                    />
                </div>
                <div className="form__input">
                    <label className="generic__text" htmlFor="name">Teléfono</label>
                    <input
                        id='name' 
                        type="tel"
                        placeholder='Número de teléfono de la empresa'
                        value={phoneNumber}
                        onChange={handlePhone}
                        className="search" 
                    />
                </div>
                <div className="form__input">
                    <label className="generic__text" htmlFor="name">Dirección</label>
                    <input
                        id='name' 
                        type="tel"
                        placeholder='Dirección de la empresa'
                        value={adress}
                        onChange={handleAdress}
                        className="search"
                    />
                </div>
                <div className="form__input">
                    <label className="generic__text" htmlFor="email">Email</label>
                    <input
                        id='email' 
                        type="email"
                        placeholder='Email de Registro' 
                        value={email}
                        onChange={handleEmail}
                        className="search"
                    />
                </div>
                
                <input 
                    className="button--modify"
                    type="submit" 
                    value="Crear empresa"
                />
            </form>
        </>
    )
}
