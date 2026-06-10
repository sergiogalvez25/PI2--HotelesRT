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



    // ofertas que luego se cargarán del backend 

    const ofertas = []

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
        {ofertas.map(oferta =>(
            <div key={oferta.id} className="col-12 col-lg-4"> 
                <TarjetaReserva habitacion={oferta}/>
            </div>
        ))}
    </div>
   </div>
</section>
<section className="py-5 px-4 px-md-5"
         style={{ backgroundColor: '#003358' }}>
    <div className="mx-auto text-center"
         style={{ maxWidth:'896px' }}>
        <h3 className="text-white fw-semibold mb-3"
            style={{ fontSize: '32px' }}>
            Suscribete para ofertas exclusivas
        </h3>
        <p className="text-white mb-5"
            style={{ opacity: 0.8, fontSize: '16px' }}>
            Recibe las ultimas noticias y nuestros descuentos especiales directamente en tu bandeja de entrada
        </p>
        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <input type="email"
                   placeholder="Tu correo electronico"
                   className="form-control px-4 py-3"
                   style={{ maxWidth:'400px',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color:'white',
                            borderRadius:'8px' }} />
            <button className="btn px-5 py-3 fw-semibold"
                    style={{ backgroundColor: '#00677e',
                             color: 'white',
                             borderRadius:'8px' }}>
                Suscribirme
            </button>
        </div>   
    </div>
</section>
        </div>
    )

}
export default Inicio
