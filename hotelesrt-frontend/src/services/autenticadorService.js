import axios from './axiosConfig'

const autenticadorService = {
    //login devuelve el response con el token y los datos del usuario

    login: async(email, password) => {
        const respose = await axios.post('/api/auth/login', {
            email,
            password
        })
        return respose.data
    },
    // registro 
    registro: async (datos) => {
        const response = await axios.post('/api/auth/registro', datos)
        return response.data
    },
    //obtener perfil
    obtenerPerfil: async (datos) => {
        const response = await axios.get('/api/auth/perfil', datos)
        return response.data
    },
    //Actualizar perfil
    actualizarPerfil: async (datos) => {
        const response = await axios.put('/api/auth/perfil', datos)
        return response.data
    }
}
export default autenticadorService
