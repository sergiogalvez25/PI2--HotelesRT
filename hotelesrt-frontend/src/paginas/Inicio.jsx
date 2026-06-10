import { useEffect, useState } from "react"
import Loader from "../componentes/comunes/Loader"
import { useNavigate } from "react-router-dom"
import imgSlide1 from '../assets/imagenes-estaticas/img-slide1.png'
import imgSlide2 from '../assets/imagenes-estaticas/img-slide2.png'
import imgSlide3 from '../assets/imagenes-estaticas/img-slide3.png'
import hotelService from '../services/hotelService'
import TarjetaHotel from '../componentes/hotel/TarjetaHotel'
import TarjetaReserva from '../componentes/reserva/TarjetaReserva'
// <>



const colorGradeado = { 
    background: 'linear-gradient(to right, rgba(0,51,88,0.9) 0%, rgba(0,51,88,0.6) 40%, rgba(0,51,88,0) 100%) '

}
const sombraTarjeta = {
    boxShadow: '0 12px 12px rgba(0,0,0,0.04)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
}

const imagenesSlide = [
    imgSlide1,
    imgSlide2,
    imgSlide3
]

function Inicio() {
    const navigate = useNavigate()
    const [hoteles, setHoteles] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)
    const [slideActual, setSlideActual] = useState(0)
    const [ofertas, setOfertas] = useState([])
    const [emailNL, setEmailNL] = useState(false)
    const [suscrito, setSuscrito] = useState(false)

    useEffect(() => {
        const cargarHoteles = async () => {
            try {
                const data = await hotelService.listarHoteles()
                setHoteles(data)
            } catch(err) {
                setError('No se han cargado los hoteles')
            } finally {
                setCargando(false)
            }
        }
        cargarHoteles()
    }, [])

    useEffect(() => {
        const intervalo = setInterval (() => {
            setSlideActual(prev =>(prev +1)% imagenesSlide.length)
        }, 5000)
        return () => clearInterval(intervalo)
    }, [])

    useEffect(() => {
        const cargarOfertas = async () => {
            try {
                const data = await hotelService.obtenerOfertas()
                setOfertas(data)
            } catch (err) {
                console.error('Error cargando ofertas: ', err)
            }
        }
        cargarOfertas()
    }, [])

    const suscribirse = () => {
        if(!emailNL || !emailNL.includes('@')) return
        setSuscrito(true)
        setEmailNL('')
        setTimeout(() => setSuscrito(fallse), 4000)
    }
    

    return (
        <div style={{ backgroundColor: '#f8f9fa' }}>

        <section className="position-relative overflow-hidden mx-4 mx-md-5 rounded-3"
                 style={{ height: '700px'}}>

            <img src={imagenesSlide[slideActual]} alt="Hotel de lujo"
                 className="w-100 h-100 object-fit-cover"
                 style={{ transition: 'opacity 0.5s ease'}} />

            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
                 style={colorGradeado}>

                <div className="container-fluid px-4 px-md-5">
                    <div style={{ maxWidth: '672px' }}>
                        <h2 className="text-white fw-bold mb-4"
                            style={{ fontSize: 'clamp(32px, 5vw, 48px)',
                                     letterSpacing: '-0.02em' }}>
                            Encuentra tu refugio ideal
                        </h2>
                        <p className="text-white mb-5"
                            style={{ opacity: 0.9, fontSize:'16px', lineHeight: '1.6'}}>
                            Explora una coleccion curada de hoteles de lujo diseñados para ofrecerte una estancia inolvidable
                            con el maximo confort y elegancia.
                        </p>
                        <button className="btn px-5 pt-3 pb-3 fw-semibold"
                                onClick={() => navigate('/reservar')}
                                style={{ backgroundColor: '#00677e',
                                         color: 'white',
                                         fontSize: '16px',
                                         borderRadius: '8px' }}>
                            Reservar Ahora
                        </button>
                    </div>
                </div>
            </div>
            <div className="position-absolute d-flex gap-2"
                 style={{ bottom: '48px', left: '50%',
                          transform: 'translateX(-50%)' }}>
                {imagenesSlide.map((_,index) => (
                    <span key={index}
                          onClick={() => setSlideActual(index)}
                          style={{
                            width: '48px', height:'4px',
                            borderRadius: '9999px',
                            cursor: 'pointer',
                            backgroundColor: index === slideActual
                                ? 'white'
                                : 'rgba(255,255,255,0.3)',
                            transition:'background-color 0.3s'
                          }}></span>
                ))}            
            </div>    
        </section>
        <section className="py-5 px-4 px-md-5">
        <div className="mx-auto" style={{ maxWidth:'1280px'}}>
            
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 gap-3">

            <div>
                <span className="fw-bold text-uppercase"
                     style={{ fontSize: '22px', color: '#00677e', letterSpacing: '0.05em' }}>
                    Nuestra Colección
                </span> 
                <h3 className="fw-semibold mt-1 mb-0"
                    style={{ fontSize:'32px', color: '#1a1a1a' }}>
                    Descubre nuestros hoteles
                </h3>
            </div>
            <span className="fw-semibold"
                  onClick={() => navigate('/reservar')}
                  style={{ color: '#003358', cursor: 'pointer', fontSize:'16px'}}>
                Ver todos los destinos
            </span>
            </div>
        

       {cargando ? (
           <Loader />
       ) : error ? (
            <div className="alert alert-danger"> {error}</div>
       ) : (
            <div className="row g-4">
                {hoteles.map(hotel => (
                    <div key={hotel.id}
                         className="col-12 col-sm-6 col-lg-3">
                        <TarjetaHotel hotel={hotel}/>
                    </div>
                ))}
            </div>
       )}         
    </div>
</section>            
<section className="py-5 px-4 px-md-5"
         style={{ backgroundColor: '#f3f4f5' }}>
    <div className="mx-auto" style={{ maxWidth: '1280px' }}>
       <div className="mb-5">
            <span className="fw-bold text-uppercase"
                  style={{ color: '#00677e', fontSize:'12px', letterSpacing: '0.05em' }}>
                Oportunidades
            </span>
            <h3 className="fw-semibold mt-1 mb-1"
                style={{ fontSize:'32px', color: '#1a1a1a' }}>
                Ultimas Ofertas
            </h3>
            <p style={{ color: '#42474f', fontSize: '16px' }}> 
                Precios exclusivos para estancias este mes.
            </p>
       </div>
    <div className="row g-4">
        {ofertas.length === 0 ? (
            <div className="col-12 text-center text-muted py-4">
                <p>No hay ofertas disponibles en este momento</p>
            </div>
        ) : ofertas.map((oferta, i) => {
            const ciudades= { 1: 'Madrid', 2: 'Bilbao', 3: 'Sevilla' }
            const descuento = Math.round((1 - oferta.precio / oferta.precioBase) * 100)
            return (
                <div key={i} className="col-12 col-md-6 col-lg-4">
                    <div className="bg-white rounded-3 overflow-hidden"
                         style={{ boxhadow: '0 4px 12px rgba(0,0,0,0.08)',
                                  border: '1px solid rgba(193,199,208,0.3)',
                                  transition: 'transform 0.3s ease' }}
                         onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                         onMouseLeave={e => e.currentTarget.style.transform = 'tranlateY(0)'}>

                    <div className="position-relative overflow-hidden" style={{ height: '180px'}}>
                        <img src={`http://localhost:8080${oferta.imagenUrl?.replace('/imagenes','')}/1.jpg`} alt={oferta.tipo}
                             className="w-100 h-100 objecti-fit-cover" />
                        {descuento > 0 && (
                            <span className="position-absolute top-0 end-0 m-2 px-2 py-1 rounded fw-bold"
                                  style={{ backgroundColor: '#dc3545', color: 'white', fontSize: '12px'}}>
                                -{descuento}%
                            </span>
                        )}
                    </div>
                    <div className="p-3">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                                <span className="fw-bold text-uppercase" style={{color: '#00677e', fontSize: '11px', letterSpacing: '0.05em'}}>
                                    {ciudades[oferta.hotelId]} - {oferta.tipo}
                                </span>
                                <p className="fw-semibold mb-0" style={{ color: '#1a1a1a', fontSize: '16px'}}>
                                    {oferta.nombreTemporada}
                                </p>
                            </div>
                        </div>
                        <p className="mb-2" style={{color: '#727780', fontSize: '12px'}}>
                            {oferta.fechaInicio} hasta {oferta.fechaFin}
                        </p>
                        <div className="d-flex align-items-baseline gap-2">
                            <span className="fw-bold" style={{ color: '#003358', fontSize: '24px'}}>
                                {oferta.precio} €
                            </span>
                            {descuento > 0 && (
                                <span style={{ fontSize: '14px', color: '#727780', textDecoration: 'line-through' }}>
                                    {oferta.precioBase} €
                                </span>
                            ) }
                            <span style={{ fontSize:'12px', color: '#727780'}}> /noche</span>
                        </div>
                        <button className="btn w-100 mt-3 fw-semibold"
                                onClick={() => navigate('/reservar')}
                                style={{ backgroundColor: '#003358', color: 'white', borderRadius: '8px', fontSize: '14px'}}>
                            Reservar Ahora
                        </button>
                    </div>
                         </div>
                </div>
            )
        })}
    </div>
   </div>
</section>
<section className="py-5 px-4 px-md-5"
         style={{ backgroundColor: '#003358' }}>
    <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
    {suscrito ? (
        <div className="d-flex align-items-center gap-2 px-4 py-3 rounded-3" 
             style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white' }}>
            <span className="material-symbols-outlined" style={{ color: '#5db8fe'}}>
                check_circle
            </span>
            <span className="fw-semibold">¡Correo guardado correctamente!</span>
        </div>
    ) : (
        <>
            <input type="email"
                    placeholder="Tu correo electrónico"
                    className="form-control px-4 py-3"
                    value={emailNL}
                    onChange={e => setEmailNL(e.target.value)}
                    style={{ maxWidth: '400px', backgroundColor: 'rgba(255,255,255,0.1)',
                             border: '1px solid rgba(255,255,255,0.1)',
                             color: 'white',
                             borderRadius: '8px' }} />
            <button className="btn px-5 py-3 fw-semibold"
                    onClick={suscribirse}
                    style={{ backgroundColor: '#00677e', color: 'white', borderRadius: '8px' }}>
                Suscribirme
            </button>
        </>
    )}
    </div>
</section>
        </div>
    )

}
export default Inicio
