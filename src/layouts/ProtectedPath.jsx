import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { Header } from "../components/Header";
import ClipLoader from "react-spinners/ClipLoader";
export const ProtectedPath = () => {
    const { auth, loading } = useAuth();

    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    

    if(loading) return <div style={style}><ClipLoader loading={loading} color="#FDBC2C" size={150}/></div>
    return (
        <>
            {
                auth._id ? (
                    <div>
                        <Header/>
                        <div>
                            <main>
                                <Outlet/> 
                            </main>
                        </div>
                        
                    </div>
                ): <Navigate to='/'/>
            }
        </>
    )
}
