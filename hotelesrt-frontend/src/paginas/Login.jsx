

import { Link, useNavigate } from "react-router-dom"
import { useAutenticador } from "../context/AutenticadorContext"
import autenticadorService from '../services/autenticadorService'
// <>

import { useState } from "react"
import imgLogin from '../assets/imagenes-estaticas/img-login.png'

function Login() {


    const navigate = useNavigate()
    const { login } = useAutenticador()

    const [email, setEmail] = useState('')
    const [ password, setPassword] = useState('')
    const [verPassword, setVerPassword] = useState(false)
    const [error, setError] = useState(null)
    const [cargando, setCargando] = useState(false)






    const logearUsuario = async() => {
        if(!email || !password) {
            setError('Por favor rellena todos los campos')
            return
        }
        setCargando(true)
        setError(null)
        try {
            const data = await autenticadorService.login(email, password)
            login(data)
            navigate('/')
        } catch(err) {
            setError('Email o contraseña incorrectos')
        } finally {
            setCargando(false)
        }
    }



    return (
        <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
            <div className="d-none d-lg-flex position-relative"
                 style={{ width:'50%', overflow: 'hidden'}}>
                <img src={imgLogin} alt="Hotel de Lujo" className="w-100 h-100 object-fit-cover" />
                <div className="position-absolute bottom-0 start-0 w-100"
                     style={{ background: 'linear-gradient(to top, rgba(0,29,53,0.8) 0%, rgba(0,29,53,0.2) 60%, transparent 100%',
                              height: '100%' }}/>
                <div className="position-absolute bottom-0 start-0 p-5 w-100"
                     style={{ zIndex:10 }}>
                <span className="px-3 py-1 rounded-pill fw-bold text-uppercase mb-4 d-inline-block"
                      style={{ backgroundColor: '#5db8fe',
                                color: '#005c71',
                                fontSize: '12px',
                                letterSpacing: '0.05em'}}>
                    Experiencia Hoteles RT
                </span>
                <h1 className="text-white fw-bold mb-3"
                style={{fontSize: 'clamp(32px, 4vw, 48px)',
                        letterSpacing: '-0.02em',
                        lineHeight: '1.15' }}>
                Tu proximo destino comienza con un clic.
                </h1>
                <p className="mb-4"
                    style={{ color: 'rgba(255,255,255,0.9)', 
                             fontSize: '18px'}}>
                    Unete a nuestra comunidad exclusiva y accede a tarifas preferenciales en los mejores hoteles.
                </p>
                <div className="d-flex align-items-center gap-3">
                    <div className="d-flex">
                        {[1,2,3].map(i => (
                            <div key={i}
                                 className="rounded-circle overflow-hidden"
                                 style={{ width:'40px', height: '40px', border: '2px solid white',
                                          marginLeft:i > 1 ? '-12px' : '0', backgroundColor: '#d9dadb'}}>

                            </div>
                        ))}
                    </div>
                    <p className="text-white mb-0" style={{ fontSize: '14px'}}>
                        <span className="fw-bold">+10k viajeros</span> ya están reservando.
                    </p>
                </div>
                 </div>
            </div>
            <div className="d-flex flex-column overflow-auto"
                 style={{ width:'100%', flex:'1', backgroundColor:'#f8f9fa'}}>
                <div className="d-flex justify-content-between align-items-center p-4">
                    <div className="d-flex align-items-center gap-2">
                        <div className="d-flex align-items-center justify-content-center rounder-2"
                             style={{ width: '40px', height:'40px', backgroundColor: '#003358'}}>
                            <span className="material-symbols-outlined text-white"
                                  style={{ fontVariationSettings: "'FILL' 1"}}>
                                hotel
                            </span>
                        </div>
                        <span className="fw-semibold" style={{ fontSize:'32px', color: '#003358'}}>
                            HotelesRT
                        </span>
                    </div>
                    <Link to="/registro"
                          className="d-lg-none fw-semibold"
                          style={{ color: '#003358', fontSize: '16px'}}>
                        Registrarse
                    </Link>
                </div>
                <div className="d-flex align-items-center justify-content-center flex-grow-1 p-4">
                    <div className="bg-white rounded-3 p-4 p-md-5 w-100"
                         style={{ maxWidth: '448px',
                                  border: '1px solid rgba(193,199,208,0.3)',
                                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)'}}>
                        <div className="mb-4 text-center text-lg-start">
                             <h2 className="fw-semibold"
                                 style={{ fontSize: '32px', color: '#003358' }}>
                                Bienvenido de nuevo
                            </h2>
                            <p style={{ fontSize: '14px', color:'#4a4a4a' }}>
                                Ingresa tus credenciales para acceder a tu cuenta.
                            </p>
                        </div>
                        {error && (
                            <div className="alert alert-danger mb-3">
                                {error}
                            </div>
                        )}
                        <div className="mb-3">
                            <label className="fw-bold text-uppercase d-block mb-1"
                                   style={{ fontSize:'12px', color: '#4a4a4a', letterSpacing: '0.05em'}}>
                                Correo Electrónico
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
                            <span style={{ fontSize: '12px', color:'#00677e', cursor: 'pointer'}}>
                                ¿Olvidaste tu contraseña?
                            </span>
                            </div>
                            <div className="position-relative">
                                <span className="material-symbols-outlined position-absolute"
                                      style={{ left: '14px', top: '50%', transform: 'translateY(-50%)',
                                               color:'#727780', fontSize: '20px' }}>
                                    lock
                                </span>
                                {/* type={verPassword ? 'text' : 'password'}*/}

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

                        <div className="d-flex align-items-center gap-2 mb-4">
                            <input type="checkbox"
                                className="form-check-input"
                                id="recordar" />
                            <label htmlFor="recordar" style={{ fontSize:'14px', color: '#4a4a4a'}}>
                                Recordar mi sesion
                            </label>
                        </div>
                         <button className="btn w-100 py-3 fw-semibold mb-4"
                                 onClick={logearUsuario}
                                 disabled={cargando}
                                 style={{backgroundColor:'#003358', color: 'white', borderRadius: '8px',
                                         fontSize: '16px' }}>
                            {cargando ? 'Iniciando Sesión... ' : 'Iniciar Sesión'}
                        </button>                   
                        <p className="text-center mb-0" style={{ fontSize: '14px', color: '#4a4a4a' }}>
                            ¿No tienes cuenta?{' '}
                            <Link to="/registro"
                                  className="fw-semibold text-decoration-none"
                                  style={{color: '#00677e'}}>
                                Regístrate gratis
                            </Link>
                        </p> 
                    </div>
                </div> 
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-4 gap-3"
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
export default Login