package com.hotelesrt.hotelesrt_backend.admin;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import com.hotelesrt.hotelesrt_backend.hotel.local.Habitacion;
import com.hotelesrt.hotelesrt_backend.hotel.local.HabitacionRepository;
import com.hotelesrt.hotelesrt_backend.reservas.EstadoReserva;
import com.hotelesrt.hotelesrt_backend.reservas.PrecioTemporada;
import com.hotelesrt.hotelesrt_backend.reservas.PrecioTemporadaRepository;
import com.hotelesrt.hotelesrt_backend.reservas.Reserva;
import com.hotelesrt.hotelesrt_backend.reservas.ReservaRepository;




// <>

@Service
public class AdminService {
    @Autowired
    private HabitacionRepository habitacionRepository;

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private PrecioTemporadaRepository precioTemporadaRepository;

    // Gestion de habitaciones

    public List<Habitacion> listarHabitaciones() {
        return habitacionRepository.findAll();
    }

    public Habitacion crearHabitacion(HabitacionRequest request) {
        Habitacion habitacion = new Habitacion();
        habitacion.setNumero(request.getNumero());
        habitacion.setTipo(request.getTipo());
        habitacion.setCapacidad(request.getCapacidad());
        habitacion.setPrecioNoche(request.getPrecioNoche());
        habitacion.setDescripcion(request.getDescripcion());
        habitacion.setImagenUrl(request.getImagenUrl());
        habitacion.setDisponible(request.isDisponible());
        return habitacionRepository.save(habitacion);
    }

    public Habitacion actualizarHabitacion(Long id, HabitacionRequest request) {
        Habitacion habitacion = habitacionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Habitación no encontrada"));
        habitacion.setNumero(request.getNumero());
        habitacion.setTipo(request.getTipo());
        habitacion.setCapacidad(request.getCapacidad());
        habitacion.setPrecioNoche(request.getPrecioNoche());
        habitacion.setDescripcion(request.getDescripcion());
        habitacion.setImagenUrl(request.getImagenUrl());
        habitacion.setDisponible(request.isDisponible());

        return habitacionRepository.save(habitacion);
    }
    public void desactivarHabitacion(Long id) {
        Habitacion habitacion = habitacionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                    "Habitacion no encontrada"));
        habitacion.setDisponible(false);
        habitacionRepository.save(habitacion);
    }


    // Gestion de las reservas
    public List<Reserva> listarReservas(){
        return reservaRepository.findAll();
    }
    public List<Reserva> listarReservasPorFecha(LocalDate fechaInicio, LocalDate fechaFin) {
        return reservaRepository.findAll()
                .stream()
                .filter(r -> r.getEstado() == EstadoReserva.CONFIRMADA)
                .filter(r -> {
                    LocalDate entrada = LocalDate.parse(r.getFechaEntrada());
                    LocalDate salida = LocalDate.parse(r.getFechaSalida());
                    return entrada.isBefore(fechaFin) && salida.isAfter(fechaInicio);
                })
                .collect(Collectors.toList());
    }
    // gestion del precio
    public List<PrecioTemporada> listarTodosPreciosTemporada() {
        return precioTemporadaRepository.findAll();
    }
    public PrecioTemporada crearPrecioTemporada(PrecioTemporada precioTemporada) {
        return precioTemporadaRepository.save(precioTemporada);
    }
    public void eliminarPrecioTemporada(Long id) {
        precioTemporadaRepository.deleteById(id);
    }
    public List<PrecioTemporada> listarPreciosTemporada(Long habitacion_id) {
        return precioTemporadaRepository.findByHabitacionId(habitacion_id);
    }

    // control de las estadisticas


    public Map<String, Object> obtenerEstadisticas(Integer mes, Integer year){
        Double ingresos = reservaRepository.calcularIngresosMes(mes, year);

        List<Reserva> reservasMes = reservaRepository.findReservasEnRango(
            (LocalDate.of(year,mes, 1)).toString(),
            (LocalDate.of(year, mes, LocalDate.of(year,mes, 1).lengthOfMonth())).toString());
        
        Map<String, Object> estadisticas = new HashMap<>();
        estadisticas.put("ingresosMes", ingresos);
        estadisticas.put("totalReservas", reservasMes.size());
        estadisticas.put("mes", mes);
        estadisticas.put("año", year);

        return estadisticas;
    }
}
