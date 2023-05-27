import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthLayout } from './layouts/AuthLayout'
import { ProtectedPath } from './layouts/ProtectedPath'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { ForgetPassword } from './pages/ForgetPassword'
import { NewPassword } from './pages/NewPassword'
import { ConfirmAccount } from './pages/ConfirmAccount'
import { Enterprises } from './pages/Enterprises'
import { Products } from './pages/Products'
import { Employees } from './pages/Employees'
import { AddEnterprise } from './pages/AddEnterprise'
import { Enterprise } from './pages/Enterprise'
import { AddStore } from './pages/AddStore'
import { AddCollaborator } from './pages/AddCollaborator'
import { AuthProvider } from './context/AuthProvider'
import { EnterpriseProvider } from './context/EnterpriseProvider'
import './App.css'
import { AddProduct } from './pages/AddProduct'






function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <EnterpriseProvider>
          <Routes>
            <Route path='/' element={<AuthLayout/>}>
              <Route index element={<Login/>}/>
              <Route path='register' element={<Register/>}/>
              <Route path='forget-password' element={<ForgetPassword/>}/>
              <Route path='forget-password/:token' element={<NewPassword/>}/>
              <Route path='confirm/:id' element={<ConfirmAccount/>}/>
            </Route>
            <Route path='/enterprises' element={<ProtectedPath/>}>
              <Route index element={<Enterprises/>}/>
              <Route path='new-collaborator' element={<AddCollaborator/>}/>
              <Route path='new-enterprise' element={<AddEnterprise/>}/>
              <Route path='new-store' element={<AddStore/>}/>
              <Route path='employees' element={<Employees/>}/>
              <Route path='new-product/:id' element={<AddProduct/>}/>
              <Route path='products/:id' element={<Products/>}/>
              <Route path=':id' element={<Enterprise/>}/>
            </Route>
          </Routes>
        </EnterpriseProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
