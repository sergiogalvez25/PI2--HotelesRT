import axios from './axiosConfig'
// <>

const adminService = {
    listarHabitaciones: async () => {
        const response = await axios.get('/api/admin/habitaciones')
        return response.data
    },
 crearHabitacion: async (datos) => {
        const response = await axios.post('/api/admin/habitaciones', datos)
        return response.data
    },
 actualizarHabitacion: async (id, datos) => {
    const response = await axios.put(`/api/admin/habitaciones/${id}`, datos)
    return response.data
 },
 desactivarHabitacion: async (id) => {
    const response = await axios.delete(`/api/admin/habitaciones/${id}`)
    return response.data
 },
 listarReservas: async () => {
    const response = await axios.get('/api/admin/reservas')
    return response.data
 },
 reservasPorFecha: async (fecha_inicio, fecha_fin) => {
    const response = await axios.get('/api/admin/reservas/rango', { 
         params: { fecha_inicio, fecha_fin }
    })
    return response.data
 },
 listarPrecios: async (habitacionId) => {
    const response = await axios.get(`/api/admin/precios`)
    return response.data
 },
 crearPrecio: async (habitacionId, datos) => {
    const response = await axios.post('/api/admin/precios', {
      habitacionId: habitacionId,
      nombreTemporada: datos.nombreTemporada,
      fechaInicio: datos.fechaEntrada,
      fechaFin: datos.fechaSalida,
      precio: Number(datos.precio)
    })
    return response.data
 },
eliminarPrecio: async (id) => {
   const response = await axios.delete(`/api/admin/precios/${id}`)
    return response.data
},
obtenerEstadisticas: async (mes, year) => {
    const response = await axios.get('/api/admin/estadisticas', {
        params: { mes, year }
    })
    return response.data
}
}
export default adminService