import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAutenticador } from "../../context/AutenticadorContext"
import reservaService from "../../services/reservaService"
import adminService from "../../services/adminService"
import Loader from "../../componentes/comunes/Loader"
// <>

function ColorEstado({estado}) {
    const colores ={
        CONFIRMADA: {bg: 'rgba(40,167,69,0.1)', color: '#28a745', punto: '#28a745'},
        PENDIENTE: {bg: 'rgba(91,216,254,0.2)', color: '#005c71', punto: '#5bd8fe'},
        CANCELADA: {bg: 'rgba(220,53,69,0.1)', color: '#dc3545', punto: '#dc3545'}
}
    const c = colores[estado] || colores.PENDIENTE

    return (
        <span className="px-2 py-1 rounded-pill fw-bold d-inline-flex align-items-center gap-1"
              style={{backgroundColor: c.bg, color: c.color, fontSize:'11px'}}>
            <span className="rounded-circle" style={{width: '6px', height:'6px',
                                                     backgroundColor: c.punto, display: 'inline-block'}}></span>
                {estado}
              </span>
    )
}

// dashboard

function SeccionDashboard ({ stats, reservas, cargando }){
    return (




        <div className="d-flex flex-column gap-4">
            <div className="d-flex justify-content-between align-items-end">
                <div>
                    <h2 className="fw-semibold mb-1" style={{ fontSize:'32px', color: '#1a1a1a' }}>
                        Dashboard
                    </h2>
                    <p style={{ fontSize: '16px', color:'#4a4a4a'}}>
                        Bienvenido de nuevo. Aqui tienes el resumen de hoy
                    </p>
                </div>
                <button className="btn d-flex align-items-center gap-2 fw-semibold"
                        style={{ backgroundColor: '#003358', color:'white', borderRadius: '8px' }}>
                    <span className="material-symbols-outlined"> Add</span>
                    Nueva Reserva
                </button>
            </div>

            <div className="row g-3">
                {[
                    { icono: 'bed', label: 'Habitaciones Activas', valor: stats?.totalHabitaciones || 0,
                      bgIcon: '#d0e4ff', colorIcon: '#003358', trend:'+2%', up: true},
                    { icono: 'calendar_month', label: 'Reservas Confirmadas', valor: stats?.totalReservas || 0,
                      bgIcon: '#b5ebff', colorIcon: '#00677e', trend:'+12%', up: true},
                    { icono: 'payments', label: 'Ingresos del Mes', valor: `${stats?.ingresosMes || 0} €`,
                      bgIcon: '#d2e6ef', colorIcon: '#21333a', trend:'+8%', up: true},
                    { icono: 'analytics', label: 'Opupacion', valor: '84.5%',
                      bgIcon: '#004a7c', colorIcon: '#87baf3', trend:'-1%', up: false}
                ]. map((m,i) => (
                    <div key={i} className="col-12 col-md-6 col-lg-3">
                        <div className="bg-white rounded-3 p-4"
                             style={{boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                                     border: '1px solid rgba(225, 227, 228, 0.5)',
                                     transition: 'transform 0.3s ease'}}
                             onMouseEnter={e=>e.currentTarget.style.transform = 'translateY(-2px)'}
                             onMouseLeave={e=>e.currentTarget.style.transform = 'translateY(0)'}>
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <div className="p-2 rounded-2" style={{ backgroundColor: m.bgIcon}}>
                                        <span className="material-symbols-outlined" style={{ color: m.colorIcon}}>
                                            {m.icono}
                                        </span>
                                    </div>
                                    <span className="fw-bold d-flex align-items-center gap-1"
                                          style={{ fontSize:'12px',color: m.up ? '#28a745' : '#dc3545'}}>
                                            <span className="material-symbols-outlined"  style={{ fontSize:'16px'}}>
                                                {m.up ? 'trending_up' : 'trending_down'}
                                            </span>
                                            {m.trend}
                                          </span>
                                </div>
                                <p className="fw-bold text-uppercase mb-1" style={{ fontSize: '12px', color: '#4a4a4a', letterSpacing: '0.05em'}}>
                                    {m.label}
                                </p>
                                <p className="fw-semibold mb-0" style={{ fontSize: '32px', color: '#1a1a1a'}}>
                                    {m.valor}
                                </p>                              
                        </div>
                    </div>
                ) )}
            </div>
            <div className="d-flex flex-column flex-lg-row gap-4">
                <div className="bg-white rounded-3 overflow-hidden" style={{ flex: '0 0 70%',
                                                                             boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                                                                              border: '1px solid rgba(225, 227, 228, 0.5)'}}>
                    <div className="d-flex justify-content-center align-items-center px-3 py-3"
                         style={{ borderBottom: '1px solid rgba(225, 227, 228, 0.5)'}}>
                        <h3 className="fw-semibold mb-0" style={{fontSize: '24px', color: '#1a1a1a'}}>
                            Ultimas Reservas
                        </h3>
                        <button className="btn btn-link p-0 fw-semibold text-decoration-none"
                                style={{ color: '#003358', fontSize:'14px' }}>
                             Ver todas
                        </button>
                         </div>
                         {cargando ? <Loader /> : (
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead style={{ backgroundColor: '#f8f9fa' }}>
                                        <tr>
                                            {['ID', 'CLIENTE', 'HABITACION', 'FECHAS', 'ESTADO'].map(h => (
                                                <th key={h}
                                                    className="fw-bold text-uppercase px-4 py-3"
                                                    style={{ fontSize: '12px',
                                                             color:'#4a4a4a', 
                                                             letterSpacing: '0.05em' }}>
                                                    {h}
                                                    </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody style={{ fontSize:'14px'}}>
                                        {reservas.length === 0 ? (
                                            <tr>
                                                <td colSpan="5"
                                                    className="text-center py-4 text-muted">
                                                    No hay reservas
                                                </td>
                                            </tr>
                                        ) : reservas.map(r => (
                                            <tr key={r.id}>
                                                <td className="px-4 py-3 fw-bold"
                                                    style={{ color:'#003358'}}>
                                                    #{r.id}
                                                </td>
                                                <td className="px-4 py-3">
                                                    Cliente {r.cliente_id}
                                                </td>
                                                <td className="px-4 py-3">
                                                    Hab.  {r.habitacion_id}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {r.fechaEntrada} --- {r.fechaSalida}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <ColorEstado estado ={r.estado} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                         )}
                </div>








                <div className="d-flex flex-column gap-4" style={{ flex: 1}}>

                    <div className="bg-white rounded-3 p-4"
                             style={{boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                                     border: '1px solid rgba(225, 227, 228, 0.5)',
                                     transition: 'transform 0.3s ease'}} >
                    <h3 className="fw-semibold mb-4" style={{ fontSize: '24px', color: '#1a1a1a' }}>
                        Estado de Limpieza
                    </h3>

                    {[
                        {label: 'LIMPIAS' , valor: '82/124', pct:66, color: '#28a745'},
                        {label: 'EN PROCESO' , valor: '15/124', pct:12, color: '#00677e'},
                        {label: 'PENDIENTES' , valor: '27/124', pct:22, color: '#dc3545'}
                    ].map(b=> (
                        <div key={b.label} className="mb-3">
                            <div className="d-flex justify-content-between mb-1">
                                <span className="fw-bold" style={{ fontSize: '12px', letterSpacing:'0.05em'}}>
                                    {b.label}
                                </span>
                                <span className="fw-bold" style={{ fontSize: '12px',color: b.color}}>
                                    {b.valor}
                                </span>
                            </div>
                            <div className="rounded-pill overflow-hidden" style={{ height:'8px', backgroundColor:'#f8f9fa'}}>
                                <div style={{ width: `${b.pct}`, height: '100%', backgroundColor: b.color}}>

                                </div>
                            </div>
                        </div>
                    ))}
                    </div>  



                    <div className="rounded-3 p-4 position-relative overflow-hidden" 
                         style={{ backgroundColor: '#003358', color: 'white'}}>
                        <h3 className="fw-medium mb-4" style={{ fontSize: '18px' }}>
                        Proximas LLegadas
                        </h3>
                        <div className="d-flex flex-column gap-3">
                            {[
                                {hora: '14:00', nombre: 'Elena Rodriguez', hab: 'Suite Real'},
                                {hora: '15:30', nombre: 'Francisco Peña', hab: 'Doble Vista Mar'}

                            ].map((l,i) => (
                                <div key={i}
                                     className="d-flex align-items-center gap-3">
                                    <div className="rounded-circle flex-shrink-0"
                                         style={{width:'8px', height:'8px', backgroundColor: '#5db8fe'}} />
                                            <div>
                                                <p className="fw-bold mb-0" style={{ fontSize:'12px', letterSpacing: '0.05em'}}>
                                                    {l.hora} - {l.nombre}
                                                 </p>
                                                 <p className="mb-0" style={{ fontSize: '11px', opacity: 0.7 }}>
                                                    Check-in {l.hab}
                                                 </p>
                                            </div>
                                         
                                     </div>
                            ))}
                            </div>        
                            <button className="btn w-100 mt-4 fw-semibold"
                                    style={{ backgroundColor: 'white', color: '#003358', borderRadius: '8px', fontSize: '14px'}}>
                                Ver Horarios
                                </button>
                    </div> 
                </div>
            </div>
            






        </div>
    )
}
function SeccionPlaceHolder ({ titulo }) {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center py-5 text-muted">
            <span className="material-symbols-outlined mb-3" style={{fontSize: '48px', opacity: 0.3}}>
                construction
            </span>
            <p className="fw-semibold" style={{ fontSize: '18px' }}>
                {titulo} - proximamente
            </p>
        </div>
    )
}

function AdminPanel(){
    const {usuario, logout} = useAutenticador()
    const navigate = useNavigate()
    const [seccionActiva, setSeccionActiva] = useState('dashboard')
    const[reservas, setReservas] = useState([])
    const [stats,setStats]  = useState({})
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [resReservas, resStats] = await Promise.all([
                    adminService.listarReservas(),
                    adminService.obtenerEstadisticas(
                        new Date().getMonth() + 1,
                        new Date().getFullYear()
                    )
                ])
                setReservas(resReservas)
                setStats(resStats)
            } catch (err) {
                console.log('Error cargando los datos ', err)
            } finally {
                setCargando(false)
            }
        }
        cargarDatos()
    }, [])

    const menuItems = [
        {id:'dashboard', icono: 'dashboard', label: 'Dashboard'},
        {id:'habitaciones', icono: 'bed', label: 'Habitaciones'},
        {id:'reservas', icono: 'calendar_month', label: 'Reservas'},
        {id:'precios', icono: 'payments', label: 'Precios Temporada'},
        {id:'estadisticas', icono: 'analytics', label: 'Estadísticas'},
    ]

    return (
        <div className="d-flex" style={{ height:'100vh', overflow:'hidden' }}>
            <aside className="d-none d-md-flex flex-column"
                   style={{ width: '20%', minWidth: '200px', backgroundColor: '#003358', color: 'white', height: '100vh', padding: '16px' }}>
                <div className="d-flex align-items-center gap-3 mb-4 px-2">
                    <div className="rounded-2 d-flex align-items-center justify-content-center overflow-hidden"
                         style={{ width: '40px', minWidth:'200px', backgroundColor: 'rgba(255,255,255,0.1)'}}>
                            <span className="material-symbols-outlined text-white"
                                  style={{ fontVariationSettings: "'FILL' 1"}}>
                                apartment
                                  </span>
                         </div>
                         <div>
                            <h1 className="fw-semibold mb-0 text-white" style={{ fontSize: '20px', lineHeight: 1 }}>
                                Hotel Admin
                            </h1>
                            <p className="mb-0" style={{ fontSize: '12px', opacity: 0.7}}>
                                Gestion Central
                            </p>
                         </div>
                </div>
                <nav className="d-flex flex-column gap-1 flex-grow-1">
                    {menuItems.map(item => (
                        <button key={item.id}
                                onClick={() => setSeccionActiva(item.id)}
                                className="btn d-flex align-items-center gap-3 p-3 text-start w-100"
                                style={{
                                    backgroundColor: seccionActiva === item.id
                                    ? '#5db8fe' : 'transparent',
                                    color: seccionActiva === item.id
                                    ? '#005c71' : 'rgba(255,255,255,0.7)',
                                    borderRadius: '8px',
                                    fontWeight: seccionActiva === item.id
                                        ? '700' : '400',
                                    fontSize: '18px'
                                }}>
                        <span className="material-symbols-outlined">
                            {item.icono}
                        </span>
                        {item.label}
                    </button>
                    ))}
                </nav>
                <div className="mt-auto pt-3" style={{borderTop: '1px solid rgba(255,255,255,0.1)'}}>
                    <div className="d-flex align-items-center gap-3 p-2">
                        <div className="rounder-cirlce d-flex align-items-center justify-content-center"
                             style={{ width: '32px', height:'32px', backgroundColor: '#00677e'}}>
                                <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'white' }}>
                                    person
                                </span>
                             </div>
                             <div className="overflow-hidden">
                                <p className="fw-bold mb-0 text-white text-truncate"
                                    style={{ fontSize: '12px', letterSpacing: '0.05em' }}>
                                    {usuario?.nombre || 'Admin'}
                                </p>
                                <p className="mb-0 text-truncate" style={{fontSize: '10px', opacity: 0.6 }}>
                                    {usuario?.email}
                                </p>
                             </div>
                    </div>
                </div>
            </aside>

            <main className="d-flex flex-column flex-grow-1 overflow-auto" style={{ backgroundColor: 'f8f9fa' }}>
                <header className="d-flex justify-content-between align-items-center px-4 py-3 bg-white"
                        style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'sticky', top:0, zIndex: 10}}>
                    <div className="position-relative" style={{ maxWidth: '400px', width: '100%' }}>
                        <span className="material-symbols-outlined position-absolute" 
                              style={{ left: '12px', top:'50%', transform: 'translateY(-50%)', color: '#4a4a4a', fontSize: '20px'}}>
                        search
                        
                        </span>
                        <input type="text"
                               className="form-control"
                               placeholder="Busca reservas, clientes..."
                               style={{ paddingLeft: '40px', backgroundColor: '#f8f9fa', border:'none', borderRadius: '8px'}} />
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        {['notificaciones', 'ayuda', 'ajustes'].map(icon => (
                            <button key={icon}
                                    className="btn p-1"
                                    style={{ color: '#4a4a4a'}}>
                                <span className="material-symbols-outlined">
                                    {icon}
                                </span>
                                    </button>
                        ))}
                        <div style={{ width:'1px', height:'32px', backgroundColor: '#c1c7d0'}}></div>
                        <div className="rounded-circle overflow-hidden"
                             style={{ width: '40px', height: '40px', border:'2px solid #d0e4ff', backgroundColor:'#003358'}}>
                            <span className="material-symbols-outlined text-white d-flex align-items-center justify-content-center h-100"
                                  style={{fontVariationSettings: "'FILL' 1"}}>
                                person
                                  </span>
                            </div>
                    </div>
                </header>
                <div className="p-4 flex-grow-1">
                    {seccionActiva == 'dashboard' && (<SeccionDashboard stats={stats} reservas={reservas} cargando={cargando} />)}
                    {seccionActiva == 'habitaciones' && (<SeccionHabitaciones/>)}
                    {seccionActiva == 'reservas' && (<SeccionReservas reservas={reservas} cargando={cargando} />)}
                    {seccionActiva == 'precios' && (<SeccionPrecios />)}
                    {seccionActiva == 'estadisticas' && (<SeccionPlaceHolder titulo="Estadisticas" />)}

                </div>

                <footer className="d-flex justify-content-between align-items-center px-4 py-3 mt-auto"
                        style={{ backgroundColor: '#f8f9fa', borderTop: '1px solid #e1e3e4'}}>
                    <p className="mb-0" style={{ fontSize: '14px', color: '#4a4a4a'}}>
                        2026 Cadenas Hoteleras Management
                    </p>
                    <div className="d-flex gap-4">
                        {['Soporte', 'Privacidad', 'Términos'].map(item => (
                            <span key={item}
                                  style={{ fontSize: '14px', color: '#4a4a4a', cursor: 'pointer' }}>
                                {item}
                                  </span>
                        ))}
                    </div>
                    <span className="fw-bold" style={{ fontSize: '12px', color: '#003358', letterSpacing: '0.05em'}}>
                        PORTAL GESTIÓN 
                    </span>


                        </footer>
            </main>
        </div>
    )
}

function SeccionReservas({ reservas, cargando }){
    const[fechaEntrada, setFechaEntrada] = useState('')
    const [fechaSalida, setFechaSalida] = useState('')
    const [estadoFiltro, setEstadoFiltro] = useState('')
    const [reservasFiltradas, setReservasFiltradas] = useState(reservas)

    useEffect(() => {
        setReservasFiltradas(reservas)
    }, [reservas])

    const aplicarFiltros = async () => {
        try{ 
            if(fechaEntrada && fechaSalida) {
                const data = await adminService.reservasPorFecha(fechaEntrada,fechaSalida)
                setReservasFiltradas(data)
            }else {
                setReservasFiltradas(reservas)
            }
        } catch (err) {
            console.error('Error filtrando reservas: ', err)
        }
    }

    const reservasMostradas = estadoFiltro ? reservasFiltradas.filter(r => r.estado === estadoFiltro) : reservasFiltradas

    return (
        <div className="d-flex flex-column gap-4">
            <div className="d-flex flex-column flex-md-row justify-content-betweem align-items-center gap-3">
                <div>
                    <h1 className="fw-semibold mb-1" style={{fontSize:'32px', color:'#1a1a1a'}}>
                        Gestión de Reservas
                    </h1>
                    <p style={{fontSize:'14px', color:'#4a4a4a'}}>
                        Administra y monitorea todas las reservas del hotel
                    </p>
                </div>
                <div className="d-flex gap-2">
                    <button className="btn d-flex align-items-center gap-2 fw-semibold"
                            style={{ backgroundColor:'#003358', color: 'white', borderRadius:'8px' }}>
                        <span className="material-symbols-outlined">add</span>
                        Nueva Reserva
                    </button>
                    <button className="btn d-flex align-items-center gap-2 fw-semibold"
                            style={{border: '1px solid #003358', color: '#003358', borderRadius:'8px' }}>
                        <span className="material-symbols-outlined">download</span>
                        Exportar
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-3 p-4" style={{border: '1px solid #e1e3e4', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'}}>
                <div className="row g-3 align-items-end">
                    <div className="col-12 col-lg-5">
                        <label className="fw-bold text-uppercase d-block mb-1"
                               style={{ fontSize:'12px', color: '#4a4a4a', letterSpacing: '0.05em'}}>
                            Rango de fecha
                        </label>
                        <div className="d-flex align-items-center gap-2">
                            <div className="position-relative flex-grow-1">
                                <span className="material-symbols-outlined position-absolute"
                                      style={{ left: '10px', top:'50%', transform: 'translateY(-50%)',
                                               fontSize: '18px', color: '#4a4a4a' }}>
                                    calendar_today
                                </span>
                                <input type="date"
                                       className="form-control"
                                       value={fechaEntrada}
                                       onChange={e=> setFechaEntrada(e.target.value)}
                                       style={{ paddingLeft:'36px', border: '1px solid #c1c7d0', borderRadius:'8px'}} />
                            </div>
                            <span style={{color: '#4a4a4a' }}> - </span>
                            <div className="position-relative flex-grow-1">
                                <span className="material-symbols-outlined position-absolute"
                                      style={{ left: '10px', top:'50%', transform: 'translateY(-50%)',
                                               fontSize: '18px', color: '#4a4a4a' }}>
                                    calendar_today
                                </span>
                                <input type="date"
                                       className="form-control"
                                       value={fechaSalida}
                                       onChange={e=> setFechaSalida(e.target.value)}
                                       style={{ paddingLeft:'36px', border: '1px solid #c1c7d0', borderRadius:'8px'}} />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <label className="fw-bold text-uppercase d-block mb-1"
                                style={{fontSize: '12px', color: '#4a4a4a', letterSpacing:'0.05em'}}>
                            Estado
                        </label>
                        <select className="form-select"
                                value={estadoFiltro}
                                onChange={e=> setEstadoFiltro(e.target.value)}
                                style={{ border: '1px solid #c1c7d0', borderRadius: '8px'}}>

                            <option value=""> Todos los estados</option>
                            <option value="CONFIRMADA"> Confirmada</option>
                            <option value="PENDIENTE"> Pendiente</option>
                            <option value="CANCELADA"> Cancelada</option>
                        </select>
                    </div>
                    <div className="col-12 col-lg-3">
                        <button className="btn w-100 fw-semibold"
                                onClick={aplicarFiltros}
                                style={{ backgroundColor: '#00677e', color:'white', borderRadius: '8px'}}>
                            Aplicar Filtros
                        </button>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-3 overflow-hidden"
                 style={{ border: '1px solid #e1e3e4', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>

                {cargando ? <Loader /> : (
                    <>
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead style={{ backgroundColor: '#f3f4f5'}}>
                                <tr>
                                    {['ID', 'Cliente', 'Habitación', 'Fechas', 'Huespedes', 'Estado', 'Precio Total', ''].map(h =>(
                                        <th key={h}
                                            className="px-4 py-3 fw-bold text-uppercase"
                                            style={{ fontSize: '12px',
                                                     color:'#4a4a4a',
                                                     letterSpacing: '0.05em'}}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody style ={{fontSize:'14px'}}>
                                {reservasMostradas.length === 0 ? (
                                    <tr>
                                        <td colSpan="8"
                                            className="text-center py-4 text-muted">
                                            No hay reservas
                                            </td>
                                    </tr>
                                ) : reservasMostradas.map(r => (
                                    <tr key={r.id}>
                                        <td className="px-4 py-3 fw-bold" style={{  fontSize: '12px',
                                                     color:'#4a4a4a',
                                                     letterSpacing: '0.05em'}}>
                                            #{r.id}
                                          </td>
                                          <td className="px-4 py-3">
                                            <div className="d-flex align-items-center gap-2">
                                                <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
                                                     style={{width:'32px', height: '32px', backgroundColor: '#b5ebff', fontSize: '12px', color: '#001f28'}}>
                                                    {r.clienteId}
                                                </div>
                                                <span>Cliente {r.nombre}</span>
                                            </div>
                                          </td>
                                          <td className="px-4 py-3">
                                            <span className="d-block" style={{fontSize: '14px'}}>
                                                {r.fechaEntrada} - {r.fechaSalida}
                                            </span>
                                          </td>
                                          <td className="px-4 py-3 text-center">
                                            <span className="px-2 py-1 rounded-pill" style={{fontSize: '14px', backgroundColor: '#edeeef' }}>
                                                {r.numPersonas} persona/s
                                            </span>
                                          </td>
                                          <td className="px-4 py-3">
                                            <ColorEstado estado={r.estado}/>
                                          </td>
                                          <td className="px-4 py-3 fw-semibold" style={{fontSize: '18px', color: '#003358' }}>
                                            {r.PrecioTotal} €
                                            
                                          </td>
                                          <td className="px-4 py-3 text-end">
                                            <button className="btn p-1" style={{ color: '#4a4a4a' }}>
                                                <span className="material-symbols-outlined">
                                                    more_vert
                                                </span>
                                            </button>
                                          </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex justify-content-betweem align-items-center px-4 py-3"
                         style={{ borderTop: '1px solid #e1e3e4', backgroundColor: '#f8f9fa' }}>
                        <span style={{ fontSize: '14px', color: '#4a4a4a'}}>
                            Mostrando {reservasMostradas.length} reservas
                        </span>
                        <div className="d-flex align-items-center gap-2">
                            <button className="btn p-2" style={{ border:'1px solid #c1c7d0', borderRadius: '8px'}}>
                                <span className="material-symbols-outlined">
                                    chevron_left
                                </span>
                            </button>
                            <button className="btn fw-bold" style={{ width: '40px', height:'40px',
                                                                    backgroundColor:'#003358', color:'white', borderRadius:'8px'}}>

                            </button>
                                <button className="btn p-2" style={{ border:'1px solid #c1c7d0', borderRadius: '8px'}}>
                                <span className="material-symbols-outlined">
                                    chevron_left
                                </span>
                            </button>
                        </div>
                         </div>
                         </>
                )}
            </div>



        </div>
    )
}

function SeccionHabitaciones(){
    const[habitaciones, setHabitaciones] = useState([])
    const [cargando, setCargando] = useState(true)
    const [mostrarForm, setMostrarForm] = useState(false)
    const [habitacionEditando, setHabitacionEditando] = useState(null)



    const[numero, setNumero] = useState('')
    const [tipo, setTipo] = useState('INDIVIDUAL')
    const [capacidad, setCapacidad] = useState(2)
    const [precioNoche, setPrecioNoche] = useState('')
    const[imagenUrl, setImagenUrl] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [error, setError] = useState('')




    useEffect(()=> {
        cargarHabitaciones()
    }, [])
    const cargarHabitaciones = async ()=>{
        try{
            const data= await adminService.listarHabitaciones()
            setHabitaciones(data)

        } catch(err) {
            console.error('Error cargando habitaciones', err)
        } finally {
            setCargando(false)
        }
    }
    const abrirFormNuevo= () => {
        setHabitacionEditando(null)
        setNumero('')
        setTipo('INDIVIDUAL')
        setCapacidad(2)
        setPrecioNoche('')
        setImagenUrl('')
        setDescripcion('')
        setError(null)
        setMostrarForm(true)
    }
    const abrirFormEditar = (hab) => {
        setHabitacionEditando(hab)
        setNumero(hab.numero)
        setTipo(hab.tipo)
        setCapacidad(hab.capacidad)
        setPrecioNoche(hab.precioNoche)
        setImagenUrl(hab.imagenUrl || '')
        setDescripcion(hab.descripcion || '')
        setError(null)
        setMostrarForm(true)
    }

    const guardar = async () => {
        if(!numero || !precioNoche){
            setError('Numero y precio son obligatorios')
            return
        }
        try {
            const datos = {numero, tipo, capacidad, precioNoche, imagenUrl, descripcion, disponible: true }
            if(habitacionEditando) {
                await adminService.actualizarHabitacion(habitacionEditando.id, datos)
            }  else {
                await adminService.crearHabitacion(datos)
            }
            setMostrarForm(false)
            cargarHabitaciones()
        } catch(err) {
            console.error('Error al guardar la habitación')
        }
    }
    const desactivar = async (id) => {
        try {
            await adminService.desactivarHabitacion(id)
            cargarHabitaciones()
        } catch(err) {
            console.error('Error desactivando habitación:', err)
        }
    }
    return (
    <div className="d-flex flex-column gap-4">
        <div className="d-flex justify-content-between align-items-center">
            <h2 className="fw-semibold mb-0" style={{fontSize: '32px', color: '#1a1a1a'}}>
                Gestión de Habitaciones
            </h2>
            <button className="btn d-flex align-items-center gap-2 fw-semibold"
                    onClick={abrirFormNuevo}
                    style={{ backgroundColor: '#003358', color:'white', borderRadius:'8px'}}>
                <span className="material-symbols-outlined">
                    add
                </span>
                Nuev Habitación
                    </button>
        </div>
        <div className="d-flex gap-4 align-items-start">
            <div className="bg-white rounded-3 overflow-hidden flex-grow-1"
                 style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.04)', border: '1px solid rgba(25,22,228,0.5)'}}>
                {cargando ? <Loader /> : (
                    <>
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead style={{ backgroundColor: '#f3f4f5'}}>
                                <tr>
                                    {['Imagen', 'Numero', 'Tipo', 'Capacidad', 'Precio/Noche', 'Estado', 'Acciones']. map(h => (
                                        <th key={h}
                                            className="px-4 py-3 fw-bold text-uppercase"
                                            style={{ fontSize: '12px', color: '#4a4a4a', letterSpacing: '0.05em'}}>
                                        {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody style={{ fontSize: '14px' }}>
                                {habitaciones.length === 0 ? (
                                    <tr>
                                        <td colSpan="7"
                                            className="text-center py-4 text-muted">
                                            No hay Habitaciones
                                        </td>
                                    </tr>
                                ) : habitaciones.map(hab => (
                                    <tr key={hab.id}>
                                        <td className="px-4 py-3">
                                            <div className="rounded-2 overflow-hidden"
                                                 style={{ width:'64px', height: '40px', backgroundColor: '#d9dadb'}}>
                                                {hab.imagenUrl && ( 
                                                    <img src={`http://localhost:8080${hab.imagenUrl.replace('/imagenes', '')}/1.jpg`} alt={hab.numero} className="w-100 h-100 object-fit-cover" />
                                                )}
                                                 </div>
                                        </td>
                                        <td className="px-4 py-3 fw-medium" style={{ fontSize: '18px'}}>
                                            {hab.numero}
                                        </td>
                                        <td className="px-4 py-3">
                                            {hab.tipo}
                                        </td>
                                        <td className="px-4 py-3">
                                            {hab.capacidad} pers.
                                        </td>
                                        <td className="px-4 py-3 fw-semibold" style={{ fontSize: '16px', color:'#003358'}}>
                                            {hab.precioNoche} €
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="px-2 py-1 rounded-pill fw-bold"
                                                  style={{ fontSize:'12px', 
                                                           backgroundColor: hab.disponible
                                                            ? 'rgba(40,167,69,0.1)'
                                                            : 'rgba(74,74,74,0.1)',
                                                          color: hab.disponible
                                                            ? '#28a745' : '#4a4a4a'}}>
                                                {hab.disponible ? 'Activa' : 'Inactiva'}
                                                </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="d-flex gap-1">
                                                <button className="btn p-1"
                                                        onClick={() => abrirFormEditar(hab)}
                                                        style={{ color: '#003358'}}>
                                                    <span className="material-symbols-outlined">
                                                        edit
                                                    </span>
                                                </button>
                                                <button className="btn p-1"
                                                        onClick={() => desactivar(hab.id)}
                                                        style={{ color: hab.disponible ? '#dc3545' : '#28a745'}}>
                                                    <span className="material-symbols-outlined">
                                                        {hab.disponible ? 'visibility_off' : 'visibility'}
                                                    </span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex justify-content-between align-items-center px-4 py-3"
                         style={{ borderTop: '1px solid #e1e3e4', backgroundColor: '#f8f9fa', fontSize:'14px', color: '#4a4a4a' }}>
                        <span>Mostrando {habitaciones.length} habitaciones</span>
                        <div className="d-flex gap-2">
                            <button className="btn p-1" style={{ border: '1px solid #c1c7d0', borderRadius: '6px', 
                                                                 width: '32px', height: '32px' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                                    chevron_left
                                </span>                            
                            </button>
                            <button className="btn fw-bold" style={{ width: '32px', height: '32px',
                                                                     backgroundColor: '#003358', color: 'white', 
                                                                     borderRadius:'6px', padding: 0}}>
                                1
                            </button>
                            <button className="btn p-1"
                                    style={{ border: '1px solid #c1c7d0', borderRadius: '6px', width: '32px', height: '32px' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '18px'}}>
                                    chevron_right
                                </span>
                            </button>
                        </div>
                    </div>
                    </>
                )}
                 </div>







                 {mostrarForm && (
                    <div className="bg-white rounded-3 d-flex flex-column overflow-hidden"
                         style={{ width: '360px', boxShadow: '0 9px 24px rgba(0,0,0,0.08)',
                                  border: '1px solid rgba(193,199,203,0.3)' }}>

                        <div className="d-flex justify-content-between align-items-start"
                             style={{ borderBottom: '1px solid rgba(193,199,208,0.3)' }}>
                                <div>
                                    <h3 className="fw-medium mb-0" style={{ fontSize:'18px', color:'#003358'}}>
                                        Detalles de Habitación
                                    </h3>
                                    <p className="mb-0" style={{fontSize: '12px', color: '#4a4a4a'  }}>
                                        {habitacionEditando ? 'Editar existente' : 'Nueva Habitacion'}
                                    </p>
                                </div>
                                <button className="btn p-1"
                                        onClick={() => setMostrarForm(false)}
                                        style={{ color: '#4a4a4a'}}>
                                    <span className="material-symbols-outlined">close</span>
                                    </button>
                             </div>
                             <div className="p-4 d-flex flex-column gap-3 overflow-auto" style={{ flex: 1}}>

                                {error && (
                                    <div className="alert alert-danger py-2" style={{ fontSize: '14px'}}>
                                         {error}
                                    </div>
                                )}
                                <div className="rounded-2 d-flex align-items-center justify-content-center overflow-hidden"
                                     style={{ width: '100%', height: '160px', backgroundColor:'#f3f4f5', border: '2px dashed #c1c7d0' }}>
                                   {imagenUrl ? (
                                    <img src={imagenUrl} alt="Preview" className="w-100 h-100 object-fit-cover" />
                                   ) : (
                                    <div className="text-center text-muted">
                                        <span className="material-symbols-outlined d-block" style={{ fontSize: '36px'}}>
                                            add_a_photo
                                        </span>
                                        <p style={{ fontSize:'12px' }}>
                                            Añade una URL de imagen
                                        </p>
                                    </div>
                                   )}     
                                </div>
                                <div className="row g-2">
                                    <div className="col-6">
                                        <label className="fw-bold text-uppercase d-block mb-1" style={{ fontSize: '12px', color: '#4a4a4a', letterSpacing: '0.05em'}}>
                                            Numero
                                        </label>
                                        <input type="text"
                                               className="form-control form-control-sm"
                                               placeholder="Ej: 105"
                                               value={numero}
                                               onChange={e=> setNumero(e.target.value)} />
                                    </div>
                                    <div className="col-6">
                                        <label className="fw-bold text-uppercase d-block mb-1"
                                               style={{ fontSize: '12px', color: '#4a4a4a', letterSpacing: '0.05em'}}>
                                            Capacidad
                                        </label>
                                        <select className="form-select form-select-sm"
                                                value={capacidad}
                                                onChange={e=> setCapacidad(e.target.value)}>
                                            {[1,2,3,4].map(n => (
                                                <option key={n} value={n}>
                                                    {n} persona{n > 1 ? 's' : ''}
                                                </option>
                                                ))}
                                                </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="fw-bold text-uppercase d-block mb-1"
                                         style={{ fontSize: '12px', color: '#4a4a4a', letterSpacing: '0.05em'}}>
                                        Tipo de habitacion
                                    </label>
                                    <select className="form-select form-select-sm"
                                            value={tipo}
                                            onChange={e => setTipo(e.target.value)}>
                                        <option value="INDIVIDUAL">Individual</option>
                                        <option value="DOBLE">Doble</option>
                                        <option value="SUITE">Suite</option>
                                        <option value="FAMILIAR">Familiar</option>
                                    </select> 
                                </div>
                                <div>
                                    <label className="fw-bold text-uppercase d-block mb-1"
                                         style={{ fontSize: '12px', color: '#4a4a4a', letterSpacing: '0.05em'}}>
                                        Precio Por Noche
                                    </label>
                                    <div className="position-relative">
                                        <span className="position-absolute" style={{left:'10px', top:'50%', transform: 'translateY(-50%)', color:'#4a4a4a' }}>
                                            €
                                            </span>
                                            <input type="number"
                                                   className="form-control form-control-sm"
                                                   placeholder="0.00"
                                                   value={precioNoche}
                                                   onChange={e=> setPrecioNoche(e.target.value)}
                                                   style={{ paddingLeft: '24px'}} />

                                            </div> 
                                </div>
                                 <div>
                                    <label className="fw-bold text-uppercase d-block mb-1"
                                         style={{ fontSize: '12px', color: '#4a4a4a', letterSpacing: '0.05em'}}>
                                        URL Imagen
                                    </label>
                                    <input type="text"
                                            className="form-control form-control-sm"
                                            placeholder="https://"
                                            value={imagenUrl}
                                            onChange={e=> setImagenUrl(e.target.value)} />
                                    
                                </div>
                                 <div>
                                    <label className="fw-bold text-uppercase d-block mb-1"
                                         style={{ fontSize: '12px', color: '#4a4a4a', letterSpacing: '0.05em'}}>
                                        Descripcion
                                    </label>
                                   <textarea className="form-control form-control-sm"
                                             rows={3}
                                             placeholder="Destalla los servicios y caracteristicas"
                                            value={descripcion}
                                            onChange={e=> setDescripcion(e.target.value)}>
                                             </textarea>
                                    
                                </div>
                        </div>
                        <div className="d-flex gap-2 p-4" style={{ borderTop: '1px solid rgba(193,199,208,0.3)', backgroundColor: '#f3f4f5'}}>
                            <button className="btn flex-grow-1 fw-semibold"
                                    onClick={() => setMostrarForm(false)}
                                    style={{border: '1px solid #c1c7d0', color: '#4a4a4a', borderRadius:'8px'}}>
                                Cancelar
                            </button>
                            <button className="btn flex-grow-1 fw-semibold"
                                    onClick={guardar}
                                    style={{ backgroundColor: '#003358', color: 'white', borderRadius: '8px'}}>
                                Guardar
                            </button>
                        </div>

                    </div>
                 )}
        </div>
    </div>
    
)

}






function SeccionPrecios() {
     const [habitaciones, setHabitaciones] = useState([])
     const [precios, setPrecios] = useState([])
     const[habitacionFiltro, setHabitacionFiltro] = useState('')
    const [cargando, setCargando] = useState(true)


    // variables para el formulario
    const [habitacion_id, setHabitacionID] = useState('')
    const [nombreTemporada, setNombreTemporada] = useState('')
     const [fechaEntrada, setFechaEntrada] = useState('')
    const [fechaSalida, setFechaSalida] = useState('')
    const [precio,setPrecio] = useState('')
    const [guardando, setGuardando] = useState(false)
    const [error, setError] = useState(null)
    const [exito, setExito] = useState(false)



    useEffect(() => {
        cargarDatos()
    }, [])
    useEffect(() => {
        if(habitacionFiltro) {
            cargarPrecios(habitacionFiltro)
        }
    }, [habitacionFiltro])

    const cargarDatos = async () => {
        try {
            const habs = await adminService.listarHabitaciones()
            setHabitaciones(habs)
            if(habs.length > 0){
                setHabitacionFiltro(habs[0].id)
                setHabitacionID(habs[0].id)
                await cargarPrecios(habs[0].id)
            }
        } catch(err) {
            console.error('Error cargando las habitaciones:', err)
        } finally{
            setCargando(false)
        }
    }
    const cargarPrecios = async (habID) => {
        try {
            const precios = await adminService.listarPrecios()
            setPrecios(precios)
        } catch(err) {
            console.error('Error cargando los precios:', err)
        }
    }
    const guardarPrecio = async() => { 
        if(!habitacion_id || !nombreTemporada || !fechaEntrada || !fechaSalida || !precio) {
            setError('Por favor rellena todos los campos')
            return
        }
        setGuardando(true)
        setError(null)
        try {
            await adminService.crearPrecio( habitacion_id,{ nombreTemporada, fechaEntrada, fechaSalida, precio})
            setExito(true)
            setNombreTemporada('')
            setFechaEntrada('')
            setFechaSalida('')
            setPrecio('')
            await cargarPrecios(habitacionFiltro)
            setTimeout(() => setExito(false), 3000)
        } catch(err) {
            setError('Error al guardar el precio')
        } finally{
            setGuardando(false)
        }
    }
    const eliminarPrecio = async (id) => {
        try{
            await adminService.eliminarPrecio(id)
            await cargarPrecios(habitacionFiltro)
        } catch (err) {
            console.error('Error eliminando precio: ', err)
        }
    }

    const preciosMostrados = habitacionFiltro ? precios.filter(p => p.habitacionId === Number(habitacionFiltro)) : precios
    






    return (
        <div className="d-flex flex-column gap-4">
            <div className="d-flex justify-content-between align-items-end">
                <div>
                    <h2 className="fw-semibold mb-1" style={{fontSize:'32px', color: '#003358'}}>
                        Precios de Temporada
                    </h2>
                    <p style={{ fontSize: '14px', color: '#4a4a4a'}}>
                        Define tarifas dinámicas según la demanda. 
                    </p>
                </div>
                <button className="btn d-flex align-items-center gap-2 fw-semibold"
                        onClick={() => document.getElementById('form-precios').scrollIntoView({behavior: 'smooth' })}
                        style={{ backgroundColor: '#004a7c', color: '#87baf3', borderRadius: '8px' }}>
                    <span className="material-symbols-outlined">add</span>
                Nuevo Precio            
                </button>
            </div>
            <div className="bg-white rounded-3 p-4 d-flex align-items-end gap-4 flex-wrap"
                 style={{ border:'1px solid rgba(0,74,124,0.05)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div className="flex-grow-1" style={{minWidth: '240px' }}>
                    <label className="fw-bold text-uppercase d-block mb-1"
                           style={{fontSize: '12px', color: '#4a4a4a', letterSpacing:'0.05em' }}>
                        Filtrar por Habitación
                    </label>
                    <select className="form-select"
                            value={habitacionFiltro}
                            onChange={e=>setHabitacionFiltro(e.target.value)}
                            style={{ border: '1px solid #c1c7d0', borderRadius:'8px' }}>
                        <option value="">Todas las habitaciones</option>
                        {habitaciones.map(h => (
                            <option key={h.id} value={h.id}>
                                {h.tipo} - Hab. {h.numero}
                            </option>
                        ))}
                            </select>
                </div>
                
            </div>
            {/* Botones para pdf y exportar ponerlo aqui */}
            <div className="bg-white rounded-3 overflow-hidden"
                 style={{ border:'1px solid rgba(0,74,124,0.05)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'}}>


                {cargando ? <Loader /> : (
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead style={{ backgroundColor: '#f3f4f5' }}>
                                <tr>
                                    {['Habitacion', 'Temporada', 'Rango de Fechas', 'Precio/Noche', 'Acciones'].map(h => (
                                        <th key={h}
                                            className="px-4 py-3 fw-bold text-uppercase"
                                            style={{ fontSize:'12px', color:'#4a4a4a', letterSpacing: '0.05em' }}>
                                        {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody style={{ fontSize: '14px'}}>
                                {preciosMostrados.length === 0 ? (
                                    <tr>
                                        <td colSpan="5"
                                            className="text-center py-4 text-muted">
                                        No hay precios de temporada configurados
                                            </td>
                                    </tr>
                                ) : preciosMostrados.map(p => (
                                    <tr key={p.id}>
                                        <td className="px-4 py-3">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="rounded-2 d-flex align-items-center justify-content-center"
                                                     style={{width:'40px', height:'40px', backgroundColor: 'rgba(208,228,255,0.2)'}}>
                                                    <span className="material-symbols-outlined" style={{color:'#003358' }}>king_bed </span>
                                                </div>
                                                <div>
                                                    <p className="fw-bold mb-0" style={{ fontSize: '14px', color:'#1a1a1a' }}>
                                                        Habitacion {p.habitacionId}
                                                    </p>
                                                    </div>    
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                           <span className="px-2 py-1 rounded fw-bold" style={{ fontSize:'12px', backgroundColor:'#5db8fe', color: '#005c71'}}>
                                            {p.nombreTemporada?.toUpperCase()}
                                           </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="fw-medium mb-0" style={{fontSize:'14px'}}>
                                            {p.fechaInicio}
                                            </p>
                                            <p className="mb-0" style={{fontSize:'12px', color:'#4a4a4a'}}>
                                            {p.fechaFin}
                                            </p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <button className="btn p-1 rounded-circle"
                                                    onClick={()=> eliminarPrecio(p.id)}
                                                    style={{color: '#dc3545'}}>
                                                <span className="material-symbols-outlined">
                                                    delete
                                                </span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <div id="form-precios" className="bg-white rounded-3 p-4"
                 style={{border:'1px solid rgba(0,74,124,0.05)',
                         borderLeft: '4px solid #003358',
                         boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
                <h3 className="fw-semibold mb-4 d-flex align-items-center gap-2"
                    style={{ fontSize:'24px', color:'#003358'}}>
                        <span className="material-symbols-outlined">add_circle</span>
                        Configurar Nuevo precio de Temporada
                    </h3>


                    {error && (
                        <div className="alert alert-danger mb-3" style={{fontSize:'14px' }}>
                            {error}
                        </div>
                    )}
                    {exito && (
                        <div className="alert alert-success mb-3"
                             style={{ fontSize:'14px' }}>
                        Precio guardado correctamente
                     </div>
                    )}

                    <div className="row g-3">
                        <div className="col-12 col-md-6">
                            <label className="fw-bold text-uppercase d-block mb-1"
                                    style={{ fontSize: '12px', color:'#4a4a4a', letterSpacing: '0.05em'}}>
                                Seleccionar Habitacion
                            </label>
                            <select className="form-select"
                                    value={habitacion_id}
                                    onChange={e=>setHabitacionID(e.target.value)}
                                    style={{ border: '1px solid #c1c7d0', borderRadius:'8px', padding:'12px' }}>
                                <option value=""> Elegir Habitación...</option>
                                {habitaciones.map(h => (
                                    <option key={h.id} value={h.id}>
                                        {h.tipo} - Hab. {h.numero}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-12 col-md-6">
                            <label className="fw-bold text-uppercase d-block mb-1"
                                    style={{ fontSize: '12px', color:'#4a4a4a', letterSpacing: '0.05em'}}>
                                Nombre de la Temporada
                            </label>
                            <input type="text"
                                   className="form-control"
                                   placeholder="Ej: Semana Santa, Verano..."
                                   value={nombreTemporada}
                                   onChange={e => setNombreTemporada(e.target.value)}
                                   style={{ border:'1px solid #c1c7d0', borderRadius:'8px', padding: '12px'}} />
                        </div>
                        <div className="col-12 col-md-3">
                            <label className="fw-bold text-uppercase d-block mb-1"
                                    style={{ fontSize: '12px', color:'#4a4a4a', letterSpacing: '0.05em'}}>
                                Fecha Inicio
                            </label>
                            <input type="date"
                                   className="form-control"
                                   value={fechaEntrada}
                                   onChange={e => setFechaEntrada(e.target.value)}
                                   style={{ border:'1px solid #c1c7d0', borderRadius:'8px', padding: '12px'}} />
                        </div>
                        <div className="col-12 col-md-3">
                            <label className="fw-bold text-uppercase d-block mb-1"
                                    style={{ fontSize: '12px', color:'#4a4a4a', letterSpacing: '0.05em'}}>
                                Fecha Fin
                            </label>
                            <input type="date"
                                   className="form-control"
                                   value={fechaSalida}
                                   onChange={e => setFechaSalida(e.target.value)}
                                   style={{ border:'1px solid #c1c7d0', borderRadius:'8px', padding: '12px'}} />
                        </div>
                         <div className="col-12 col-md-3">
                            <label className="fw-bold text-uppercase d-block mb-1"
                                    style={{ fontSize: '12px', color:'#4a4a4a', letterSpacing: '0.05em'}}>
                                Precio por Noche (€)
                            </label>
                            <div className="position-relative">
                                <span className="position-absolute" style={{left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#4a4a4a'}}>
                                    €
                                </span>
                                <input type="number"
                                       className="form-control"
                                       placeholder="0.00"
                                       value={precio}
                                       onChange={e => setPrecio(e.target.value) }
                                       style={{ paddingLeft:'28px', border: '1px solid #c1c7d0', borderRadius:'8px', padding:'12px 12px 12px 28px' }} />
                            </div>
                        </div>       
                        <div className="col-12 col-md-3 d-flex align-items-end">
                            <button className="btn w-100 d-flex align-items-center justify-content-center gap-2 fw-semibold"
                                    onClick={guardarPrecio}
                                    disabled={guardando}
                                    style={{ backgroundColor: '#003358', color:'white', borderRadius:'8px', padding: '12px', fontSize: '16px' }}>
                                <span className="material-symbols-outlined">save</span>

                                {guardando ? 'Guardando... ': 'Guardar Precio'}
                             </button>
                        </div>
                    </div>

            </div>
        </div>
    )
}
export default AdminPanel