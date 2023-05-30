import { useState, createContext, useEffect} from "react";
import axiosClient from "../config/axiosClient";

const ApiContext = createContext();

const ApiProvider = ({children}) => {
    const [apiActual, setApiActual] = useState(0)
    const [apis, setApis] = useState([
        `${import.meta.env.VITE_BACKEND_URL}/api`,
        `${import.meta.env.VITE_BACKEND_AUX_URL}/api`
    ])

    const handleSumbitApi = () => {
        const api = apiActual === apis.length - 1 ? 0 : (apiActual + 1);
        console.log(`La api ahora es ${api}`)
        setApiActual(api)
        console.log(`La api en el estado es ${apiActual}`)
        axiosClient.defaults.baseURL = apis[api];
    }
    
    return (
        <ApiContext.Provider
            value={{
                apis,
                apiActual,
                handleSumbitApi
            }}
        >
            {children}
        </ApiContext.Provider>
    )
}

export{
    ApiProvider
}

export default ApiContext;