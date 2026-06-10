import { Link, useNavigate } from 'react-router-dom'
import { useAutenticador} from '../../context/AutenticadorContext'

function Navbar(){



    const {estaAutenticado, usuario, logout } = useAutenticador()
    const esAdmin = usuario?.rol ==='ADMIN_HOTEL'
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }
    return (
        <nav className="navbar navbar-expand-md px-4 px-md-5"
            style={{ backgroundColor: '#003358', minHeight: '80px'}}>


        <Link className="navbar-brand d-flex align-items-center gap-2" to="7">
            <span className="material-symbols-outlined text-white fs-3">
                icono
            </span>
            <span className="fw-bold fs-4 text-white">
                HotelesRT
            </span>
        
        </Link>
        <button className="navbar-toggler border-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarMenu">

            <span className="material-symbols-outlined text-white">
                menu
            </span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMenu">
            <ul className="navbar-nav mx-auto gap-3">
                <li className="nav-item">
                    <Link className="nav-link text-ehite-50 fw-medium" to="/reservar">
                        Reservar
                    </Link>
                </li>
                {estaAutenticado &&(
                    <li className="nav-item">
                        <Link className="nav-link text-white-50 fw-medium" to="/mi-perfil">
                            Mi Perfil
                        </Link>
                    </li>
                )}
                {esAdmin &&(
                    <li className="nav-item">
                        <Link className="nav-link text-white-50 fw-medium" to="/admin">
                            Panel Admin
                        </Link>
                    </li>
                )}
            </ul>
            <div className="d-flex align-items-center gap-3">
                {!estaAutenticado ? (
                    <>
                        <Link to="/registro" className="btn btn-link text-white text-decoration-none fw-medium">
                            Registrarse
                        </Link>
                        <Link to="/login"
                              className="btn fw-semibold px-4 py-2"
                              style={{
                                  backgroundColor: '#5db8fe',
                                  color: '#005c71',
                                  borderRadius: '8px'
                              }}>
                            Iniciar Sesión
                        </Link>                  
                    </>
                ) : (
                    <>
                        <span className="text-white-50 fw-medium">
                            Hola, {usuario?.nombre}
                        </span>
                        <button onClick={handleLogout}
                                className="btn fw-semibold px-4 py-2"
                                style={{
                                    backgroundColor: '#5db8fe',
                                    color: '#005c71',
                                    borderRadius: '8px'
                                }}>
                            Cerrar Sesión
                        </button>
                    </>
                )}
            </div>
     </div>
  </nav> 
    )
}
export default Navbar