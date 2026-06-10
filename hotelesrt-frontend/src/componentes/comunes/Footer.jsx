



// <>

import { useState } from "react";

function Footer() {
    const [modal, setModal] = useState(null)

    const info = {
        Contacto: 'Para contactar con nosotros escribe a info@hotelesrt.com o llamanos al 652 948 389',
        Soporte: 'Nuestro equipo de soporte esta disponible de lunes a viernes de 9:00h a 18:00h',
        FAQ: '¿Tienes dudas? Consulta nuestras preguntas frecuentes o contacta con nosotros directamente'
    }


    return (
        <>
        <footer className="py-4 px-5 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3"
                style={{ backgroundColor:'#e1e3e4', borderTop: '1px solid #c1c7d0' }}>
            <div className="d-flex align-items-center gap-2">
                <span className="fw-bold" style={{ color: '#003358', fontSize: '16px' }}>
                    HotelesRT
                </span>
                <span style={{ fontSize:'14px', color: '#4a4a4a' }}>
                    2026 Hoteles RT. Todos los derechos reservados 
                </span>
            </div>
            <div className="d-flex gap-4">
                {Object.keys(info).map(item => (
                    <span key={item}
                          onClick={() => setModal(item)}
                          className="fw-medium"
                          style={{ fontSize: '14px', color: '#4a4a4a', cursor: 'pointer' }}
                          onMouseEnter={e=>e.target.style.color= '#003358'}
                          onMouseLeave={e=>e.target.style.color= '#4a4a4a'}>
                        {item}
                    </span>
                ))}
            </div>
        </footer>
        {modal && (
            <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                 onClick={() => setModal(null)}
                 style={{ zIndex: 2000, backgroundColor: 'rgba(0,0,0,0.04)' }}>
                <div className="bg-white rounded-3 p-4"
                     onClick={e => e.stopPropagation()}
                     style={{ maxWidth: '400px', width: '90%', boxShadow: '0 8px 24px rgba(0,0,0,0.15)'}}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="fw-semibold mb-0" style={{ color: '#003358' }}>
                            {modal}
                        </h5>
                        <button className="btn p-1"
                                onClick={() => setModal(null) }
                                sttyle={{ color: '#4a4a4a'}}>
                            <span className="material-symbols-outlined">
                                close
                            </span>
                        </button>
                    </div>
                    <p style={{ fontSize: '14px', color: '#4a4a4a' }}>
                        {info[modal]}
                    </p>

                </div>
            </div>
        )}
        
        
        
        
        
        </>
    )
}
export default Footer