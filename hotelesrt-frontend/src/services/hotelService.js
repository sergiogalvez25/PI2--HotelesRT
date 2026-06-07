import axios from './axiosConfig'

const hotelService = {




    // listar hoteles activos
    listarHoteles: async () => {
        const response = await axios.get('/api/hoteles')
        return response.data
    },

    //obtener detalle de un hotel
    obtenerHotel: async (id) => {
        const response = await axios.get('`/api/hoteles/${id}')
        return response.data
    },
    buscarHoteles: async (ciudad, piscina, gimnasio, estrellas) => {
        const response = await axios.get('/api/hoteles/buscar', {
            params: {ciudad, piscina, gimnasio, estrellas}
        })
        return response.data
    },
    obtenerDisponibilidad: async (hotel_id, fecha_entrada, fecha_salida, personas) => {
        const response = await axios.get(`/api/hoteles/${hotel_id}/disponibilidad`,{
            params: {fecha_entrada, fecha_salida, personas}
        })
        return response.data
    },

    calcularPrecio: async (hotel_id, habitacion_id, fecha_entrada, fecha_salida) => {
        const response = await axios.get(`/api/hoteles/${hotel_id}/habitaciones/${habitacion_id}/precio`,
            { params: {fecha_entrada, fecha_salida}}
        )
        return response.data
    }
}
export default hotelService