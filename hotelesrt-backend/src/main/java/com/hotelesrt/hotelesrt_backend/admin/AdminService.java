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
    public void toggleHabitacion(Long id) {
        Habitacion habitacion = habitacionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                    "Habitacion no encontrada"));
        habitacion.setDisponible(!habitacion.isDisponible());
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
        List<Reserva> todasReservas = reservaRepository.findAll();
        List<Habitacion> todasHabitaciones = habitacionRepository.findAll();
        long totalHabitaciones = todasHabitaciones.stream().filter(h -> h.isDisponible()).count();
        long totalReservas = todasReservas.stream()
            .filter(r -> r.getEstado() == EstadoReserva.CONFIRMADA)
            .filter(r-> {
                try {
                    LocalDate entrada = LocalDate.parse(r.getFechaEntrada());
                    return entrada.getMonthValue() == mes && entrada.getYear() == year;
                } catch(Exception e) {
                    return false;
                }
            })
            .count();
        LocalDate hoy = LocalDate.now();
        long reservasActivas = todasReservas.stream()
            .filter(r -> r.getEstado() == EstadoReserva.CONFIRMADA)
            .filter(r-> {
                try {
                    LocalDate salida = LocalDate.parse(r.getFechaSalida());
                    return !salida.isBefore(hoy);
                } catch(Exception e) {
                    return false;
                }
            })
            .count();
        long habitacionesOcupadasHoy = todasReservas.stream()
            .filter(r -> r.getEstado() == EstadoReserva.CONFIRMADA)
            .filter(r-> {
                try {
                    LocalDate entrada = LocalDate.parse(r.getFechaEntrada());
                    LocalDate salida = LocalDate.parse(r.getFechaSalida());
                    return !entrada.isAfter(hoy) && salida.isAfter(hoy);
                } catch(Exception e) {
                    return false;
                }
            })
            .count();

        double pctOcupacion = totalHabitaciones > 0 ? Math.round((habitacionesOcupadasHoy *100.0 / totalHabitaciones) *10.0) / 10.0 : 0.0;


        
        
        Map<String, Object> estadisticas = new HashMap<>();
        estadisticas.put("ingresosMes", ingresos != null ? ingresos : 0);
        estadisticas.put("totalReservas", totalReservas);
        estadisticas.put("totalHabitaciones", totalHabitaciones);
        estadisticas.put("reservasActivas", reservasActivas);
        estadisticas.put("pctOcupacion", pctOcupacion);
        estadisticas.put("mes", mes);
        estadisticas.put("año", year);
        
        List<Map<String, Object>> proximasLlegadas = todasReservas.stream()
            .filter(r -> r.getEstado() == EstadoReserva.CONFIRMADA)
            .filter(r-> {
                try {
                    return LocalDate.parse(r.getFechaEntrada()).equals(hoy);
                } catch(Exception e) {
                    return false;
                }
            })
            .map(r -> {
                Map<String, Object> item = new HashMap<>();
                item.put("clienteId", r.getClienteId());
                item.put("fechaEntrada", r.getFechaEntrada());
                item.put("fechaSalida", r.getFechaSalida());
                item.put("habitacionId", r.getHabitacionId());
                item.put("hora", "15:00");
                try {
                    long noches = java.time.temporal.ChronoUnit.DAYS.between(
                        LocalDate.parse(r.getFechaEntrada()),
                        LocalDate.parse(r.getFechaSalida()));
                    item.put("noches", noches);
                } catch (Exception e) { item.put("noches", 0); }
                return item;
            })
            .collect(Collectors.toList());


        List<Map<String, Object>> proximasSalidas = todasReservas.stream()
            .filter(r -> r.getEstado() == EstadoReserva.CONFIRMADA)
            .filter(r-> {
                try {
                    return LocalDate.parse(r.getFechaSalida()).equals(hoy);
                } catch(Exception e) {
                    return false;
                }
            })
            .map(r -> {
                Map<String, Object> item = new HashMap<>();
                item.put("clienteId", r.getClienteId());
                item.put("fechaEntrada", r.getFechaEntrada());
                item.put("fechaSalida", r.getFechaSalida());
                item.put("habitacionId", r.getHabitacionId());
                item.put("hora", "12:00");
                try {
                    long noches = java.time.temporal.ChronoUnit.DAYS.between(
                        LocalDate.parse(r.getFechaEntrada()),
                        LocalDate.parse(r.getFechaSalida()));
                    item.put("noches", noches);
                } catch (Exception e) { item.put("noches", 0); }
                return item;
            })
            .collect(Collectors.toList());
        estadisticas.put("proximasLlegadas", proximasLlegadas);
        estadisticas.put("proximasSalidas", proximasSalidas);

        return estadisticas;
    }
}
