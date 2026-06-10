import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAutenticador } from "../context/AutenticadorContext"
import reservaService from "../services/reservaService"
import Loader from "../componentes/comunes/Loader"

// <>


const sombraTarjeta = {

    boxShadow: '0 12px 24px -10px rgba(0,0,0,0.04)',
    transition: 'transform 0.3s ease'
}

function Perfil() {

    const {usuario, logout } = useAutenticador()
    const navigate = useNavigate()
    const [reservas, setReservas] = useState([])
    const [cargando, setCargando] = useState(true)
    const [filtro, setFiltro] = useState('activas')

    useEffect(() => {
        console.log('Informacion usuario: ', usuario);
        
        const cargarReservas = async () => {

            if(!usuario) return;
            if(!usuario.id) {
                console.warn("El usuario existe pero no tiene id");
                setCargando(false);
                return;
            }

            try {
                const data = await reservaService.historial(usuario.id)
                setReservas(data || [])         
            } catch(err) {
                console.log('Error al cargar las reservas: ', err)
            } finally {
                setCargando(false)
            }
        }
        cargarReservas()
    }, [usuario])

    const reservasMostradas = Array.isArray(reservas) 
        ? (filtro === 'activas' ? reservas.filter(r => r.estado !== 'CANCELADA') : reservas) : []




    const CancelarReserva = async (reservaId, hotelId) => {
        if(!window.confirm("¿Estas seguro de que quieres cancelar esta reserva?")) return; 
        try {
            await reservaService.cancelarReserva(reservaId,hotelId);

            setReservas(prev => prev.map (r => r.id === reservaId ? { ...r, estado: 'CANCELADA'} : r ));
            alert("Reserva cancelada con éxito");
        } catch(err) {
            console.error("Error al ccancelar la reserva", err);
            alert("No se pudo cancelar la reserva");
        }
    }
    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const getColorEstado = (estado) => {
        switch(estado) {
            case 'CONFIRMADA': return {backgroundColor: '#28a745', color: 'white' }
            case 'PENDIENTE' : return {backgroundColor: '#00677e', color: 'white' }
            case 'CANCELADA' : return {backgroundColor: '#dc3545', color: 'white' }
            default: return {backgroundColor: '#6c757d', color: 'white' }
        }
    }
    console.log('reservas: ', reservas)
    console.log('reservas Mostradas: ', reservasMostradas)
    console.log('cargando: ', cargando)

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight:'100vh' }}>
            <main className="py-5 px-3 px-md-5 mx-auto"
                  style={{ maxWidth: '1280px' }}>
                <div className="row g-4">
                    {/* contenedor izq perfil */}
                    <div className="col-12 col-md-4">
                        <div className="bg-white rounded-3 p-4 text-center mb-4"
                             style={{ ...sombraTarjeta, border: '1px solid rgba(0,0,0,0.06)' }}>
                            <div className="position-relative d-inline-block mb-4">
                                <div className="rounded-circle overflow-hidden"
                                     style={{ width: '128px', height: '128px', border: '4px solid #d0e4ff', backgroundColor: '#e8f0fe'}}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '64px', color: '#003358' }}>
                                        person
                                    </span>
                                </div>
                                <button className="position-absolute bottom-0 end-0 btn rounded-circle p-1"
                                        style={{ backgroundColor: '#003358',
                                                 color: 'white', width: '32px', height:'32px' }}>
                                    <span className="material-symbols-outlined"
                                          style={{ fontSize: '16px'}}>
                                        edit
                                    </span>
                                </button>
                            </div>


                            <h2 className="fw-semibold mb-1"
                                style={{fontSize: '24px', color: '#1a1a1a'}}>
                                {usuario?.nombre} {usuario?.apellidos}
                            </h2>
                            <p className="text-muted mb-4"
                                style={{ fontSize: '14px'}}>
                                {usuario?.email}
                            </p>
                            <p className="text-muted mb-4"
                                style={{ fontSize: '14px'}}>
                                {usuario?.telefono}
                            </p>

                            <div className="d-grid gap-2">
                                <button className="btn py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
                                        style={{backgroundColor :'#f8f9fa',
                                                border:'1px solid #727780',
                                                color: '#003358',
                                                borderRadius: '8px' }}>
                                <span className="material-symbols-outlined"
                                      style={{ fontSize:'20px' }}>
                                    settings
                                </span>
                                    Ajustes
                                </button>
                                <button className="btn py-2 fw-semibold d-flex -align-items-center justify-content-center gap-2"
                                        onClick={handleLogout}
                                        style={{border:'1px solid rgba(220,53,69,0.2)',
                                                color: '#dc3545',
                                                borderRadius: '8px' }}>
                                <span className="material-symbols-outlined"
                                      style={{ fontSize:'20px' }}>
                                    logout
                                </span>
                                    Cerrar Sesión
                                </button>
                            </div>
                        </div>
                    </div>                               
                            {/* Aqui se puede poner la tarjeta de puntos */}
                            {/* Columna derecha reservas */}

                        <div className="col-12 col-md-8">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h1 className="fw-semibold mb-0"
                                    style={{ fontSize: '32px', color: '#1a1a1a'}}>
                                    Mis Reservas
                                </h1>
                            <div className="d-flex gap-2">
                                <button className="btn btn-sm rounded-pill fw-bold"
                                        onClick={() => setFiltro('activas')}
                                        style={{
                                            backgroundColor: filtro === 'activas'
                                            ? '#003358' : '#e7e8e9',
                                            color: filtro === 'activas'
                                            ? 'white' : '#4a4a4a',
                                            fontSize: '12px',
                                            letterSpacing: '0.05em' }}>
                                    Activas
                                </button>
                                <button className="btn btn-sm rounded-pill fw-bold"
                                        onClick={() => setFiltro('todas')}
                                        style={{
                                            backgroundColor: filtro === 'todas'
                                            ? '#003358' : '#e7e8e9',
                                            color: filtro === 'todas'
                                            ? 'white' : '#4a4a4a',
                                            fontSize: '12px',
                                            letterSpacing: '0.05em' }}>
                                    Todas
                                </button>
                            </div>
                        </div>
                        {cargando ? (
                            <Loader />
                        ) : reservasMostradas.length === 0 ? (
                            <div className="text-center py-5 text-muted">
                                <span className="material-symbols-outlined"
                                      style={{ fontSize: '48px' }}>
                                    calendar_today
                                </span>
                                <p className="mt-3">No tienes reservas {filtro == 'activas' ? 'activas' : ''}</p>
                                <button className="btn mt-2 fw-semibold"
                                        onClick={() => navigate('/reservar')}
                                        style={{ backgroundColor: '#003358',
                                                 color: 'white',
                                                 borderRadius:'8px' }}>
                                    Hacer una reserva 
                                </button>
                            </div>
                        ) : (
                            <div className="row g-3"> 
                                {reservasMostradas.map(reserva => (
                                    <div key={reserva.id} className="col-12 col-lg-6">
                                        <div className="bg-white rounded-3 p-4 h-100 d-flex flex-column"
                                         style={{ ...sombraTarjeta, border:'1px solid rgba(0,0,0,0.06)' }}
                                        onMouseEnter= {e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                        onMouseLeave= {e => e.currentTarget.style.transform = 'translateY(0)'}>

                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                                <span className="px-3 py-1 rounded-pill fw-bold"
                                                      style={{ fontSize: '12px', ...getColorEstado(reserva.estado) }}>
                                                    {reserva.estado}
                                                </span>
                                                <span className="fw-bold" style={{ fontSize:'20px', color: '#003358'}}>
                                                    {reserva.precioTotal} €
                                                </span>
                                             </div>
                                                            <h3 className="fw-semibold mb-1"
                                                                style={{fontSize: '24px',
                                                                        color: '#1a1a1a'}}>
                                                                Hotel {reserva.hotelId}
                                                            </h3>
                                                            <p className="fw-medium mb-0"
                                                                style={{ color: '#00677e',
                                                                        fontSize:'18px'}}>
                                                                Habitación {reserva.habitacionId}
                                                            </p>
                                                       
                                                        
                                                    <div className="d-flex flex-wrap gap-3 mb-3">
                                                        <div>
                                                            <p className="fw-bold text-uppercase mb-0"
                                                                    style={{ fontSize: '10px',
                                                                             letterSpacing: '0.05em', color: '#727780'}}>
                                                                    Check-in
                                                                </p>
                                                                <p className="mb-0"
                                                                    style={{ fontSize: '14px'}}>
                                                                    {reserva.fechaEntrada}
                                                                </p>
                                                        </div>
                                                            <div>
                                                                <p className="fw-bold text-uppercase mb-0"
                                                                    style={{ fontSize: '10px',
                                                                             letterSpacing: '0.05em', color: '#727780'}}>
                                                                    Check-out
                                                                </p>
                                                                <p className="mb-0"
                                                                    style={{ fontSize: '14px'}}>
                                                                    {reserva.fechaSalida}
                                                                </p>
                                                            </div>
                                                            
                                                            <div>
                                                                <p className="fw-bold text-uppercase mb-0"
                                                                    style={{ fontSize: '10px',
                                                                             letterSpacing: '0.05em'}}>
                                                                    Huéspedes
                                                                </p>
                                                                <p className="mb-0"
                                                                    style={{ fontSize: '16px'}}>
                                                                    {reserva.numPersonas} persona/s
                                                                </p>
                                                            </div>
                                                        </div>
                                                  
                                                <div className="d-flex  gap-2 mt-auto pt-3"
                                                     style={{ borderTop: '1px solid #e1e3e4' }}>
                                                    <button className="btn flex-grow-1 fw-semibold"
                                                            style={{ border: '1px solid #003358',
                                                                     color: '#003358',
                                                                     borderRadius: '8px', fontSize: '14px' }}>
                                                            Ver detalles
                                                    </button>
                                                    {reserva.estado !== 'CANCELADA' && (
                                                        <button className="btn flex-grow-1 fw-semibold"
                                                                onClick={() => CancelarReserva(reserva.id, reserva.hotelId)}
                                                                style={{ backgroundColor: '#dc3545',
                                                                         color: 'white',
                                                                         borderRadius: '8px', fontSize:'14px' }}>
                                                            Gestionar
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        </div>    

                    
                </div>
            </main>
        </div>
    )
} 
export default Perfil