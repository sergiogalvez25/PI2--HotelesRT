


import { Link, useNavigate } from "react-router-dom"
import { useAutenticador } from "../context/AutenticadorContext"
import autenticadorService from '../services/autenticadorService'
import imgRegistro from '../assets/imagenes-estaticas/img-registro.png'




// <>

import { useState } from "react"


function Registro() {


    const navigate = useNavigate()
    const { login } = useAutenticador()

    const [email, setEmail] = useState('')
    const [ password, setPassword] = useState('')
    const [verPassword, setVerPassword] = useState(false)
    const [error, setError] = useState(null)
    const [cargando, setCargando] = useState(false)
    const[nombre, setNombre] = useState('')
    const[apellidos, setApellidos] = useState('')
    const[telefono, setTelefono] = useState('')
    const[direccion, setDireccion] = useState('')

    







    const registro = async() => {
        if(!nombre || !email || !password) {
            setError('Por favor rellena todos los campos')
            return
        }
        setCargando(true)
        setError(null)
        try {
            const data = await autenticadorService.registro({nombre,apellidos,email,password,telefono,direccion})
            login(data)
            navigate('/')
        } catch(err) {
            setError('Email o contraseña incorrectos', err)
        } finally {
            setCargando(false)
        }
    }



    return (
        <div className="d-flex" style={{ minHeight: '100vh' }}>
            <div className="d-none d-md-flex position-relative"
                 style={{ width:'50%', overflow: 'hidden'}}>
                <img src={imgRegistro} alt="Hotel de Lujo" className="w-100 object-fit-cover" style={{ height:'650px'}} />
                <div className="position-absolute bottom-0 start-0 w-100"
                     style={{ background: 'linear-gradient(to top, rgba(0,29,53,0.8) 0%, rgba(0,29,53,0.2) 60%, transparent 100%',
                              height: '100%' }}/>
                <div className="position-absolute bottom-0 start-0 p-5"
                     style={{ zIndex:10 }}>
                <h1 className="text-white fw-bold mb-3"
                style={{fontSize: 'clamp(32px, 4vw, 48px)',
                        letterSpacing: '-0.02em',
                        lineHeight: '1.15' }}>
                Crea tu cuenta
                </h1>
                <p className="mb-4"
                    style={{ color: 'rgba(255,255,255,0.9)', 
                             fontSize: '18px'}}>
                    Unete a la red de hoteles mas exclusiva y empieza a planear tu proxima escapada.
                </p>
                </div>
            </div>



            {/* lado izquierdo*/}
            {/* lado derecho*/}


            <div className="d-flex flex-column  w-100 overflow-auto"
                 style={{ flex:'1', backgroundColor:'#ffffff'}}>
                <div className="d-flex justify-content-between align-items-center p-4">
                    <div className="d-flex align-items-center gap-2">
                        <div className="d-flex align-items-center justify-content-center rounded-2"
                             style={{ width: '40px', height:'40px', backgroundColor: '#003358'}}>
                            <span className="material-symbols-outlined text-white"
                                  style={{ fontVariationSettings: "'FILL' 1"}}>
                                apartamento
                            </span>
                        </div>
                        <span className="fw-semibold" style={{ fontSize:'32px', color: '#003358'}}>
                            HotelesRT
                        </span>
                    </div>
                    <Link to="/login"
                          className="d-md-none fw-semibold text-decoration-none"
                          style={{ color: '#003358', fontSize: '16px'}}>
                        Iniciar Sesión
                    </Link>
                </div>



                <div className="d-flex align-items-center justify-content-center flex-grow-1 p-4">
                    <div className="bg-white rounded-3 p-4 p-md-5 w-100"
                         style={{ maxWidth: '448px',
                                  border: '1px solid rgba(193,199,208,0.3)',
                                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)'}}>
                        <div className="mb-4">
                             <h2 className="fw-semibold mb-1"
                                 style={{ fontSize: '24px', color: '#1a1a1a' }}>
                                Comencemos
                            </h2>
                            <p style={{ fontSize: '14px', color:'#4a4a4a' }}>
                                Ingresa tus datos para registrarte en la plataforma.
                            </p>
                        </div>
                        {error && (
                            <div className="alert alert-danger mb-3">
                                {error}
                            </div>
                        )}
                        {/* Nombre */}
                        <div className="mb-3">
                            <label className="fw-bold text-uppercase d-block mb-1"
                                   style={{ fontSize:'12px', color: '#4a4a4a', letterSpacing: '0.05em'}}>
                                Nombre <span style={{ color: '#dc3545'}}>* </span>
                            </label>
                            <div className="position-relative">
                                <span className="material-symbols-outlined position-absolute"
                                      style={{ left: '14px', top: '50%', transform: 'translateY(-50%)',
                                               color:'#727780', fontSize: '20px' }}>
                                    person
                                </span>
                                <input type="text"
                                       className="form-control py-3"
                                       placeholder="Juan"
                                       value={nombre}
                                       onChange={e => setNombre(e.target.value)}
                                       style={{ paddingLeft: '44px',
                                                border: '1px solid #c1c7d0',
                                                borderRadius: '8px' }} />
                            </div>
                        </div>
                        {/* apellidos */}
                        <div className="mb-3">
                            <label className="fw-bold text-uppercase d-block mb-1"
                                   style={{ fontSize:'12px', color: '#4a4a4a', letterSpacing: '0.05em'}}>
                                Apellidos
                            </label>
                            <div className="position-relative">
                                <span className="material-symbols-outlined position-absolute"
                                      style={{ left: '14px', top: '50%', transform: 'translateY(-50%)',
                                               color:'#727780', fontSize: '20px' }}>
                                   person
                                </span>
                                <input type="text"
                                       className="form-control py-3"
                                       placeholder="Garcia Garcia"
                                       value={apellidos}
                                       onChange={e => setApellidos(e.target.value)}
                                       style={{ paddingLeft: '44px',
                                                border: '1px solid #c1c7d0',
                                                borderRadius: '8px' }} />
                            </div>
                        </div>
                        {/* email */}
                        <div className="mb-3">
                            <label className="fw-bold text-uppercase d-block mb-1"
                                   style={{ fontSize:'12px', color: '#4a4a4a', letterSpacing: '0.05em'}}>
                                Correo Electrónico <span style={{ color: '#dc3545'}}>* </span>
                            </label>
                            <div className="position-relative">
                                <span className="material-symbols-outlined position-absolute"
                                      style={{ left: '14px', top: '50%', transform: 'translateY(-50%)',
                                               color:'#727780', fontSize: '20px' }}>
                                    Email
                                </span>
                                <input type="email"
                                       className="form-control py-3"
                                       placeholder="nombre@ejemplo.com"
                                       value={email}
                                       onChange={e => setEmail(e.target.value)}
                                       style={{ paddingLeft: '44px',
                                                border: '1px solid #c1c7d0',
                                                borderRadius: '8px' }} />
                            </div>
                        </div>
                        {/* Contraseña */}
                        <div className="mb-3">
                            <div className="d-flex justify-content-between mb-1">
                            <label className="fw-bold text-uppercase"
                                   style={{ fontSize:'12px', color: '#4a4a4a', letterSpacing: '0.05em'}}>
                                Contraseña
                            </label>
                            </div>
                            <div className="position-relative">
                                <span className="material-symbols-outlined position-absolute"
                                      style={{ left: '14px', top: '50%', transform: 'translateY(-50%)',
                                               color:'#727780', fontSize: '20px' }}>
                                    lock
                                </span>
                                <input type={verPassword ? 'text' : 'password'}
                                       className="form-control py-3"
                                       placeholder="********"
                                       value={password}
                                       onChange={e => setPassword(e.target.value)}
                                       style={{ paddingLeft: '44px',
                                                border: '1px solid #c1c7d0',
                                                borderRadius: '8px' }} />
                                <span className="material-symbols-outlined position-absolute"
                                      onClick={() => setVerPassword(!verPassword)}
                                      style={{ right: '14px', top: '50%', transform:'translateY(-50%)',
                                               color:'#727780', fontSize: '20px', cursor: 'pointer'}}>
                                    {verPassword ? 'visibility_off' :'visibility'}
                                </span>
                            </div>
                        </div>
                        
                        {/* Telefono */}
                        <div className="mb-3">
                            <label className="fw-bold text-uppercase d-block mb-1"
                                   style={{ fontSize:'12px', color: '#4a4a4a', letterSpacing: '0.05em'}}>
                               Telefono {' '} <span style={{ color: '#727780', transform: 'none', fontWeight: 'normal'}}>(opcional) </span>
                            </label>
                            <div className="position-relative">
                                <span className="material-symbols-outlined position-absolute"
                                      style={{ left: '14px', top: '50%', transform: 'translateY(-50%)',
                                               color:'#727780', fontSize: '20px' }}>
                                    phone
                                </span>
                                <input type="tel"
                                       className="form-control py-3"
                                       placeholder="642 783 090"
                                       value={telefono}
                                       onChange={e => setTelefono(e.target.value)}
                                       style={{ paddingLeft: '44px',
                                                border: '1px solid #c1c7d0',
                                                borderRadius: '8px' }} />
                            </div>
                        </div>
                        {/* Direccion */}
                        <div className="mb-3">
                            <label className="fw-bold text-uppercase d-block mb-1"
                                   style={{ fontSize:'12px', color: '#4a4a4a', letterSpacing: '0.05em'}}>
                               Direccion {' '} <span style={{ color: '#727780', transform: 'none', fontWeight: 'normal'}}>(opcional) </span>
                            </label>
                            <div className="position-relative">
                                <span className="material-symbols-outlined position-absolute"
                                      style={{ left: '14px', top: '50%', transform: 'translateY(-50%)',
                                               color:'#727780', fontSize: '20px' }}>
                                    home
                                </span>
                                <input type="text"
                                       className="form-control py-3"
                                       placeholder="Calle, numero, puerta"
                                       value={direccion}
                                       onChange={e => setDireccion(e.target.value)}
                                       style={{ paddingLeft: '44px',
                                                border: '1px solid #c1c7d0',
                                                borderRadius: '8px' }} />
                            </div>
                        </div>

                         <button className="btn w-100 py-3 fw-semibold mb-4"
                                 onClick={registro}
                                 disabled={cargando}
                                 style={{backgroundColor:'#003358', color: 'white', borderRadius: '8px',
                                         fontSize: '16px' }}>
                            {cargando ? 'Registrando ' : 'Registrarse'}
                        </button>                   
                        <p className="text-center mb-0" style={{ fontSize: '14px', color: '#4a4a4a' }}>
                            ¿Ya tienes cuenta?{' '}
                            <Link to="/login"
                                  className="fw-semibold text-decoration-none"
                                  style={{color: '#00677e'}}>
                                Inicia Sesión
                            </Link>
                        </p> 
                    </div>
                </div> 
                <div className="d-fex flex-column flex-md-row justify-content-between align-items-center p-4 gap-3"
                     style={{ borderTop: '1px solid rgba(193,199,208,0.2)' }}>
                    <p className="mb-0" style={{fontSize: '14px', color: '#727780'}}>
                        2026 . Hoteles RT. Todos los derechos reservados.
                    </p>
                    <div className="d-flex gap-4">
                        {['Privacidad', 'Términos', 'Contacto'].map(item => (
                            <span key={item} style={{fontSize:'14px', color: '#727780', cursor:'pointer'}}>
                                {item}
                            </span>
                        ))}
                    </div>
                </div> 
            </div>
        </div>
        
    )

}
export default Registro