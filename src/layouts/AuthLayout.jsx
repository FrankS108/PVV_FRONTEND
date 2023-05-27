import { Outlet } from "react-router-dom"

export const AuthLayout = () => {
  return (
    <>
        <main>
            <div>
                <Outlet/>
            </div>
        </main>
    </>
  )
}