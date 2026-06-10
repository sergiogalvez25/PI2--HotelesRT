import { useNavigate } from 'react-router-dom'
import { useAutenticador} from '../../context/AutenticadorContext'


function TarjetaHotel({ hotel }) {
    const navigate = useNavigate()
    const {estaAutenticado} = useAutenticador()

    const handleClick = () => {
        if(estaAutenticado) {
            navigate('/reservar', { state: { hotel_id: hotel.hotel_id} })
        } else {
            navigate('/login')
        }
    }

    return (


        <div className="card border-0 rounded-3 overflow-hidden cursor-pointer"
             onClick={handleClick}
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
                <img src={`http://localhost:8080${hotel.imagenUrl.replace('/imagenes', '')}`}
                     alt={hotel.nombre}
                     className="w-100 h-100 object-fit-cover"
                     style={{ transition: 'transform 0.5s ease'}}
                     onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                     onMouseLeave={e => e.target.style.transform = 'scale(1)'} /> 
             </div>
             <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-bold text-uppercase"
                          style={{ color: '#00677e', fontSize: '12px', letterSpacing: '0.5em'}}>
                        {hotel.ciudad}    
                    </span>
                    <div className="d-flex align-items-center"
                         style={{  color: '#00677e' }}>
                        <span className="material-symbols-outlined"
                              style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1"}}>
                            star
                        </span>
                        <span className="fw-bold ms-1"
                              style={{ fontSize: '12px' }}>
                            {hotel.estrellas}.0
                        </span>
                     </div>
                </div>
                <h4 className="fw-semibold mb-1"
                    style={{ fontSize: '24px', color: '#1a1a1a '}}>
                    {hotel.nombre}
                </h4>
                <p className="text-muted mb-0"
                   style={{ fontSice: '14px' }}>
                   {hotel.descripcion}
                </p>
             </div>
        </div>

    )
}
export default TarjetaHotel
