package com.hotelesrt.hotelesrt_backend.reservas;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.stereotype.Service;

import com.hotelesrt.hotelesrt_backend.configuracion.HotelDataSourceContext;
import com.hotelesrt.hotelesrt_backend.hotel.DisponibilidadService;
import com.hotelesrt.hotelesrt_backend.sincronizacion.EstadoReservaGlobal;
import com.hotelesrt.hotelesrt_backend.sincronizacion.ReservaCanceladaEvent;
import com.hotelesrt.hotelesrt_backend.sincronizacion.ReservaCreadaEvent;
import com.hotelesrt.hotelesrt_backend.sincronizacion.ReservaGlobal;
import com.hotelesrt.hotelesrt_backend.sincronizacion.ReservaGlobalRepository;
import com.hotelesrt.hotelesrt_backend.sincronizacion.ReservaGlobalResponse;

import jakarta.transaction.Transactional;





@Service
public class ReservaService {
    @Autowired
    private ReservaRepository reservaRepository;
    @Autowired
    private ReservaGlobalRepository reservaGlobalRepository;

    @Autowired
    private ApplicationEventPublisher eventPublisher;

    @Autowired
    private DisponibilidadService disponibilidadService;

    /*
    Aqui vamos a meter lo del Optimistic Locking, lo de mirar la version y luego volver 
    a comprobar cuando confirma la reserva para ver si no hay alguien mas reservando a la vez
    Funciones:
    - Crear Reserva: tiene que verificar disponibilidad con el service, calcular el precio,
    crear la reserva con lo del campo version y llamar al ApplicationEvent y 
    que gestione la persistencia distribuida llevandolo a la BD central
    - Cancelar Reserva: Cambia el estado a CANCELADA y llama al ApplicationEvent
    - ObtenerReservas : busca las reservas de un cliente 
    - Obtener rreservas activas: busca solo las activas     
    */

    @Transactional
    public ReservaResponse crearReserva(ReservaRequest request, Long cliente_id) {


        // miramos si hay disponibilidad con la funcion del service de contar los solapamientos
        Integer solapamientos = reservaRepository.contarSolapamientos(
                request.getHabitacion_id(),
                request.getFecha_entrada(),
                request.getFecha_salida());
        if(solapamientos > 0) {
            throw new RuntimeException("La habitacion no esta disponible para estos dias");
        }

        // calcula el precio 
        Double precio_total = disponibilidadService.calcularPrecio(
            request.getHabitacion_id(),
            request.getFecha_entrada(),
            request.getFecha_salida());

        
        // Crear la reserva

        Reserva reserva = new Reserva();
        reserva.setClienteId(cliente_id);
        reserva.setHabitacionId(request.getHabitacion_id());
        reserva.setFechaEntrada(request.getFecha_entrada().toString());
        reserva.setFechaSalida(request.getFecha_salida().toString());
        reserva.setEstado(EstadoReserva.CONFIRMADA);
        reserva.setPrecioTotal(precio_total);
        reserva.setNumPersonas(request.getNumPersonas());
        reserva.setPeticiones(request.getPeticiones());
        reserva.setFechaCreacion(LocalDate.now().toString());

        // gestionamos ahora lo del Optimistic Locking
        try {
            reserva = reservaRepository.save(reserva);
        } catch (ObjectOptimisticLockingFailureException e) {
            throw new RuntimeException(
                "La habitación acaba de ser reservada por otro usuario, intentelo de nuevo.");
        }

        // llamamos al ApplicationEvent
        eventPublisher.publishEvent(new ReservaCreadaEvent(
                this,
                reserva.getId(),
                request.getHotel_id(),
                cliente_id,
                reserva.getHabitacionId(),
                reserva.getFechaEntrada(),
                reserva.getFechaSalida(),
                reserva.getPrecioTotal(),
                reserva.getNumPersonas()
        ));
        return new ReservaResponse(reserva, request.getHotel_id());        
        }

     // Cancelar reserva
     @Transactional
     public void cancelarReserva(Long reserva_id, Long cliente_id) {
            ReservaGlobal reserva = reservaGlobalRepository.findById(reserva_id)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada en la BD global"));

        if(!reserva.getClienteId().equals(cliente_id)){
            throw new RuntimeException("No tienes permiso para cancelar esta reserva");
        }

        HotelDataSourceContext.setHotelId(reserva.getHotelId());
        // verficiar si no esta cancelada ya 
        try{
            reservaRepository.findById(reserva.getReservalocalId())
                .ifPresent(reservaLocal -> {
                    reservaLocal.setEstado(EstadoReserva.CANCELADA);
                    reservaRepository.save(reservaLocal);
                } );
        } finally {
            HotelDataSourceContext.clear();
        }
       reserva.setEstado(EstadoReservaGlobal.CANCELADA);
       reservaGlobalRepository.save(reserva);
        

        
     }   

     // Historial completo de un cliente
     public List<ReservaGlobalResponse> obtenerReservasCliente(Long cliente_id) {
        return reservaGlobalRepository.findByClienteId(cliente_id)
                .stream()
                .map(ReservaGlobalResponse::new)
                .collect(Collectors.toList());
     }
    // Reservas activas de un cliente

    public List<ReservaGlobalResponse> obtenerReservasActivas(Long cliente_id) {
        return reservaGlobalRepository.findByClienteId(cliente_id)
                .stream()
                .map(ReservaGlobalResponse::new)
                .collect(Collectors.toList());
    }

    // Detalles de una reserva
    public ReservaResponse obtenerDetalle(Long reserva_id, Long cliente_id, Long hotel_id) {
        Reserva reserva = reservaRepository.findById(reserva_id)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));

        if(!reserva.getClienteId().equals(cliente_id)) {
            throw new RuntimeException("No tienes permiso para ver esta semana");
        }

        return new ReservaResponse(reserva, hotel_id);
        
    }





    }
