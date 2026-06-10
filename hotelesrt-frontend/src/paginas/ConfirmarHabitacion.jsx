

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAutenticador } from "../context/AutenticadorContext"
// <>

function ConfirmarHabitacion({ habitacion, hotelId, onConfirmar, onCerrar }) {



    const [slideActual, setSlideActual] = useState(0)

    const imagenes = [1, 2, 3, 4, 5].map(n => `http://localhost:8080${habitacion?.imagenUrl.replace('/imagenes', '')}/${n}.jpg`   )

    const moverSlide = (index) => {
        setSlideActual(index)
    }
    const moverRelativo = (direccion) => {
        let siguiente = slideActual + direccion
        if(siguiente < 0) siguiente = imagenes.length -1
        if(siguiente >= imagenes.length) siguiente = 0
        setSlideActual(siguiente)
    }
    if(!habitacion) return null



    return (



        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center
             justify-content-center p-3"
             onClick={onCerrar}
             style={{zIndex: 1000,
                     backdropFilter: 'blur(8px)',
                     backgroundColor: 'rgba(25,28,29,0.4)' }}>

                <div className="bg-white rounded-3 overflow-hidden d-flex
                     flex-column flex-md-row w-100"
                     onClick={e =>e.stopPropagation()}
                     style={{ maxWidth: '896px', maxHeight: '90vh', boxShadow: '0 25px 50px rgba(0,0,0,0.25)'}}>

                <button className="btn position-absolute rounded-circle p-2"
                        onClick={onCerrar} style={{ top:'16px', right: '16px', zIndex: 1010,
                              backgroundColor: 'rgba(255,255,255,0.2)',
                              color: 'white',
                              border: 'none' }}>

                    <span className="material-symbols-outlined">
                        close
                    </span>
                </button>
                <div className="position-relative overflow-hidden"
                     style={{ width: '100%', maxWidth: '50%', minHeight: '300px'}}>

                    <div className="d-flex h-100"
                    style={{ transform: `translateX(-${slideActual * 100}%)`,
                             transition: 'transform 0.5s ease'}}>
                    {imagenes.map((img, index) => (
                        <img key={index} src={img} alt={`Habitacion ${index + 1}`}
                             className="object-fit-cover flex-shrink-0"
                             style={{ width: '100%', height: '100%', minWidth: '100%'}} />
                    ))}
                    </div>
                    {/* pUNTOS DE NAVEGACION */}
                    <div className="position-absolute d-flex gap-2"
                         style={{ bottom: '16px', left:'50%', transform: 'translateX(-50%)' }}>
                        {imagenes.map((_, index) => (
                            <button key={index}
                                    onClick={() => moverSlide(index)}
                                    className="rounded-circle border-0 p-0"
                                    style={{ width: '8px', height: '8px',
                                             backgroundColor: 'white',
                                             opacity: index === slideActual ? 1 : 0.4,
                                             cursor: 'pointer' }}/>
                        ))}   
                            
                    </div>  
                    {/* Flechas de slide */} 
                    <button className="btn position-absolute rounded-circle p-1"
                            onClick={() => moverRelativo(-1)}
                            style={{ left:'8px', top: '50%', transform: 'translateY(-50%)',
                                     backgroundColor: 'rgba(0,0,0,0.3)', color: 'white', border: 'none' }}>
                        <span className="material-symbols-outlined">
                            chevron_left
                        </span>
                    </button>
                    <button className="btn position-absolute rounded-circle p-1"
                            onClick={() => moverRelativo(1)}
                            style={{ right:'8px', top: '50%', transform: 'translateY(-50%)',
                                     backgroundColor: 'rgba(0,0,0,0.3)', color: 'white', border: 'none' }}>
                        <span className="material-symbols-outlined">
                            chevron_right
                        </span>
                    </button>





                     </div>


                    {/* parte derecha  */}
                    <div className="p-4 d-flex flex-column overflow-auto" style={{ flex: 1 }}>
                        <div className="mb-2">
                            <span className="fw-bold text-uppercase px-2 py-1 rounded"
                                  style={{ fontSize: '12px', color: '#005c71',
                                    backgroundColor: '#b5ebff', letterSpacing: '0.05em'}}>
                                Habitación {habitacion.tipo}
                            </span>
                        </div>
                        <h3 className="fw-semibold mb-1"
                            style={{ fontSize:'24px', color:'#003358' }}>
                        Hotel {hotelId}
                        </h3>
                        <h2 className="fw-bold mb-4" style={{ fontSize: '32px', color: '#1a1a1a' }}>
                            Habitacion {habitacion.numero}
                        </h2>
                        <div className="row g-3 mb-4">
                            <div className="col-6 d-flex align-items-center gap-2">
                                <span className="material-symbols-outlined" style={{ color: '#00677e'}}>
                                    bed
                                </span>
                            <div>
                            <span className="fw-bold text-uppercase d-block" style={{ fontSize: '12px', 
                                                                                      color: '#4a4a4a', letterSpacing: '0.05em'}}>
                                Tipo
                            </span>
                            <span style={{ fontSize:'16px' }}>
                                {habitacion.tipo}
                            </span>
                            </div>
                        </div>
                        <div className="col-6 d-flex align-items-center gap-2">
                                <span className="material-symbols-outlined" style={{ color: '#00677e'}}>
                                    groups
                                </span>
                            <div>
                            <span className="fw-bold text-uppercase d-block" style={{ fontSize: '12px', 
                                                                                      color: '#4a4a4a', letterSpacing: '0.05em'}}>
                                Capacidad
                            </span>
                            <span style={{ fontSize:'16px' }}>
                                {habitacion.capacidad} personas
                            </span>
                            </div>
                        </div>
                    </div>
                    <p style={{ color: '#4a4a4a', fontSize: '16px', lineHeight: '1.6'}}>
                        {habitacion.descripcion}
                    </p>
                    <div className="mt-auto pt-4" style={{ borderTop: '1px solid #c1c7d0' }}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <span className="fw-bold text-uppercase d-block"
                                      style={{ fontSize: '12px', color: '#4a4a4a', letterSpacing: '0.05em' }}>
                                    Precio por noche
                                </span>
                                <div className="d-flex align-items-baseline gap-1">
                                    <span className="fw-bold" style={{fontSize:'32px', color: '#003358'}}>
                                        {habitacion.precioNoche} €
                                    </span>
                                </div>
                            </div>
                            <div className="d-flex align-items-center gap-1"
                                 style={{ color: '#28a745' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1"}}>
                                    check_circle
                                </span>
                                <span className="fw-bold" style={{ fontSize: '12px', letterSpacing: '0.05em'}}>
                                    Disponibilidad inmediata
                                </span>
                            </div>
                        </div>

                        <button className="btn w-100 py-3 fw-semibold d-flex align-items-center justify-content-center gap-2"
                                onClick={onConfirmar}
                                style={{ backgroundColor: '#003358',
                                         color:'white',
                                         borderRadius: '8px',
                                         fontSize:'16px'}}>
                            Confirmar Reserva
                            <span className="material-symbols-outlined">
                                arrow_forward
                            </span>
                        </button>
                    </div>    
                </div>     
                    
                </div>    
                        
            </div>
       
    )

}
export default ConfirmarHabitacion