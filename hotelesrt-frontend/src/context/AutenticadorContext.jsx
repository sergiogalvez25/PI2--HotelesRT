import { createContext, useContext, useState, useEffect } from "react";

const AutenticadorContext = createContext(null)

export function AutenticadorProvider({ children }) {


    const[usuario,setUsuario] = useState(null)
    const[cargando,setCargando] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const usuarioGuardado = localStorage.getItem('usuario')

        if(token && usuarioGuardado){
            setUsuario(JSON.parse(usuarioGuardado))
        }
        setCargando(false)
    }, [])

    // guardar el token con el login 
    const login = (AutenticadorResponse) => {
        localStorage.setItem('token', AutenticadorResponse.token)
        localStorage.setItem('usuario', JSON.stringify({

            email: AutenticadorResponse.email,
            nombre: AutenticadorResponse.nombre,
            apellidos: AutenticadorResponse.apellidos,
            rol: AutenticadorResponse.rol
        }))
        setUsuario({
            email: AutenticadorResponse.email,
            nombre: AutenticadorResponse.nombre,
            apellidos: AutenticadorResponse.apellidos,
            rol: AutenticadorResponse.rol
        })
    } 

    // funcion logout
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('usuario')
        setUsuario(null)
    }

    // datos que comparte
    const value = {
        usuario,
        login,
        logout,
        estaAutenticado: !!usuario,
        esAdmin: usuario?.rol === 'ADMIN_HOTEL'
    }
    if (cargando) return null

    return (
        <AutenticadorContext.Provider value={value}>
            {children}
        </AutenticadorContext.Provider>
    )
}

export function useAutenticador(){
    return useContext(AutenticadorContext)
}