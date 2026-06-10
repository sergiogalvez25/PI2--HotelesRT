
import hotelService from "../services/hotelService"
import reservaService from "../services/reservaService"
import Loader from "../componentes/comunes/Loader"

// <>
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { use, useEffect, useState } from "react"
import { useAutenticador } from "../context/AutenticadorContext"
import ConfirmarHabitacion from "./ConfirmarHabitacion"

function Reservar() {

    const navigate = useNavigate()
    const location = useLocation()
    const { estaAutenticado, usuario } = useAutenticador()



    const [mostrarModal, setMostrarModal] = useState(false)
    // formulario de busqueda
    const [hoteles, setHoteles] = useState([])
    const [hotelSeleccionado, setHotelSeleccionado] = useState('')
    const [fechaEntrada, setFechaEntrada] = useState('')
    const [fechaSalida, setFechaSalida] = useState('')
    const [numPersonas, setnumPersonas] = useState(2)

    // resultados
    const [habitaciones, setHabitaciones] = useState([])
    const [buscando, setBuscando] = useState(false)
    const [buscado, setBuscado] = useState(false)

    //resumen reserva 
    const [habitacionElegida, setHabitacionElegida] = useState(null)
    const [precioTotal, setPrecioTotal] = useState(0)
    const [confirmando, setConfirmando] = useState(false)
    const [error, setError] = useState(null)
    const [exito, setExito] = useState(false)
    const [filtroTipo, setFiltroTipo] = useState(null)
    // carga hoteles al montar

    useEffect(() => {
        const cargarHoteles = async () => {
            try {
                const data = await hotelService.listarHoteles()
                setHoteles(data)
                if(data.length > 0) setHotelSeleccionado(data[0].id)
            } catch (err) {
                console.error('Error cargando hoteles:', err)
            }
        }
        cargarHoteles()
    }, [])


    useEffect(() => {
        if(location.state?.hotel_id) {
            setHotelSeleccionado(location.state.hotel_id)
        }
    }, [location.state])




    const buscarDisponibilidad = async () => {
        if(!hotelSeleccionado || !fechaEntrada || !fechaSalida){
            setError('Por favor rellena todos los campos')
            return
        }
        if(fechaEntrada >= fechaSalida) {
            setError('La fecha de salida debe ser posterior a la de entrada')
            return
        }
        setError(null)
        setBuscando(true)
        try{
            const data = await hotelService.obtenerDisponibilidad(hotelSeleccionado, fechaEntrada, fechaSalida, numPersonas)
            setHabitaciones(data)
            setBuscado(true)
            setHabitacionElegida(null)
        } catch (err) {
            console.error('Error completo:', err)
            setError('Error buscando disponibilidad' + err.message)
        } finally {
            setBuscando(false)
        }
    }



    // funcion para la tabla
    const habitacionesAgrupadas = () => {
        const tipos =['DOBLE', 'DOBLEM', 'FAMILIAR','SUITE']
        const filtradas = filtroTipo ? habitaciones.filter(h => h.tipo === filtroTipo) : habitaciones

        return tipos.filter(tipo => filtradas.some(h => h.tipo === tipo))
                    .map(tipo => {
                        const delTipo = filtradas.filter(h => h.tipo === tipo)
                        const masBarata = delTipo.reduce((min, h) => h.precioNoche < min.precioNoche ? h : min, delTipo[0])
                        return { tipo, cantidad: delTipo.length, habitacion: masBarata }
                    })
    }

    // seleccionar habitacion
    const seleccionarHabitacion = async (habitacion) => {
        setHabitacionElegida(habitacion)
        setMostrarModal(true)
        try {
            const precio = await hotelService.calcularPrecio(hotelSeleccionado, habitacion.id, fechaEntrada, fechaSalida)
            setPrecioTotal(precio)
        } catch (err) {
            setPrecioTotal(habitacion.precioNoche)
        }
    }
    // confirmar reserva 
    const confirmarReserva = async () => {
        if(!estaAutenticado) {
            navigate('/login')
            return
        }
        setConfirmando(true)
        setError(null)
        try{
            await reservaService.crearReserva({
                hotel_id: hotelSeleccionado,
                habitacion_id: habitacionElegida.id,
                fecha_entrada: fechaEntrada,
                fecha_salida: fechaSalida,
                numPersonas
            })
            setExito(true)
            setTimeout(() => navigate('/mi-perfil'), 2000)
        } catch(err) {
            setError(err.response?.data?.message || 'Error al cargar la reserva')
        } finally {
            setConfirmando(false)
        }
    }
    const noches= fechaEntrada && fechaSalida 
        ? Math.max(0, Math.ceil(
            (new Date(fechaSalida) - new Date(fechaEntrada)) 
            / (1000 * 60 * 60 * 24)
          )) 
        : 0

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight:'100vh' }}>
            <main className="py-5 px-3 px-md-5 mx-auto"
                  style={{ maxWidth: '1280px' }}>
                <div className="d-flex gap-4 flex-column flex-md-row">
                    <div style={{ flex:'0 0 70%' }}>
                        <h2 className="fw-semibold mb-4"
                            style= {{ fontSize: '32px', color: '#1a1a1a'}}>
                            ¡Haz tu reserva ahora!
                         </h2>

                         <div className="bg-white rounded-3 p-4 mb-4"
                              style={{ border: '1px solid rgba(193,199,208,0.3)',
                                       boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>

                            {error && (
                                <div className="alert alert-danger mb-3">
                                    {error}
                                </div>
                            )}
                            {exito && (
                                <div className="alert alert-success mb-3">
                                    ¡Reserva creada correctamente! Redirigiendo...
                                </div>
                            )}
                            <div className="row g-3 align-items-end">
                                <div className="col-12 col-md-4">
                                    <label  className="fw-bold text-uppercase mb-1 d-block"
                                            style={{ fontSize: '12px', color: '#42474f', letterSpacing: '0.05em' }}> 
                                        Hotel
                                    </label>
                                            <select className="form-select py-3"
                                                    value={hotelSeleccionado}
                                                    onChange={e=> setHotelSeleccionado(e.target.value)}
                                                    style={{ backgroundColor:'#f3f4f5', border: '1px solid #727780',
                                                             borderRadius: '8px'  }}>
                                                {hoteles.map(hotel => (
                                                    <option key={hotel.id}
                                                            value={hotel.id}>
                                                        {hotel.nombre}
                                                    </option>
                                                ))}
                                            </select>
                                </div>
                                <div className="col-12 col-md-3">
                                    <label  className="fw-bold text-uppercase mb-1 d-block"
                                            style={{ fontSize: '12px', color: '#42474f', letterSpacing: '0.05em' }}> 
                                        Entrada
                                    </label>
                                    <input type="date"
                                            className="form-control py-3"
                                            value={fechaEntrada}
                                            onChange={e => setFechaEntrada(e.target.value)}
                                            style={{ backgroundColor: '#f3f4f5', border: '1px solid #727780', borderRadius: '8px'}} />
                                </div>
                                <div className="col-12 col-md-3">
                                    <label  className="fw-bold text-uppercase mb-1 d-block"
                                            style={{ fontSize: '12px', color: '#42474f', letterSpacing: '0.05em' }}> 
                                        Salida
                                    </label>
                                    <input type="date"
                                            className="form-control py-3"
                                            value={fechaSalida}
                                            onChange={e => setFechaSalida(e.target.value)}
                                            style={{ backgroundColor: '#f3f4f5', border: '1px solid #727780', borderRadius: '8px'}} />
                                </div>
                                <div className="col-12 col-md-3">
                                    <label  className="fw-bold text-uppercase mb-1 d-block"
                                            style={{ fontSize: '12px', color: '#42474f', letterSpacing: '0.05em' }}> 
                                        Huespedes
                                    </label>
                                    <input type="number"
                                            className="form-control py-3"
                                            value={numPersonas}
                                            onChange={e => setnumPersonas(e.target.value)}
                                            style={{ backgroundColor: '#f3f4f5', border: '1px solid #727780', borderRadius: '8px'}} />
                                </div>  
                                <div className="col-12 mt-2">
                                    <button className="btn w-100 py-3 fw-semibold"
                                            onClick={buscarDisponibilidad}
                                            disabled={buscando}
                                            style={{ backgroundColor:'#003358', color: 'white', 
                                                     borderRadius: '8px', fontSize:'16px' }}>
                                        {buscando ? 'Buscando...' : 'Buscar disponibilidad'}
                                    </button>
                                </div>             
                            </div>
                        </div>

                       {buscado && !buscando && (
                        <section>
                            <div className="d-flex justify-content-between align-items-center pb-3 mb-4"
                                style={{ borderBottom: '1px solid #c1c7d0'}}>
                                <h3 className="fw-semibold mb-0" style={{ fontSize: '24px', color: '#1a1a1a'}}> Habitaciones disponibles </h3>
                                <span style ={{ color: '#42474f', fontSize: '14px' }}>
                                    {habitaciones.length} opciones encontradas
                                </span>
                            </div>
                            {habitaciones.length === 0 ? (
                                <div className="text-center py-5 text-muted">
                                    <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>
                                        bed
                                    </span>
                                    <p className="mt-3">
                                        No hay habitaciones disponibles para las fechas seleccionadas
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="d-flex gap-2 mb-4 flex-wrap">
                                        {['DOBLE', 'DOBLEM', 'FAMILIAR', 'SUITE'].map(tipo => {
                                            const count = habitaciones.filter(h => h.tipo === tipo).length
                                            if(count === 0) return null
                                            const labels = {DOBLE: 'Doble Twin', DOBLEM: 'Doble', FAMILIAR: 'Familiar', SUITE: 'suite'}

                                            return (
                                                <button key={tipo}
                                                        onClick={() => setFiltroTipo(filtroTipo === tipo ? null : tipo)}
                                                        className="btn fw-semibold d-flex align-items-center gap-2"
                                                        style={{
                                                            backgroundColor: filtroTipo === tipo ? '#003358' : 'white',
                                                            color: filtroTipo === tipo ? 'white' : '#003358', 
                                                            border: '1px solid #003358',
                                                            borderRadius: '8px',
                                                            fontSize: '14px'
                                                        }}>
                                                {labels[tipo]}
                                                <span className="px-2 py-0 rounded-pill fw-bold"
                                                style={{ fontSize: '11px', backgroundColor: filtroTipo === tipo ? 'rgba(255,255,255,0.2)' : '#e8f0fe',
                                                         color: filtroTipo === tipo ? 'white' : '#003358'
                                                        }}>
                                                    {count}
                                                 </span>
                                                    
                                                </button>
                                            )
                                        })}
                                        {filtroTipo && (
                                            <button onClick={() => setFiltroTipo(null)}
                                                    className="btn fw-semibold"
                                                    style={{ color: '#727780', fontSize: '14px'}}>
                                                Ver todos
                                            </button>
                                        )}
                                    </div>
                                    <div className="d-flex flex-column gap-3">
                                        {habitacionesAgrupadas().map(({ tipo, cantidad, habitacion:hab}) => (
                                            <div key={tipo}
                                                 className="d-flex bg-white rounded-3 overflow-hidden" 
                                                 style={{
                                                    border: habitacionElegida?.id === hab.id
                                                    ? '2px solid #003358' : '1px solid rgba(193,199,208,0.2)',
                                                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                                                transition: 'box-shadow 0.3s'
                                                 }}>
                                                <div className="overflow-hidden flex-shrink-0" style={{ width:'288px', height: '192px' }}>
                                                    <img src={`http://localhost:8080${hab.imagenUrl.replace('/imagenes', '')}/1.jpg`}
                                                         alt={hab.tipo}
                                                         className="w-100 h-100 object-fit-cover" />
                                                </div>
                                                 <div className="p-4 d-flex flex-column justify-content-between flex-grow-1">
                                                    <div>
                                                        <div className="d-flex align-items-center gap-2 mb-1">
                                                            <h4 className="fw-semibold mb-0" style={{ fontSize: '24px', color: '#1a1a1a'}}>
                                                                Habitación {tipo === 'DOBLE' ? 'Doble Twin' : tipo === 'DOBLEM' ? 'Doble' : tipo === 'FAMILIAR' ? 'Familiar' : 'Suite'}

                                                            </h4>
                                                            { tipo === 'SUITE' && (
                                                                <span className="fw-bold d-flex align-items-center gap-1" style={{ color: '#23a745', fontSize: '12px' }}>
                                                                    <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1"}}>
                                                                        check_circle
                                                                    </span>
                                                                    RECOMENDADO
                                                                </span>
                                                            )}
                                                        </div>
                                                        <span className="px-2 py-1 rounded-pill fw-bold mb-2 d-inline-block"
                                                              style={{ fontSize: '12px', backgroundColor: '#e8f4fd', color: '#003358' }}>
                                                            {cantidad} habitaciones disponibles
                                                        </span>
                                                        <p style={{ color: '#42474f', fontSize: '14px', marginTop: '8px'}}>
                                                            Capacidad: {hab.capacidad} personas
                                                        </p>
                                                        <p style={{ color: '#42474f', fontSize: '14px'}}>
                                                            {hab.descripcion}
                                                        </p>
                                                    </div>
                                                    <div className="d-flex justify-content-between align-items-end mt-3">
                                                        <div>
                                                            <span className="fw-bold text-uppercase d-block" style={{ fontSize: '10px', color: '#42474f', letterSpacing: '0.05em' }}>
                                                                Precio desde
                                                            </span>
                                                            <span className="fw-bold" style={{ fontSize: '24px', color: '#003358' }}>
                                                                {hab.precioNoche} €
                                                            </span>
                                                            <span style={{ fontSize: '12px', color: '#42474f' }}> /noche</span>
                                                        </div>
                                                        <button className="btn px-4 py-2 fw-semibold"
                                                                onClick={() => seleccionarHabitacion(hab)}
                                                                style={{ backgroundColor: '#00677e', color: 'white', borderRadius: '8px', fontSize: '16px' }}>
                                                            Seleccionar
                                                        </button>
                                                    </div>
                                                 </div>
                                                 </div>

                                        ))}
                                        </div>    
                                
                                
                                </>
                            )}




                        </section>
                       )}                         





                    </div>

                    <aside style= {{flex: '0 0 28%' }}>
                        <div className="rounded-3 overflow-hidden"
                             style={{ position: 'sticky', top: '96px',
                                      border: '1px solid #c1c7d0', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
                            <div className="p-4"
                                 style={{ backgroundColor: '#004a7c', color: '#87baf3'}}>
                                <h3 className="fw-semibold mb-0" style={{ fontSize: '24px' }}>
                                    Resumen de la Reserva
                                </h3>
                            </div>
                            <div className="p-4 bg-white flex-grow-1">
                                {!habitacionElegida ? (
                                    <div className="text-center py-5 text-muted">
                                        <span className="material-symbols-outlined" style={{ fontSize: '48px', opacity: 0.2 }}>
                                            bed
                                        </span>
                                        <p className="mt-3 fst-italic"
                                            style={{fontSize: '14px' }}>
                                                Selecciona una habitacion para ver los detalles de tu estancia
                                        </p>
                                    </div>
                                ) : (
                                    <div className="d-flex flex-column gap-4">
                                        <div className="pb-3"
                                             style={{ borderBottom: '1px solid rgba(193,199,208,0.3)'}}>
                                            <span className="fw-bold text-uppercase d-block mb-1"
                                                  style={{ fontSize: '10px', color: '#42474f', letterSpacing: '0.05em' }}>
                                                Habitacion
                                            </span>
                                            <p className="fw-medium mb-0" 
                                                style={{ fontSize: '18px', color: '#1a1a1a' }}>
                                                Hab. {habitacionElegida.numero}
                                            </p>
                                            <p style={{ fontSize: '14px', color: '#42474f' }}>
                                                {habitacionElegida.tipo}
                                            </p>
                                        </div>



                                        <div className="row pb-3"
                                             style={{ borderBottom: '1px solid rgba(193,199,208,0.3)'}}>
                                            <div className="col-6">
                                                <span className="fw-bold text-uppercase d-block mb-1"
                                                      style={{ fontSize: '10px', color: '#42474f', letterSpacing: '0.05em' }}>
                                                    Fechas
                                                </span>
                                                <p style={{ fontSize: '14px', color: '#1a1a1a' }}>
                                                    {fechaEntrada} hasta {fechaSalida}
                                                </p>
                                            </div>
                                            <div className="col-6">
                                                <span className="fw-bold text-uppercase d-block mb-1"
                                                      style={{ fontSize: '10px', color: '#42474f', letterSpacing: '0.05em'}}>
                                                Huespedes
                                                </span>
                                                <p style={{ fontSize: '14px', color:'#1a1a1a' }}>
                                                    {numPersonas} persona/s
                                                </p>
                                            </div>
                                             </div>

                                             <div className="d-flex flex-column gap-2">
                                                <div className="d-flex justify-content-between"
                                                     style={{ fontSize: '14px',
                                                              color: '#42474f' }}>
                                                    <span>Subtotal ({noches} noches)</span>
                                                    <span>{precioTotal}€</span>
                                                </div>
                                                <div className="d-flex justify-content-between pt-2 fw-bold"
                                                     style={{ fontSize: '18px', color: '#003358', borderTop: '1px solid #c1c7d0' }}>
                                                    <span>Total Estimado</span>
                                                    <span>{precioTotal}</span>
                                                </div>
                                             </div>
                                    </div>
                                )}
                            </div>
                            <div className="p-4" style={{ backgroundColor: '#f3f4f5'}}>
                            <button className="btn w-100 py-3 fw-semibold"
                                    onClick={confirmarReserva}
                                    disabled={!habitacionElegida || confirmando}
                                    style={{
                                        backgroundColor: habitacionElegida
                                            ? '#003358' : '#003358',
                                        color: 'white',
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        opacity: habitacionElegida ? 1 : 0.5,
                                        cursor: habitacionElegida ? 'pointer' : 'not-allowed' }}>

                                        {confirmando ? 'Confirmando...' : 'Confirmar reserva'}
                            </button>
                            <p className="text-center mt-2" style={{fontSize: '11px', color: '#42474f'}}>
                                Al confirmar, aceptas nuestras politicas de cancelacion y terminos de servicio
                            </p>


                            </div>
                        </div>
                    </aside>
                </div>
                  </main>


                  {mostrarModal &&habitacionElegida &&  (
                    <ConfirmarHabitacion
                        habitacion={habitacionElegida}
                        hotelId={hotelSeleccionado}
                        onConfirmar={() => setMostrarModal(false)}
                        onCerrar={() => {
                            setMostrarModal(false)
                            setHabitacionElegida(null)
                        }}
                    
                    
                    />
                  )}
        </div>
    )


} 
export default Reservar