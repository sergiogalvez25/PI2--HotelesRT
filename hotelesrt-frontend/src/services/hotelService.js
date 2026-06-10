import axios from './axiosConfig'

const hotelService = {




    // listar hoteles activos
    listarHoteles: async () => {
        const response = await axios.get('/api/hoteles')
        return response.data
    },

    //obtener detalle de un hotel
    obtenerHotel: async (id) => {
        const response = await axios.get(`/api/hoteles/${id}`)
        return response.data
    },
    buscarHoteles: async (ciudad, piscina, gimnasio, estrellas) => {
        const response = await axios.get('/api/hoteles/buscar', {
            params: {ciudad, piscina, gimnasio, estrellas}
        })
        return response.data
    },
    obtenerDisponibilidad: async (hotelId, fechaEntrada, fechaSalida, personas) => {
        const response = await axios.get(`/api/hoteles/${hotelId}/disponibilidad`,{
            params: {fechaEntrada, fechaSalida, personas}
        })
        return response.data
    },

    calcularPrecio: async (hotelId, habitacionId, fechaEntrada, fechaSalida) => {
        const response = await axios.get(`/api/hoteles/${hotel_id}/habitaciones/${habitacionId}/precio`,
            { params: {fechaEntrada, fechaSalida}}
        )
        return response.data
    },
    obtenerOfertas: async () => {
        const response = await axios.get('/api/admin/precios/todos')
        return response.data
    }
}
export default hotelService