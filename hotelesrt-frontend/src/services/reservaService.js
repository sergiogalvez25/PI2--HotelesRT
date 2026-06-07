import axios from './axiosConfig'

const reservaService = {




    // crear una nueva reserva 
    crearReserva: async (datos) => {
        const response = await axios.post('/api/reservas', datos)
        return response.data
    },

    // ver reservas de usuario
    misReservas: async (hotel_id) => {
        const response = await axios.get('/api/reservas/mis-reservas', {
            params: {hotel_id}
        })
        return response.data
    },
    historial: async (hotel_id) => {
        const response = await axios.get('/api/reservas/historial', {
            params: {hotel_id}
        })
        response.data
    },

    obtenerDetalle: async (id, hotel_id) => {
        const response = await axios.get(`/api/reservas/${id}`, {
            params: {hotel_id}
        })
        return response.data
    },
    cancelarReserva: async (id, hotel_id) => {
        const response = await axios.get(`/api/reservas/${id}/cancelar`, null, {
            params: {hotel_id}
        })
        return response.data
    }
}
export default reservaService