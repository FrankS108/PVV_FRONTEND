import { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../config/axiosClient";
import { useAPI } from '../hooks/useAPI'

const EnterpriseContext = createContext();

const EnterpriseProvider = ({ children }) => {
    const [enterprises, setEnterprises] = useState([])
    const [enterprise, setEnterprise] = useState({})
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [alert, setAlert] = useState({})

    const navigate = useNavigate();
    const { handleSumbitApi } = useAPI();
    const submitEnterprise = async(enterprise) => {
        setLoading(true);
        const token = sessionStorage.getItem('token')
        if(!token){
            setLoading(false);
            return;
        }

        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axiosClient.post('/enterprise', enterprise, config);
            setLoading(false);
            setAlert({
                msg: data.msg,
                error: false
            })
            setTimeout(() => {
                setAlert({})
                navigate(`/enterprises`);
            }, "5000");
        } catch (error) {
            setLoading(false);
            if(error.code === "ERR_NETWORK"){
                setAlert({
                    msg: "Error de conexión, intentalo de nuevo.",
                    error: true
                })
                setTimeout(() => {
                    setAlert({})
                }, "5000");
                handleSumbitApi();
            }
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlert({})
            }, "5000");
        }finally{
            setLoading(false);
        }
    }

    const submitStore = async(store) => {
        setLoading(true);
        const token = sessionStorage.getItem('token')
        if(!token){
            setLoading(false);
            return;
        }

        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axiosClient.post('/store', store, config);
            setLoading(false);
            setAlert({
                msg: data.msg,
                error: false
            })
            setTimeout(() => {
                setAlert({})
                navigate(`/enterprises/${enterprise.enterprise._id}`);
            }, "5000");
        } catch (error) {
            setLoading(false);
            if(error.code === "ERR_NETWORK"){
                setAlert({
                    msg: "Error de conexión, intentalo de nuevo.",
                    error: true
                })
                setTimeout(() => {
                    setAlert({})
                }, "5000");
                handleSumbitApi();
            }
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlert({})
            }, "5000");
        }
    }

    const getEnterprise = async(id) => {
        setLoading(true);
        const token = sessionStorage.getItem('token')
        if(!token) {
            //setLoading(false);
            return;
        }

        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axiosClient.get(`/enterprise/${id}`, config);
            setLoading(false)
            setEnterprise(data);
        } catch (error) {
            setLoading(false)
            if(error.code === "ERR_NETWORK"){
                setAlert({
                    msg: "Error de conexión, intentalo de nuevo.",
                    error: true
                })
                setTimeout(() => {
                    setAlert({})
                }, "5000");
                handleSumbitApi();
            }
            console.log(error)
            navigate(`/enterprises`);
        }
        finally{
            setLoading(false);
        }
    }

    const searchUsers = async(email) => {
        setLoading(true);
        const token = sessionStorage.getItem('token')
        if(!token) {
            setLoading(false);
            return;
        };

        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        const { _id } = enterprise.enterprise;

        try {
            const { data } = await axiosClient.post(`/enterprise/add-collaborators/${_id}`, { email }, config);
            setLoading(false);
            setAlert({
                msg: data.msg,
                error: false
            })
            setTimeout(() => {
                setAlert({})
                navigate(`/enterprises/${enterprise.enterprise._id}`);
            }, "5000");
            
        } catch (error) {
            setLoading(false);
            if(error.code === "ERR_NETWORK"){
                setAlert({
                    msg: "Error de conexión, intentalo de nuevo.",
                    error: true
                })
                setTimeout(() => {
                    setAlert({})
                }, "5000");
                handleSumbitApi();
            }
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlert({})
            }, "5000");
            
        }finally{
            setLoading(false)
        }
    }

    const deleteCollaborator = async(id) => {
        const token = sessionStorage.getItem('token')
        if(!token) return;

        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        const { _id } = enterprise.enterprise;

        try {
            const { data } = await axiosClient.post(`/enterprise/delete-collaborators/${_id}`, {id: id}, config);
            const enterpriseUpdated = {...enterprise};
            enterpriseUpdated.enterprise.collaborators = enterpriseUpdated.enterprise.collaborators.filter(collaborator =>  collaborator._id !== id );
            setAlert({
                msg: data.msg,
                error: false
            })
            setTimeout(() => {
                setAlert({})
            }, "5000");
            setEnterprise(enterpriseUpdated);
        } catch (error) {
            if(error.code === "ERR_NETWORK"){
                setAlert({
                    msg: "Error de conexión, intentalo de nuevo.",
                    error: true
                })
                setTimeout(() => {
                    setAlert({})
                }, "5000");
                handleSumbitApi();
            }
            console.log(error.response.data.msg)
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlert({})
            }, "5000");
        }
        
    }

    const deleteStore = async(id) => {
        const token = sessionStorage.getItem('token')
        if(!token) return;

        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        const { _id } = enterprise.enterprise;

        try {
            const response = await axiosClient.post(`/enterprise/delete-store/${_id}`, {id: id}, config);
            const enterpriseUpdated = {...enterprise};
            enterpriseUpdated.stores = enterpriseUpdated.stores.filter(store =>  store._id !== id );
            setEnterprise(enterpriseUpdated);
            //TODO: CAMBIAR ALERTA
            console.log(response);
        } catch (error) {
            if(error.code === "ERR_NETWORK"){
                setAlert({
                    msg: "Error de conexión, intentalo de nuevo.",
                    error: true
                })
                setTimeout(() => {
                    setAlert({})
                }, "5000");
                handleSumbitApi();
            }
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlert({})
            }, "5000");
        }
    }

    const getProducts = async(id) => {
        setLoading(true);
        const token = sessionStorage.getItem('token')
        if(!token) return;

        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axiosClient.get(`/store/${id}`, config);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            if(error.code === "ERR_NETWORK"){
                setAlert({
                    msg: "Error de conexión, intentalo de nuevo.",
                    error: true
                })
                setTimeout(() => {
                    setAlert({})
                }, "5000");
                handleSumbitApi();
            }
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlert({})
            }, "5000");
        }
        finally{
            setLoading(false);
        }
    }

    const submitProduct = async(product) => {
        setLoading(true)
        const token = sessionStorage.getItem('token')
        if(!token) return;

        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axiosClient.post(`/product`, product, config);
            setLoading(false);
            setAlert({
                msg: data.msg,
                error: false
            })
            setTimeout(() => {
                setAlert({})
                navigate(`/enterprises/products/${product.store}`);
            }, "5000");
        } catch (error) {
            setLoading(false);
            if(error.code === "ERR_NETWORK"){
                setAlert({
                    msg: "Error de conexión, intentalo de nuevo.",
                    error: true
                })
                setTimeout(() => {
                    setAlert({})
                }, "5000");
                handleSumbitApi();
            }
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlert({})
            }, "5000");
        }
    }

    const handleSearchProduct = (name) => {
        console.log(name)
        const copy = [...products];

        const searchCopy = copy.filter((product) => {
            if(product.name.toLowerCase().match(name.toLowerCase())){
                return product;
            }
        })

        console.log(searchCopy);
    }

    /*    
    useEffect(() => {
        const token = sessionStorage.getItem('token')
        if(!token){
            setLoading(false);
            return
        }

        const config = {
            headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
            }
        }

        const getEnterprises = async() => {
            try {
                const { data } = await axiosClient.get('/enterprise', config);
                setEnterprises(data);
            } catch (error) {
                setEnterprises({})
            }
            finally{
                setLoading(false);
            }
        }

        return () => { getEnterprises() }
    }, [])
    */

    const getEnterprises = async() => {
        const token = sessionStorage.getItem('token')
        if(!token){
            return
        }

        const config = {
            headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axiosClient.get('/enterprise', config);
            setEnterprises(data);
        } catch (error) {
            if(error.code === "ERR_NETWORK"){
                setAlert({
                    msg: "Error de conexión, intentalo de nuevo.",
                    error: true
                })
                setTimeout(() => {
                    setAlert({})
                }, "5000");
                handleSumbitApi();
            }
            setEnterprises({})
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <EnterpriseContext.Provider value={{
            enterprises,
            setEnterprises,
            loading,
            submitEnterprise,
            alert,
            setAlert,
            enterprise,
            getEnterprise,
            getEnterprises,
            submitStore,
            searchUsers,
            deleteCollaborator,
            deleteStore,
            getProducts,
            products,
            submitProduct,
            handleSearchProduct
        }}>
            { children }
        </EnterpriseContext.Provider>
    )
}

export{
    EnterpriseProvider
}

export default EnterpriseContext;