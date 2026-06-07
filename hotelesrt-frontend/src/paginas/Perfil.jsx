import { useState } from "react"

// <>


const sombraTarjeta = {

    boxShadow: '0 12px 24px -10px rga(0,0,0,0.04)',
    transition: 'transform 0.3s ease'
}

function Perfil() {

    const {usuario, logout } = useAuth()
    const navigate = useNavigate()
    const [reservas, setReservas] = useState([])
    const [cargando, setCargando] = useState(true)
    const [filtro, setFiltro] = useState('activas')

    useEffect(() => {
        const cargarReservas = async () => {
            try {
                const data = filtro === 'activas'
                    ? await reservaService.misReservas(1)
                    : await reservaService.historial(1)
                setReservas(data)         
            } catch(err) {
                console.log('Error al cargar las reservas: ', err)
            } finally {
                setCargando(false)
            }
        }
        cargarReservas()
    }, [filtro])

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

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight:'100vh' }}>
            <main className="py-5 px-3 px-md-5 mx-auto"
                  style={{ maxWidth: '1280px' }}>
                <div className="row g-4">
                    <div className="col-12 col.md-4">
                        <div className="bg-white rounded-3 p-4 text-center mb-4"
                             style={{ ...sombraTarjeta, border: '1px solid rgba(0,0,0,0.06)' }}>
                            <div className="position-relative d-inline-block mb-4">
                                <div className="rounded-circle overflow-hidden"
                                     style={{ width: '128px', height: '128px', border: '4px solid #d0e4ff'}}>
                                    <img src="..." alt="Foto de Perfil"
                                         className="w-100 h-100 object-fit-cover" />
                                </div>
                                <button className="position-absolute bottom-0end-0 btn rounded-circle p-1"
                                        style={{ backgroundColor: '#003358',
                                                 color: 'white', width: '32px', height:'32px' }}>
                                    <span className="material-symbols-outlined"
                                          style={{ fontSize: '16px '}}>
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

                            <div className="d-grip gap-2">
                                <button className="btn py-2 fw-semibold d-flex -align-items-center justify-content-center gap-2"
                                        style={{backgroundColor :'#f8f9fa',
                                                border:'1px solid #727780',
                                                color: '#003358',
                                                borderRadius: '8px' }}>
                                <span className="material-symbols-outlined"
                                      style={{ fontSize:'20px' }}>
                                    Ajustes
                                </span>
                                </button>
                                <button className="btn py-2 fw-semibold d-flex -align-items-center justify-content-center gap-2"
                                        onClick={handleLogout}
                                        style={{border:'1px solid rgba(220,53,69,0.2)',
                                                color: '#dc3545',
                                                borderRadius: '8px' }}>
                                <span className="material-symbols-outlined"
                                      style={{ fontSize:'20px' }}>
                                    Cerrar Sesión
                                </span>
                                    Cerrar Sesión
                                </button>
                            </div>
                        </div>

                            {/* Aqui se puede poner la tarjeta de puntos */}

                        <div className="col-12 col-md-8">
                            <div className="d-flex justify-content-between aling-items-center mb-4">
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
                                        onClick={() => setFiltro('anteriores')}
                                        style={{
                                            backgroundColor: filtro === 'anteriores'
                                            ? '#003358' : '#e7e8e9',
                                            color: filtro === 'anteriores'
                                            ? 'white' : '#4a4a4a',
                                            fontSize: '12px',
                                            letterSpacing: '0.05em' }}>
                                    Anteriores
                                </button>
                            </div>
                        </div>
                        {cargando ? (
                            <Loader />
                        ) : reservas.length === 0 ? (
                            <div className="text-center py-5 text-muted">
                                <span className="material-symbols-outlined"
                                      style={{ fontSize: '48px' }}>
                                    calendar_today
                                </span>
                                <p className="mt-3">No tienes reservas {filtro}</p>
                                <button className="btn mt-2 fw-semibold"
                                        onClick={() => navigate('/reservar')}
                                        style={{ backroundColor: '#003358',
                                                 color: 'white',
                                                 borderRadius:'8px' }}>
                                    Hacer una reserva 
                                </button>
                            </div>
                        ) : (
                            <div className="d-flex flex-column gap-4"> 
                                {reservas.map(reserva => (
                                    <div key={reserva.id}
                                         className="bg-white rounder-3 overflow-hidden d-flex flex-column flex-md-row"
                                         style={{ ...sombraTarjeta, vorder:'1px solid rgba(0,0,0,0.06)' }}>
                                        onMouseEnter= {e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                        onMouseLeave= {e => e.currentTarget.style.transform = 'translateY(0)'}

                                        <div className="position-relative overflow-hidden"
                                             style={{width: '100%', maxWidth:'256px', minHeight: '192px' }}>
                                                <img src="{reserva.imagenUrl}" alt="Hotel"
                                                     className="w-100 h-100 object-fit-cover" />
                                                <span className="position-absolute top-0 start-0 m-3 px-3 py-1 rounded-pill fw-bold"
                                                      style={{ fontSize: '12px', ...getColorEstado(reserva.estado) }}>
                                                    {reserva.estado}
                                                </span>
                                             </div>
                                            <div className="flex-grow-1 p-4 d-flex flex-column justify-content-between">
                                                <div>
                                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                                        <div>
                                                            <h3 className="fw-semibold mb-1"
                                                                style={{fontSize: '24px',
                                                                        color: '#1a1a1a'}}>
                                                                Hotel {reserva.hotel_id}
                                                            </h3>
                                                            <p className="fw-medium mb-0"
                                                                style={{ color: '#00677e',
                                                                        fontSize:'18px'}}>
                                                                Habitación {reserva.habitacion_id}
                                                            </p>
                                                        </div>
                                                        <p className="fw-semibold mb-0"
                                                            style ={{ fontSize: '24px', color: '#003358' }}>
                                                            {reserva.precioTotal} €
                                                            <span className="fw-normal"
                                                                  style={{ fontSize:'14px',
                                                                          color:'#4a4a4a' } }>
                                                                /total
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div className="d-flex flex-wrap gap-4 mt-3">
                                                        <div className="d-flex align-items-center gap-2"
                                                             style={{ color: '#4a4a4a' }}>
                                                            <span className="material-symbols-outlined"
                                                                  style={{ fontSize: '20px',
                                                                           color: '#727780' }}>
                                                                calendar_today
                                                            </span>
                                                            <div>
                                                                <p className="fw-bold text-uppercase mb-0"
                                                                    style={{ fontSize: '10px',
                                                                             letterSpacing: '0.05em'}}>
                                                                    Check-in
                                                                </p>
                                                                <p className="mb-0"
                                                                    style={{ fontSize: '16px'}}>
                                                                    {reserva.fecha_entrada}
                                                                </p>
                                                            </div>
                                                        </div>
                                                         <div className="d-flex align-items-center gap-2"
                                                             style={{ color: '#4a4a4a' }}>
                                                            <span className="material-symbols-outlined"
                                                                  style={{ fontSize: '20px',
                                                                           color: '#727780' }}>
                                                                logout
                                                            </span>
                                                            <div>
                                                                <p className="fw-bold text-uppercase mb-0"
                                                                    style={{ fontSize: '10px',
                                                                             letterSpacing: '0.05em'}}>
                                                                    Check-out
                                                                </p>
                                                                <p className="mb-0"
                                                                    style={{ fontSize: '16px'}}>
                                                                    {reserva.fecha_salida}
                                                                </p>
                                                            </div>
                                                        </div>
                                                         <div className="d-flex align-items-center gap-2"
                                                             style={{ color: '#4a4a4a' }}>
                                                            <span className="material-symbols-outlined"
                                                                  style={{ fontSize: '20px',
                                                                           color: '#727780' }}>
                                                                person
                                                            </span>
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
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-end gap-2 mt-4 pt-3"
                                                     style={{ borderTop: '1px solid #c1c7d0' }}>
                                                    <button className="btn px-4 py-2 fw-semibold"
                                                            style={{ border: '1px solid #003358',
                                                                     color: '#003358',
                                                                     borderRadius: '8px' }}>
                                                            Ver detalles
                                                    </button>
                                                    {reserva.estado !== 'CANCELADA' && (
                                                        <button className="btn px-4 py-2 fw-semibold"
                                                                style={{ backgroundColor: '#003358',
                                                                         color: 'white',
                                                                         borderRadius: '8px' }}>
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
                </div>
            </main>
        </div>
    )
} 
export default Perfil