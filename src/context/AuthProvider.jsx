import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../config/axiosClient";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({})
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const authenticateUser = async () => {
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

            try {
                const { data } = await axiosClient.get('/users/profile', config);
                setAuth(data);
                window.location.pathname == '/' ? navigate('/enterprises'): navigate(window.location.pathname);
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
                setAuth({})
            } finally {
                setLoading(false);
            }
            setLoading(false);
        }

        authenticateUser()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export{
    AuthProvider
}

export default AuthContext;