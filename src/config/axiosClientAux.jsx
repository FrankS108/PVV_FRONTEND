import axios from 'axios'

const axiosClientAux = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_AUX_URL}/api`
})

export default axiosClientAux;