

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AutenticadorProvider } from './context/AutenticadorContext'
import RoutePrivado from './router/RoutePrivado'
import Navbar from './componentes/comunes/Navbar'
import Footer from './componentes/comunes/Footer'
import Inicio from './paginas/Inicio'
import Login from './paginas/Login'
import Registro from './paginas/Registro'
import Reservar from './paginas/Reservar'
import Perfil from './paginas/Perfil'
import AdminPanel from './paginas/admin/AdminPanel'
// <>




function App() {



  return(
    <BrowserRouter>
      <AutenticadorProvider>
        <Routes>

        <Route path="/login" element={<Login />}/>
        <Route path="/registro" element={<Registro />}/>

        <Route path="/admin" element={
            <RoutePrivado soloAdmin={true}>
              <AdminPanel />
            </RoutePrivado>
            }/>

        <Route path="/*" element={
          <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Inicio />}/>
                <Route path="/reservar" element={<Reservar />} />
                <Route path="/mi-perfil" element={
                <RoutePrivado>
                    <Perfil />
                </RoutePrivado>
            } />
            <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          
          
          <Footer />  
          
          </>
        }/>
        </Routes>
      </AutenticadorProvider>
    </BrowserRouter>
  )
}
export default App

