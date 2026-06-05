package com.hotelesrt.hotelesrt_backend.sincronizacion;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;



// <>
@Service
public class SincronizacionService {
    @Autowired
    private ReservaGlobalRepository reservaGlobalRepository;


    // event listener para ver cuando se crea una reserva

    @EventListener
    public void onReservaCreada(ReservaCreadaEvent evento) {
        try {
            ReservaGlobal reservaGlobal = new ReservaGlobal();
            reservaGlobal.setReservalocal_id(evento.getReserva_id());
            reservaGlobal.setHotel_id(evento.getHotel_id());
            reservaGlobal.setCliente_id(evento.getCliente_id());
            reservaGlobal.setHabitacion_id(evento.getHabitacion_id());
            reservaGlobal.setFechaEntrada(evento.getFecha_entrada());
            reservaGlobal.setFechaSalida(evento.getFecha_salida());
            reservaGlobal.setPrecioTotal(evento.getPrecioTotal());
            reservaGlobal.setNumPersonas(evento.getNumPersonas());
            reservaGlobal.setEstado(EstadoReservaGlobal.CONFIRMADA);
            reservaGlobal.setSincronizadoEn(LocalDateTime.now());

            reservaGlobalRepository.save(reservaGlobal);
        } catch (Exception e) {
            System.err.println("Error sincronizando reserva creada:" + e.getMessage());
        }
    }
    // event listener para ver cuando se cancela
    @EventListener
    public void onReservaCancelada(ReservaCanceladaEvent evento) {
        try {
            reservaGlobalRepository.findByReservaLocalId(evento.getReserva_id())
                    .ifPresent(reservaGlobal -> {
                        reservaGlobal.setEstado(EstadoReservaGlobal.CANCELADA);
                        reservaGlobal.setSincronizadoEn(LocalDateTime.now());
                        reservaGlobalRepository.save(reservaGlobal);
                    });
        } catch (Exception e) {
            System.err.println("Error sincronizando reserva cancelada: " + e.getMessage());
        }
    }


    // estadisticas de todos los hoteles juntos

    public Map<String, Object> obtenerEstadisticasGenerales(Integer mes, Integer year) {
        Double ingresosCadena = reservaGlobalRepository.calcularIngresosCadena(mes, year);
        List<Object[]> reservasPorHotel = reservaGlobalRepository.contarReservasPorHotel(mes, year);

        List<Object[]> clientesFrecuentes = reservaGlobalRepository.findClientesMasFrecuentes();

        Map<String, Object> estadisticas = new HashMap<>();
        estadisticas.put("IngresosCadena", ingresosCadena);
        estadisticas.put("reservasPorHotel", reservasPorHotel);
        estadisticas.put("Clientes frecuentes", clientesFrecuentes);
        estadisticas.put("mes", mes);
        estadisticas.put("año", year);

        return estadisticas;
    }





}
