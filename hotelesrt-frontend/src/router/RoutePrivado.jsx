import { Navigate } from 'react-router-dom'
import { useAutenticador } from '../context/AutenticadorContext'

function RoutePrivado ({ children, soloAdmin = false}) {
    const { estaAutenticado, esAdmin } = useAutenticador()

    // si no esta logeado pasa al login
    if(!estaAutenticado) {
        return <Navigate to="/login"/>
    }

    if(soloAdmin&&!esAdmin) {
        return <Navigate to="/" />

    }

    return children
}

export default RoutePrivado
