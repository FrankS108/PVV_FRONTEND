import { useState } from "react"
import { useParams } from "react-router-dom";
import { useEnterprise } from "../hooks/useEnterprise";
import { Alert } from "../components/Alert";
import ClipLoader from "react-spinners/ClipLoader";

export const AddProduct = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [amount, setAmount] = useState(0);
    const params = useParams();
    const { id } = params;
    const { alert, submitProduct, setAlert, loading } = useEnterprise();

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
    } 

    const handlePrice = (e) => {
        setPrice(e.target.value);
    }

    const handleAmount = (e) => {
        setAmount(e.target.value);
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if([name, price, amount, description].includes('')){
            setAlert({
                msg: "Todos los campos son olbligatorios",
                error: true
            });
            return;
        }

        submitProduct({
            name: name,
            price: price,
            amount: amount,
            description: description,
            store: `${id}`
        });
    }

    //TODO: Agregar campo con los tags

    const { msg } = alert;

    
    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    

    if(loading) return <div style={style}><ClipLoader loading={loading} color="#FDBC2C" size={150}/></div>
    return (
        <>
            <h2 className="title__page">Agrega un producto</h2>
            { msg && <Alert alert={alert}/>}
            <div className="add__product__container container">
                <form  className='add__product__form container' onSubmit={handleSubmit}>
                    <label htmlFor="name">Nombre:</label>
                    <input value={name} onChange={handleName} className="input__store" type="text" name="name" id="name" placeholder='Nombre del producto'/>
                    <label htmlFor="price">Precio:</label>
                    <input value={price} onChange={handlePrice} className="input__store" type="number" name="price" id="price" placeholder="Precio del producto"/>
                    <label htmlFor="amount">Cantidad:</label>
                    <input value={amount} onChange={handleAmount} className="input__store" type="number" name="amount" id="amount" placeholder="Cantidad del producto"/>
                    <label htmlFor="description">Descripción:</label>
                    <textarea value={description} onChange={handleDescription} className="input__store--text__area" type="text" name="description" id="description" placeholder='Descripción del producto'/>
                    <input className="button" type="submit" value="Guardar producto" />
                </form>
            </div>
        </>
  )
}