import { useNavigate } from 'react-router-dom'

function TarjetaReserva({ habitacion }) {


    const navigate = useNavigate()

    const handleClick= () => {
        navigate('/reservar', {
            state: { habitacion_id: habitacion.habitacion_id}
        })
    }

    return (
        <div className="card border-0 rounded-3 overflow-hidden d-flex flex-column"
             style={{
                boxShadow: ' 0 12px 12px rgba(0,0,0,0.04)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
             }}
             onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 16px 24px rgba(0,0,0,0.08)'
             }}
             onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 12px 12px rgba(0,0,0,0.04)'
             
             }}>


            <div style={{ height: '256px', overflow: 'hidden'}}>
                <img src={habitacion.imagenUrl}
                     alt={habitacion.nombre}
                     className="w-100 h-100 object-fit-cover"
                     style={{ transition: 'transform 0.7s ease'}}
                     onMouseEnter={e => e.target.style.transform = 'scale(1.1)'}
                     onMouseLeace={e => e.target.style.transform = 'scale(1)'} />
            <div className="card-body p-4 d-flex flex-column flex-grow-1">

                <div className="d-flex align-items-center gap-1 mb-2"
                     style={{ color: '#00677e'}}>

                    <span className="material-symbols-outlined"
                          style={{ fontSize: '14px' }}>
                        location_on    
                    </span>
                    <span className="fw-bold text-uppercase"
                          style={{ fontSize: '12px', letterSpacing: '0.05em'}}>
                            {habitacion.ciudad}
                          </span>
                     </div>



                     <h4 className="fw-medium mb-1"
                         style={{ fontSize: '18px', color: '#1a1a1a' }}>
                        {habitacion.nombre}
                    </h4>
                    <p className="text-muted mb-4"
                       style={{ fontSize: '14px' }}>
                        {habitacion.fechas}
                    </p>
                    <div className="mt-auto d-flex justify-content-between align-items-end">
                        <div>
                            <span className="text-decoration-line-through text-muted d-block"
                                  style={{ fontSize: '12px' }} >
                                {habitacion.precioOriginal}€
                            </span>
                            <span className="fw-semibold"
                                  style={{ fontSize: '24px', color: '#003358' }}>
                                {habitacion.precioOferta}€
                                <span className="fw-normal"
                                      style={{ fontSize: '14px' }}>
                                    /noche
                                </span>
                            </span>
                        </div>
                        <button className="btn p-2 rounded-3"
                                onClick={handleClick}
                                style={{ backgroundColor: '#003358', color: 'white' }}>
                            <span className="material-symbols-outlined">
                                chevron_right
                            </span>
                        </button>
                    </div>
            </div>

            </div> 
        </div>
    )
}
export default TarjetaReserva